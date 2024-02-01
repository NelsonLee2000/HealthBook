import { onDeleteDoctor } from "../api/auth";
 

const DeleteDoctor = ({doctor, doctorList}) => {

    const onDelete = async (e) => {
        e.preventDefault();
        try {
            await onDeleteDoctor(doctor.doctor_id);
            doctorList();
        } catch (err) {
            console.error('Error deleting doctor:', err.message);
        }
    };

    return (
        <>
            <div class="modal fade" id={`deleteid${doctor.doctor_id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Delete Professional</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <div class="modal-body">
                    <p>Delete {doctor.firstname} {doctor.lastname}, {doctor.typeofdoc}?</p>
                    <p class="text-danger">Warning: Deleting this professional will also delete all medication and appointments associated with this individual</p>
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

export default DeleteDoctor