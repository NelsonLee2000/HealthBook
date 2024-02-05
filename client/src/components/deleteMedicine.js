import { onDeleteMedicine } from "../api/auth";

const DeleteMedicine = ({ medicine, medicineList }) => {
  //delete medicine
  const onDelete = async (e) => {
    e.preventDefault();
    try {
      await onDeleteMedicine(medicine.medicine_id);
      medicineList();
    } catch (err) {
      console.error("Error deleting medicine:", err.message);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id={`deleteid${medicine.medicine_id}`}
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete Medicine
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Delete {medicine.name}?</div>
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

export default DeleteMedicine;
