
const InfoDoctor = ({doctor}) => {

    return (
        <div>
            <div class="modal fade" id={`infoid${doctor.doctor_id}`} tabindex="-1" role="dialog" aria-labelledby="infoModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editModalLabel">Info</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <div class="modal-body">
                    <div className='mb-3'>
                        <label htmlFor="firstname" className="form-label">
                        {doctor.firstname} {doctor.lastname}, {doctor.typeofdoc}
                        </label>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="lastname" className="form-label">
                            <i class="fa-solid fa-phone"></i> {doctor.phonenumber}
                        </label>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="typeofdoc" className="form-label">
                            <i class="fa-solid fa-location-dot me-1"></i> {doctor.location}
                        </label>
                    </div>
                    {doctor.notes && (
                        <div className='mb-3'>
                            <label htmlFor="phonenumber" className="form-label">
                                <i class="fa-solid fa-clipboard me-1"></i> {doctor.notes}
                            </label>
                        </div>
                    )}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>
        </div>
    );

};

export default InfoDoctor;