import { useDispatch } from "react-redux";
import Layout from "../components/layout";
import { fetchMedicineList, onLogout } from "../api/auth";
import { unauthenticateUser } from "../redux/slices/authSlice";
import { useEffect, useState } from "react";
import DeleteMedicine from "../components/deleteMedicine";
import AddMedicine from "../components/addMedicine";
import EditMedicine from "../components/editMedicine";
import InfoDoctor from "../components/infoDoctor";

const Medicine = ({ name }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [medicine, setMedicine] = useState([]);

  const logout = async () => {
    try {
      await onLogout();
      dispatch(unauthenticateUser());
      localStorage.removeItem("isAuth");
    } catch (err) {
      console.log(err.response);
    }
  };

  //gets all user medicine
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
            <i className="fa-solid fa-capsules me-3"></i>
          </h1>
          <h1>Medicine</h1>
          <div className="ms-auto bd-highlight" style={{ paddingLeft: "1rem" }}>
            <AddMedicine medicineList={medicineList} />
          </div>
        </div>
        {!medicine.length ? (
          <div>
            <h4 className="d-flex justify-content-end align-items-top me-2">
              Add Medicine <i className="fa-solid fa-turn-up ms-2"></i>
            </h4>
            <h1
              className="d-flex align-items-center justify-content-center"
              style={{ height: "60vh" }}
            >
              No Medicine Added
            </h1>
          </div>
        ) : (
          <div className="d-flex flex-wrap justify-content-start">
            {medicine.map((medicine) => (
              <div
                key={medicine.medicine_id}
                style={{
                  width: "33%",
                  paddingBottom: "0.5rem",
                  minWidth: "400px",
                  maxWidth: "700px",
                }}
                className="p-2"
              >
                <div>
                  <EditMedicine
                    medicine={medicine}
                    medicineList={medicineList}
                  />
                </div>
                <div>
                  <DeleteMedicine
                    medicine={medicine}
                    medicineList={medicineList}
                  />
                </div>
                <div>
                  <InfoDoctor doctor={medicine} />
                </div>
                <div className="card bg-secondary">
                  <div
                    className="card-header d-flex justify-content-between align-items-center"
                    style={{ backgroundColor: "#5FD5BD" }}
                  >
                    <div className="text-white">{medicine.name}</div>
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
                            className="btn btn-white dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target={`#editMedicineId${medicine.medicine_id}`}
                          >
                            Edit
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="btn btn-white dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target={`#deleteid${medicine.medicine_id}`}
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-body text-white">
                    <p className="card-text">
                      <h6>
                        <i className="fa-solid fa-gear"></i> {medicine.function}
                      </h6>
                      <h6>
                        <i className="fa-solid fa-clock-rotate-left"></i>{" "}
                        {medicine.frequency}
                      </h6>
                      {medicine.prescription === false ? (
                        <h6>non-prescription </h6>
                      ) : medicine.prescription === true &&
                        !medicine.doctor_id ? (
                        <h6>
                          <i className="fa-solid fa-file-prescription me-1"></i>{" "}
                          {medicine.other_prescriber}
                        </h6>
                      ) : (
                        // <button
                        //         data-bs-toggle="modal"
                        //         data-bs-target={`#infoid${appointment.doctor_id}`}
                        //         className="btn btn-secondary me-5"
                        //         style={{ marginLeft: -13, outline: "none" }}
                        //       ></button>
                        <button
                          data-bs-toggle="modal"
                          data-bs-target={`#infoid${medicine.doctor_id}`}
                          className="btn btn-secondary"
                          style={{ marginLeft: -13, outline: "none" }}
                        >
                          <h6 style={{ color: "#8AC6FD" }}>
                            <i className="fa-solid fa-file-prescription me-1"></i>{" "}
                            {medicine.firstname} {medicine.lastname},{" "}
                            {medicine.typeofdoc}
                          </h6>
                        </button>
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

export default Medicine;
