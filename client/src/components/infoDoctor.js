const InfoDoctor = ({ doctor }) => {
  return (
    <div>
      <div
        className="modal fade"
        id={`infoid${doctor.doctor_id}`}
        tabindex="-1"
        role="dialog"
        aria-labelledby="infoModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">
                Info
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="firstname" className="form-label">
                  {doctor.firstname} {doctor.lastname}, {doctor.typeofdoc}
                </label>
              </div>

              <div className="mb-3">
                <label htmlFor="lastname" className="form-label">
                  <i className="fa-solid fa-phone"></i> {doctor.phonenumber}
                </label>
              </div>

              <div className="mb-3">
                <label htmlFor="typeofdoc" className="form-label">
                  <i className="fa-solid fa-location-dot me-1"></i>{" "}
                  {doctor.location}
                </label>
              </div>
              {doctor.notes && (
                <div className="mb-3">
                  <label htmlFor="phonenumber" className="form-label">
                    <i className="fa-solid fa-clipboard me-1"></i>{" "}
                    {doctor.notes}
                  </label>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoDoctor;
