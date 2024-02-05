import { useDispatch } from "react-redux";
import Layout from "../components/layout";
import { fetchDoctorList, onLogout } from "../api/auth";
import { unauthenticateUser } from "../redux/slices/authSlice";
import { useEffect, useState } from "react";
import AddDoctor from "../components/addDoctor";
import EditDoctor from "../components/editDoctor";
import DeleteDoctor from "../components/deleteDoctor";

const Doctor = ({ name }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);

  const logout = async () => {
    try {
      await onLogout();
      dispatch(unauthenticateUser());
      localStorage.removeItem("isAuth");
    } catch (err) {
      console.log(err.response);
    }
  };

  //fetch all doctors for user
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
  }, []);

  return loading ? (
    <Layout name={name}>
      <h1>Loading...</h1>
    </Layout>
  ) : (
    <div>
      <Layout name={name}>
        <div className="mt-3 d-flex align-items-center">
          <h1>
            <i className="fa-solid fa-user-doctor me-3"></i>
          </h1>
          <h1>Professionals</h1>
          <div className="ms-auto bd-highlight" style={{ paddingLeft: "1rem" }}>
            <AddDoctor doctorList={doctorList} />
          </div>
        </div>
        {!doctors.length ? ( //if there is nothing added to professionals, show no professionals added
          <div>
            <h4 className="d-flex justify-content-end align-items-top me-2">
              Add Professionals <i className="fa-solid fa-turn-up ms-2"></i>
            </h4>
            <h1
              className="d-flex align-items-center justify-content-center"
              style={{ height: "60vh" }}
            >
              No Professionals Added
            </h1>
          </div>
        ) : (
          <div className="d-flex flex-wrap justify-content-start">
            {doctors.map((doctor) => (
              <div
                key={doctor.doctor_id}
                style={{ width: "637px", paddingBottom: "0.5rem" }}
                className="p-2"
              >
                <EditDoctor doctor={doctor} doctorList={doctorList} />
                <DeleteDoctor doctor={doctor} doctorList={doctorList} />
                <div className="card bg-secondary">
                  <div
                    className="card-header d-flex justify-content-between align-items-center"
                    style={{ backgroundColor: "#8AC6FD" }}
                  >
                    <div className="text-white">{doctor.typeofdoc}</div>
                    <div className="dropdown">
                      <button
                        className="btn"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fa-solid fa-ellipsis-vertical text-white"></i>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <button
                            type="button"
                            classNameName="btn btn-white dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target={`#editid${doctor.doctor_id}`}
                          >
                            Edit
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target={`#deleteid${doctor.doctor_id}`}
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="card-body text-white">
                    <h5 className="card-title">
                      {doctor.firstname} {doctor.lastname}
                    </h5>
                    <p className="card-text">
                      <h6>
                        <i className="fa-solid fa-phone"></i>{" "}
                        {doctor.phonenumber}
                      </h6>
                      <h6>
                        <i className="fa-solid fa-location-dot me-1"></i>{" "}
                        {doctor.location}
                      </h6>
                      {doctor.notes && (
                        <h6>
                          <i className="fa-solid fa-clipboard me-1"></i>{" "}
                          {doctor.notes}
                        </h6>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Layout>
    </div>
  );
};

export default Doctor;
