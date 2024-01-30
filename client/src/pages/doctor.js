import { useDispatch } from "react-redux";
import Layout from "../components/layout";
import { fetchDoctorList, onLogout } from "../api/auth";
import { unauthenticateUser } from "../redux/slices/authSlice";
import { useEffect, useState } from "react";
import AddDoctor from "../components/addDoctor";
import EditDoctor from "../components/editDoctor";
import DeleteDoctor from "../components/deleteDoctor";

const Doctor = ({name}) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [doctors, setDoctors] = useState([])

  const logout = async () => {
    try {
      await onLogout();
      dispatch(unauthenticateUser());
      localStorage.removeItem('isAuth');
    } catch (err) {
      console.log(err.response);
    } 
  };

  const doctorList = async () => {
    try {
      const { data } = await fetchDoctorList();
      let sortedData = [...data].sort((a, b) => a.doctor_id - b.doctor_id);
      setDoctors(sortedData);
      setLoading(false);
    } catch (err) {
        logout();
    }
  };

  useEffect(() => {
    doctorList();
  },[])

  return loading ? (
    <Layout name={name}>
      <h1>Loading...</h1>
    </Layout>
  ) : (
    <div>
      <Layout name={name}>
        <div class='mt-3 d-flex align-items-center'>
          <h1><i class="fa-solid fa-user-doctor me-3"></i></h1>
          <h1>Professionals</h1>
          <div class='ms-auto bd-highlight'style={{ paddingLeft: '1rem' }}><AddDoctor doctorList={doctorList}/></div>
        </div>
        <div class='d-flex flex-wrap justify-content-between'>
          {doctors.map((doctor) => (
            <div key={doctor.doctor_id} style={{ width:'637px', paddingBottom: '0.5rem' }}>
              <EditDoctor doctor={doctor} doctorList={doctorList}/>
              <DeleteDoctor doctor={doctor} doctorList={doctorList}/>
              <div class="card bg-secondary">
                <div class="card-header d-flex justify-content-between align-items-center">
                  <div class='text-white'>{doctor.typeofdoc}</div>
                  <div class="dropdown">
                    <button class="btn btn-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <button type="button" className="btn btn-white dropdown-item" data-bs-toggle="modal" data-bs-target={`#editid${doctor.doctor_id}`}>
                          Edit
                        </button>
                      </li>
                      <li>
                        <button type="button" class="dropdown-item" data-bs-toggle="modal" data-bs-target={`#deleteid${doctor.doctor_id}`}>
                          Delete 
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div class="card-body text-white">
                  <h5 class="card-title">{doctor.firstname} {doctor.lastname}</h5>
                  <p class="card-text"><h6><i class="fa-solid fa-phone"></i> {doctor.phonenumber}</h6>
                  <h6><i class="fa-solid fa-location-dot me-1"></i> {doctor.location}</h6>
                  {doctor.notes && <h6><i class="fa-solid fa-clipboard me-1"></i> {doctor.notes}</h6>}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    </div>
  )
};  
  
   export default Doctor;