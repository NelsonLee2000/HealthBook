import { onDeleteDoctor } from "../api/auth";

const DeleteDoctor = ({ doctor, doctorList }) => {
  //delete professional
  const onDelete = async (e) => {
    e.preventDefault();
    try {
      await onDeleteDoctor(doctor.doctor_id);
      doctorList();
    } catch (err) {
      console.error("Error deleting doctor:", err.message);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id={`deleteid${doctor.doctor_id}`}
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete Professional
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Delete {doctor.firstname} {doctor.lastname}, {doctor.typeofdoc}?
              </p>
              <p className="text-danger">
                Warning: Deleting this professional will also delete all
                medication and appointments associated with this individual
              </p>
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

export default DeleteDoctor;
