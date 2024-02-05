import { onDeleteAppointment } from "../api/auth";

const DeleteAppointment = ({ appointment, appointmentList, withYearDate }) => {
  //delete appointment
  const onDelete = async (e) => {
    e.preventDefault();
    try {
      await onDeleteAppointment(appointment.appointment_id);
      appointmentList();
    } catch (err) {
      console.error("Error deleting appointment:", err.message);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id={`deleteappointmentid${appointment.appointment_id}`}
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete Appopintment
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Delete {appointment.title} on {withYearDate(appointment.date)} ?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={onDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteAppointment;
