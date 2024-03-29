import { useState, useEffect } from "react";
import { OnEditAppointment } from "../api/auth";
import { fetchDoctorList } from "../api/auth";

const EditAppointment = ({ appointment, appointmentList }) => {
  const dateObject = new Date(appointment.date);
  //formatted to YYYY-MM-DD
  const formattedDate = dateObject.toISOString().split("T")[0];

  const [hour, minute] = appointment.time.slice(0, -3).split(":");
  const period = appointment.time.split(" ")[1];
  let formattedHour = parseInt(hour, 10);
  if (period === "PM" && formattedHour !== 12) {
    formattedHour += 12;
  }
  //formatted to HH:MM AM or PM
  const formattedTime = `${String(formattedHour).padStart(2, "0")}:${minute}`;

  const [values, setValues] = useState({
    title: appointment.title,
    date: formattedDate,
    time: formattedTime,
    doctorId: appointment.doctor_id,
    otherProfessional: appointment.other_professional,
    prenotes: appointment.prenotes,
    postnotes: appointment.postnotes,
  });

  const resetValues = () => {
    setValues({
      title: appointment.title,
      date: formattedDate,
      time: formattedTime,
      doctorId: appointment.doctor_id,
      otherProfessional: appointment.other_professional,
      prenotes: appointment.prenotes,
      postnotes: appointment.postnotes,
    });
  };

  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [otherProfessional, setOtherProfessional] = useState(false);

  const resetErrorAndSuccess = () => {
    setError("");
    setSuccess("");
  };

  //appointment edit submit
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await OnEditAppointment(
        appointment.appointment_id,
        values
      );
      setError("");
      setSuccess(data.message);
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

  const onChangeProfessional = (e) => {
    if (e.target.value === "other") {
      setValues({ ...values, [e.target.name]: null });
      setOtherProfessional(true);
      resetErrorAndSuccess();
    } else {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
        otherProfessional: "",
      });
      setOtherProfessional(false);
      resetErrorAndSuccess();
    }
  };

  // to get new values after edit submission
  const doctorList = async () => {
    try {
      const { data } = await fetchDoctorList();
      let sortedData = [...data].sort((a, b) => a.doctor_id - b.doctor_id);
      setDoctors(sortedData);
    } catch (err) {
      console.error(err.message);
    }
  };

  //modal close button
  const onClick = () => {
    resetValues();
    resetErrorAndSuccess();
    if (!appointment.other_professional) {
      setOtherProfessional(false);
    } else if (appointment.other_professional) {
      setOtherProfessional(true);
    }
  };

  //if there is an otherProfessional, set the otherProfessional state to true
  useEffect(() => {
    setOtherProfessional(values.otherProfessional !== "");
    doctorList();
  }, []);

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)} className="container mt-3">
        <div
          className="modal fade"
          id={`editAppointmentId${appointment.appointment_id}`}
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Appointment
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
                    value={values.doctorId}
                  >
                    {appointment.doctor_id ? (
                      <>
                        <option value={appointment.doctor_id}>
                          {appointment.firstname} {appointment.lastname},{" "}
                          {appointment.typeofdoc}
                        </option>
                        <option value="other">Other</option>
                      </>
                    ) : appointment.other_professional ? (
                      <>
                        <option value="other" selected={otherProfessional}>
                          Other
                        </option>
                      </>
                    ) : (
                      <>
                        <option disabled selected>
                          Select a Professional
                        </option>
                        <option value="other">Other</option>
                      </>
                    )}
                    {doctors
                      .filter(
                        (doctor) => doctor.doctor_id !== appointment.doctor_id
                      )
                      .map((doctor) => (
                        <option value={doctor.doctor_id} key={doctor.doctor_id}>
                          {doctor.firstname} {doctor.lastname},{" "}
                          {doctor.typeofdoc}
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
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditAppointment;
