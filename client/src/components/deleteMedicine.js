import { onDeleteMedicine } from "../api/auth";
 

const DeleteMedicine = ({medicine, medicineList}) => {

    const onDelete = async (e) => {
        e.preventDefault();
        try {
            await onDeleteMedicine(medicine.medicine_id);
            medicineList();
        } catch (err) {
            console.error('Error deleting medicine:', err.message);
        }
    };

    return (
        <>
            <div class="modal fade" id={`deleteid${medicine.medicine_id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Delete Medicine</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <div class="modal-body">
                    Delete {medicine.name}?
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

export default DeleteMedicine