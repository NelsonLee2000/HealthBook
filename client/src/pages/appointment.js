import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAppointmentList, onLogout } from "../api/auth";
import { unauthenticateUser } from "../redux/slices/authSlice";
import Layout from "../components/layout";
import AddAppointment from "../components/addAppointment";
import DeleteAppointment from "../components/deleteAppointment";
import EditAppointment from "../components/editAppointment";
import InfoDoctor from "../components/infoDoctor";

const Appointment = ({ name }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [appointment, setAppointment] = useState([]);

  //logout function
  const logout = async () => {
    try {
      await onLogout();
      dispatch(unauthenticateUser());
      localStorage.removeItem("isAuth");
    } catch (err) {
      console.log(err.response);
    }
  };

  //current date
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const date = currentDate.getDate().toString().padStart(2, "0");

  //formatted to YYYY-MM-DD
  const formattedCurrentDate = `${year}-${month}-${date}`;

  //formats to ex. Jan 13
  const noYearDate = (appt) => {
    return new Date(appt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  //formats to YYYY-MM-DD
  const withYearDate = (appt) => {
    return new Date(appt).toISOString().split("T")[0];
  };

  //formats to 12 hour time
  const twelveHourTime = (time) => {
    return new Date(`1970-01-01T${time}Z`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "UTC",
    });
  };

  //the amount of milliseconds in a day
  const oneDayInMilliseconds = 86400000;

  // filters dates in the future
  const upComingApp = appointment.filter(
    (appointment) =>
      new Date(withYearDate(appointment.date)).getTime() >=
      new Date(formattedCurrentDate).getTime()
  );

  //filters dates in the past
  const previousApp = appointment.filter(
    (appointment) => new Date(appointment.date) < new Date(formattedCurrentDate)
  );

  //gets appointments
  const appointmentList = async () => {
    try {
      const { data } = await fetchAppointmentList();
      setAppointment(data);
      setLoading(false);
      console.log('data', data)
      console.log('upComingAppointments', upComingApp)
      console.log('formattedUpcomingAppointments', upComingApp.map((appointment) => {
        noYearDate(appointment)
      }) )
    } catch (err) {
      logout();
    }
  };

  useEffect(() => {
    appointmentList();
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
            <i className="fa-solid fa-calendar-days me-3"></i>
          </h1>
          <h1>Appointments</h1>
          <div className="ms-auto bd-highlight" style={{ paddingLeft: "1rem" }}>
            <AddAppointment appointmentList={appointmentList} />
          </div>
        </div>

        {!upComingApp.length && !previousApp.length ? ( //if there is nothing added to appointments, show no Appointments added
          <div>
            <h4 className="d-flex justify-content-end align-items-top me-2">
              Add Appointments
              <i className="fa-solid fa-turn-up ms-2"></i>
            </h4>
            <h1
              className="d-flex align-items-center justify-content-center"
              style={{ height: "60vh" }}
            >
              No Appointments Added
            </h1>
          </div>
        ) : (
          <div>
            <h2>
              <u>Upcoming</u>
            </h2>
            {!upComingApp.length ? (
              <h3
                className="d-flex align-items-center justify-content-center"
                style={{ height: "20vh" }}
              >
                No Upcoming Appointments
              </h3>
            ) : (
              <div className="d-flex flex-wrap justify-content-start">
                {upComingApp
                  .sort((a, b) => {
                    //sorting by the closest to the furtherest date
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);

                    const dateComparison = dateA - dateB;
                    if (dateComparison === 0) {
                      const timeA = new Date(`1970-01-01T${a.time}Z`);
                      const timeB = new Date(`1970-01-01T${b.time}Z`);
                      return timeA - timeB;
                    }
                    return dateA - dateB;
                  })
                  .map((appointment) => (
                    <div
                      key={appointment.appointment_id}
                      style={{
                        width: "33%",
                        paddingBottom: "0.5rem",
                        minWidth: "400px",
                        maxWidth: "700px",
                        paddingBottom: "0.5rem",
                      }}
                      className="p-2"
                    >
                      <InfoDoctor doctor={appointment} />
                      <EditAppointment
                        appointment={appointment}
                        appointmentList={appointmentList}
                      />
                      <DeleteAppointment
                        withYearDate={withYearDate}
                        appointment={appointment}
                        appointmentList={appointmentList}
                      />
                      <div className="card bg-secondary">
                        <div
                          className="card-header d-flex justify-content-between align-items-center"
                          style={{ backgroundColor: "#65D582" }}
                        >
                          <div className="text-white">{appointment.title}</div>
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
                                  data-bs-target={`#editAppointmentId${appointment.appointment_id}`}
                                >
                                  Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  className="btn btn-white dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target={`#deleteappointmentid${appointment.appointment_id}`}
                                >
                                  Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="card-body text-white">
                          <p className="card-text">
                            {appointment.doctor_id ? ( //if the appointment has a doctor, display it, if not, dispaly the other_professional
                              <button
                                data-bs-toggle="modal"
                                data-bs-target={`#infoid${appointment.doctor_id}`}
                                className="btn btn-secondary"
                                style={{ marginLeft: -13, outline: "none" }}
                              >
                                <h6 style={{ color: "#8AC6FD" }}>
                                  <i className="fa-solid fa-user-doctor me-1"></i>{" "}
                                  {appointment.firstname} {appointment.lastname}
                                  , {appointment.typeofdoc}
                                </h6>
                              </button>
                            ) : (
                              <h6 className="mb-3 mt-1">
                                <i className="fa-solid fa-user-doctor me-1"></i>{" "}
                                {appointment.other_professional}
                              </h6>
                            )}
                            {new Date(appointment.date).getFullYear() ===
                            currentDate.getFullYear() ? ( //if the year of the appointment matches the current year, don't dispaly the year, if doesn't display it
                              new Date(
                                withYearDate(appointment.date)
                              ).getTime() ===
                              new Date(formattedCurrentDate).getTime() ? ( //if the date matches the current date, display Today
                                <h6>
                                  <i className="fa-solid fa-calendar-check me-1"></i>{" "}
                                  Today, {twelveHourTime(appointment.time)}
                                </h6>
                              ) : new Date(
                                  withYearDate(appointment.date)
                                ).getTime() -
                                  new Date(formattedCurrentDate).getTime() ===
                                oneDayInMilliseconds ? ( //if the date is one day ahead of the current day, display tomorrow
                                <h6>
                                  <i className="fa-solid fa-calendar-check me-1"></i>{" "}
                                  Tomorrow, {twelveHourTime(appointment.time)}
                                </h6>
                              ) : (
                                <h6>
                                  <i className="fa-solid fa-calendar-check me-1"></i>{" "}
                                  {noYearDate(appointment.date)},{" "}
                                  {twelveHourTime(appointment.time)}
                                </h6>
                              )
                            ) : (
                              <h6>
                                <i className="fa-solid fa-calendar-check me-1"></i>{" "}
                                {withYearDate(appointment.date)},{" "}
                                {twelveHourTime(appointment.time)}
                              </h6>
                            )}
                            {appointment.prenotes && (
                              <h6>
                                <i className="fa-regular fa-clipboard me-1"></i>{" "}
                                {appointment.prenotes}
                              </h6>
                            )}
                            {appointment.postnotes && (
                              <h6>
                                <i className="fa-solid fa-clipboard me-1"></i>{" "}
                                {appointment.postnotes}
                              </h6>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
            <h2 className="mt-4">
              <u>Previous</u>
            </h2>
            {!previousApp.length ? (
              <h3
                className="d-flex align-items-center justify-content-center"
                style={{ height: "20vh" }}
              >
                No Previous Appointments
              </h3>
            ) : (
              <div className="d-flex flex-wrap justify-content-start">
                {previousApp
                  .sort((a, b) => {
                    //sorting by the cloest to the furthest date
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);

                    const dateComparison = dateA - dateB;
                    if (dateComparison === 0) {
                      const timeA = new Date(`1970-01-01T${a.time}Z`);
                      const timeB = new Date(`1970-01-01T${b.time}Z`);
                      return timeB - timeA;
                    }
                    return dateB - dateA;
                  })
                  .map((appointment) => (
                    <div
                      key={appointment.appointment_id}
                      style={{ width: "432px", paddingBottom: "0.5rem" }}
                      className="p-2"
                    >
                      <InfoDoctor doctor={appointment} />
                      <EditAppointment
                        appointment={appointment}
                        appointmentList={appointmentList}
                      />
                      <DeleteAppointment
                        withYearDate={withYearDate}
                        appointment={appointment}
                        appointmentList={appointmentList}
                      />
                      <div className="card bg-secondary">
                        <div
                          className="card-header d-flex justify-content-between align-items-center"
                          style={{ backgroundColor: "#65D582" }}
                        >
                          <div className="text-white">{appointment.title}</div>
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
                                  data-bs-target={`#editAppointmentId${appointment.appointment_id}`}
                                >
                                  Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  className="btn btn-white dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target={`#deleteappointmentid${appointment.appointment_id}`}
                                >
                                  Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="card-body text-white">
                          <p className="card-text">
                            {appointment.doctor_id ? (
                              <button
                                data-bs-toggle="modal"
                                data-bs-target={`#infoid${appointment.doctor_id}`}
                                className="btn btn-secondary"
                                style={{ marginLeft: -13, outline: "none" }}
                              >
                                <h6 style={{ color: "#8AC6FD" }}>
                                  <i className="fa-solid fa-user-doctor me-1"></i>{" "}
                                  {appointment.firstname} {appointment.lastname}
                                  , {appointment.typeofdoc}
                                </h6>
                              </button>
                            ) : (
                              <h6 className="mb-3 mt-1">
                                <i className="fa-solid fa-user-doctor me-1"></i>{" "}
                                {appointment.other_professional}
                              </h6>
                            )}
                            {new Date(appointment.date).getFullYear() ===
                            currentDate.getFullYear() ? (
                              new Date(
                                withYearDate(appointment.date)
                              ).getTime() ===
                              new Date(formattedCurrentDate).getTime() ? (
                                <h6>
                                  <i className="fa-solid fa-calendar-check me1"></i>{" "}
                                  Today, {twelveHourTime(appointment.time)}
                                </h6>
                              ) : new Date(
                                  withYearDate(appointment.date)
                                ).getTime() -
                                  new Date(formattedCurrentDate).getTime() ===
                                oneDayInMilliseconds ? (
                                <h6>
                                  <i className="fa-solid fa-calendar-check me-1"></i>{" "}
                                  Tomorrow, {twelveHourTime(appointment.time)}
                                </h6>
                              ) : (
                                <h6>
                                  <i className="fa-solid fa-calendar-check me-1"></i>{" "}
                                  {noYearDate(appointment.date)},{" "}
                                  {twelveHourTime(appointment.time)}
                                </h6>
                              )
                            ) : (
                              <h6>
                                <i className="fa-solid fa-calendar-check me-1"></i>{" "}
                                {withYearDate(appointment.date)},{" "}
                                {twelveHourTime(appointment.time)}
                              </h6>
                            )}
                            {appointment.prenotes && (
                              <h6>
                                <i className="fa-regular fa-clipboard me-1"></i>{" "}
                                {appointment.prenotes}
                              </h6>
                            )}
                            {appointment.postnotes && (
                              <h6>
                                <i className="fa-solid fa-clipboard me-1"></i>{" "}
                                {appointment.postnotes}
                              </h6>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </Layout>
    </div>
  );
};

export default Appointment;
