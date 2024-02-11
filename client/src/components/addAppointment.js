import { useState, useEffect } from "react";
import { onAddAppointment } from "../api/auth";
import { fetchDoctorList } from "../api/auth";

const AddAppointment = ({ appointmentList }) => {
  const [values, setValues] = useState({
    title: "",
    date: "",
    time: "",
    doctorId: null,
    otherProfessional: "",
    prenotes: "",
    postnotes: "",
  });

  const resetValues = () => {
    setValues({
      title: "",
      date: "",
      time: "",
      doctorId: null,
      otherProfessional: "",
      prenotes: "",
      postnotes: "",
    });
  };

  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [otherProfessional, setOtherProfessional] = useState(false);
  const [select, setSelect] = useState(true);

  const resetErrorAndSuccess = () => {
    setError("");
    setSuccess("");
  };

  //add appointment submit
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (values.doctorId === "other") {
        setValues({ ...values, doctorId: null });
      }
      const { data } = await onAddAppointment(values);
      setError("");
      setSuccess(data.message);
      resetValues();
      appointmentList();
    } catch (err) {
      console.log(err.response.data.errors[0].msg);
      setError(err.response.data.errors[0].msg);
      setSuccess("");
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    resetErrorAndSuccess();
  };

  //if other is selected in the drop down, set otherProfessional state to true, enabling the text input for other professionals
  const onChangeProfessional = (e) => {
    if (e.target.value === "other") {
      setOtherProfessional(true);
      setValues({ ...values, [e.target.name]: null });
      resetErrorAndSuccess();
    } else {
      setOtherProfessional(false);
      setValues({
        ...values,
        [e.target.name]: e.target.value,
        otherProfessional: "",
      });
      resetErrorAndSuccess();
    }
    setSelect(false);
  };

  //get all professionals of user
  const doctorList = async () => {
    try {
      const { data } = await fetchDoctorList();
      let sortedData = [...data].sort((a, b) => a.doctor_id - b.doctor_id);
      setDoctors(sortedData);
    } catch (err) {
      console.error(err.message);
    }
  };

  //close button onClick
  const onClick = () => {
    resetValues();
    resetErrorAndSuccess();
    setOtherProfessional(false);
    setSelect(true);
  };

  useEffect(() => {
    doctorList();
  }, []);

  return (
    <div>
      <button
        type="button"
        className="btn"
        data-bs-toggle="modal"
        data-bs-target="#addAppointment"
        style={{ backgroundColor: "#65D582" }}
      >
        <i className="fa-solid fa-plus text-white"></i>
      </button>
      <form onSubmit={(e) => onSubmit(e)} className="container mt-3">
        <div
          className="modal fade"
          id="addAppointment"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Appointment
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={onClick}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    onChange={(e) => onChange(e)}
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={values.title}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Date
                  </label>
                  <input
                    onChange={(e) => onChange(e)}
                    id="date"
                    className="form-control"
                    type="date"
                    name="date"
                    value={values.date}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="time" className="form-label">
                    Time
                  </label>
                  <input
                    onChange={(e) => onChange(e)}
                    id="time"
                    className="form-control"
                    type="time"
                    name="time"
                    value={values.time}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="professional" className="form-label">
                    Professional
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="doctorId"
                    onChange={(e) => onChangeProfessional(e)}
                    defaultValue={null}
                  >
                    <option disabled selected={select}>
                      Select a professional
                    </option>
                    <option value="other">Other</option>
                    {/* mapping all professionals of user */}
                    {doctors.map((doctor) => (
                      <option value={doctor.doctor_id} key={doctor.doctor_id}>
                        {doctor.firstname} {doctor.lastname}, {doctor.typeofdoc}
                      </option>
                    ))}
                  </select>
                  {otherProfessional && (
                    <div className="mb-3">
                      <input
                        onChange={(e) => onChange(e)}
                        type="text"
                        className="form-control"
                        id="otherProfessional"
                        name="otherProfessional"
                        value={values.otherProfessional}
                        placeholder="Provide the professional here"
                      />
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="prenotes" className="form-label">
                    Prenotes
                  </label>
                  <input
                    onChange={(e) => onChange(e)}
                    type="text"
                    className="form-control"
                    id="prenotes"
                    name="prenotes"
                    value={values.prenotes}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="postnotes" className="form-label">
                    Postnotes
                  </label>
                  <input
                    onChange={(e) => onChange(e)}
                    type="text"
                    className="form-control"
                    id="postnotes"
                    name="postnotes"
                    value={values.postnotes}
                  />
                </div>

                <div style={{ color: "red", margin: "10px 0" }}>{error}</div>
                <div style={{ color: "green", margin: "10px 0" }}>
                  {success}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={onClick}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddAppointment;
