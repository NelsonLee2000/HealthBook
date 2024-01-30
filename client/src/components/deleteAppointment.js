import { onDeleteAppointment } from "../api/auth";
 

const DeleteAppointment = ({appointment, appointmentList, withYearDate}) => {

    const onDelete = async (e) => {
        e.preventDefault();
        try {
            await onDeleteAppointment(appointment.appointment_id);
            appointmentList();
        } catch (err) {
            console.error('Error deleting appointment:', err.message);
        }
    };

    return (
        <>
            <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#deleteappointmentid${appointment.appointment_id}`}>
            Delete
            </button>

            <div class="modal fade" id={`deleteappointmentid${appointment.appointment_id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Delete Appopintment</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">

                    </button>
                </div>
                <div class="modal-body">
                    Delete {appointment.title} on {withYearDate(appointment.date)} ?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={onDelete}>Delete</button>
                </div>
                </div>
            </div>
            </div>
        </>
    );
};

export default DeleteAppointment