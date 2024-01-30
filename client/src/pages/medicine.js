import { useDispatch } from "react-redux";
import Layout from "../components/layout";
import { fetchMedicineList, onLogout } from "../api/auth";
import { unauthenticateUser } from "../redux/slices/authSlice";
import { useEffect, useState } from "react";
import DeleteMedicine from "../components/deleteMedicine";
import AddMedicine from "../components/addMedicine";
import EditMedicine from "../components/editMedicine";
import InfoDoctor from "../components/infoDoctor";

const Medicine = ({name}) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [medicine, setMedicine] = useState([])

  const logout = async () => {
    try {
      await onLogout();
      dispatch(unauthenticateUser());
      localStorage.removeItem('isAuth');
    } catch (err) {
      console.log(err.response);
    } 
  };

  const medicineList = async () => {
    try {
      const { data } = await fetchMedicineList();
      let sortedData = [...data].sort((a, b) => a.medicine_id - b.medicine_id);
      setMedicine(sortedData);
      setLoading(false);
    } catch (err) {
        logout();
    }
  };

  useEffect(() => {
    medicineList();
  },[])

  return loading ? (
    <Layout name={name}>
      <h1>Loading...</h1>
    </Layout>
  ) : (
    <div>
      <Layout name={name}>
        <div class='mt-3 d-flex align-items-center'>
          <h1><i class="fa-solid fa-capsules me-3"></i></h1>
          <h1>Medicine</h1>
          <div class='ms-auto bd-highlight'style={{ paddingLeft: '1rem' }}><AddMedicine medicineList={medicineList}/></div>
        </div>
        <div class='d-flex flex-wrap justify-content-between'>
          {medicine.map((medicine) => (
            <div key={medicine.medicine_id} style={{ width:'400px', paddingBottom: '0.5rem' }}>
              <div><EditMedicine medicine={medicine} medicineList={medicineList}/></div>
              <div><DeleteMedicine medicine={medicine} medicineList={medicineList}/></div>
              <div><InfoDoctor doctor={medicine}/></div>
              <div class="card bg-secondary">
                <div class="card-header d-flex justify-content-between align-items-center">
                  <div class='text-white'>{medicine.name}</div>
                  <div class="dropdown">
                    <button class="btn btn-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <button type="button" class="btn btn-white dropdown-item" data-bs-toggle="modal" data-bs-target={`#editMedicineId${medicine.medicine_id}`}>
                            Edit
                        </button>
                      </li>
                      <li>
                        <button type="button" class="btn btn-white dropdown-item" data-bs-toggle="modal" data-bs-target={`#deleteid${medicine.medicine_id}`}>
                            Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="card-body text-white">
                  <p class="card-text">
                    <h6><i class="fa-solid fa-gear"></i> {medicine.function}</h6>
                    <h6><i class="fa-solid fa-clock-rotate-left"></i> {medicine.frequency}</h6>
                    {medicine.prescription === false ? 
                      (<h6>non-prescription </h6>) 
                    : medicine.prescription === true && !medicine.doctor_id ? 
                      (<h6><i class="fa-solid fa-file-prescription"></i> {medicine.other_prescriber}</h6>) 
                    : (  
                        <a style={{cursor: 'pointer'}} data-bs-toggle="modal" data-bs-target={`#infoid${medicine.doctor_id}`} >
                          <h6 class="text-info">
                            <i class="fa-solid fa-file-prescription me-1"></i> {medicine.firstname} {medicine.lastname}, {medicine.typeofdoc}
                          </h6>
                        </a>
                      )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    </div>
  )
};  
  
   export default Medicine;