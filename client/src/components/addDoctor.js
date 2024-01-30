import { useState } from "react";
import { onAddDoctor } from "../api/auth";


const AddDoctor = ({doctorList}) => {

    const [values, setValues] = useState({
        firstname: '',
        lastname: '',
        typeofdoc: '',
        phonenumber: '',
        location: '',
        notes: ''
      });

    const resetValues = () => {
        setValues({
            firstname: '',
            lastname: '',
            typeofdoc: '',
            phonenumber: '',
            location: '',
            notes: ''
          });
    }

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const resetErrorAndSuccess = () => {
        setError("");
        setSuccess("");
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
          const { data } = await onAddDoctor(values);
          setError('');
          setSuccess(data.message);
          resetValues();
          doctorList();
        } catch (err) {
          console.log(err.response.data.errors[0].msg)
          setError(err.response.data.errors[0].msg);
          setSuccess('')
        }
      };

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
        resetErrorAndSuccess();
      };

    const onClick = () => {
        resetValues();
        resetErrorAndSuccess();
    };

    return (
        <div>
            <button class='btn btn-primary' type="button" data-bs-toggle="modal" data-bs-target="#addDoctor">
            <i class="fa-solid fa-plus"></i>
            </button>
            <form onSubmit={(e) => onSubmit(e)} className='container mt-3'>
            <div class="modal fade" id="addDoctor" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add Doctor</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClick}></button>
                </div>
                <div class="modal-body">
                    <div className='mb-3'>
                        <label htmlFor="firstname" className="form-label">
                        First Name
                        </label>
                        <input
                        onChange={(e) => onChange(e)}
                        type="text"
                        className="form-control"
                        id="firstname"
                        name="firstname"
                        value={values.firstname} 
                        /> 
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="lastname" className="form-label">
                        Last Name
                        </label>
                        <input
                        onChange={(e) => onChange(e)}
                        type="text"
                        className="form-control"
                        id="lastname"
                        name="lastname"
                        value={values.lastname} 
                        /> 
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="typeofdoc" className="form-label">
                        Type of Professional
                        </label>
                        <input
                        onChange={(e) => onChange(e)}
                        type="text"
                        className="form-control"
                        id="typeofdoc"
                        name="typeofdoc"
                        value={values.typeofdoc} 
                        /> 
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="phonenumber" className="form-label">
                        Phone Number
                        </label>
                        <input
                        onChange={(e) => onChange(e)}
                        type="tel"
                        className="form-control"
                        id="phonenumber"
                        name="phonenumber"
                        value={values.phonenumber} 
                        /> 
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="location" className="form-label">
                        Address
                        </label>
                        <input
                        onChange={(e) => onChange(e)}
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        value={values.location} 
                        /> 
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="notes" className="form-label">
                        Notes (Optional)
                        </label>
                        <input
                        onChange={(e) => onChange(e)}
                        type="text"
                        className="form-control"
                        id="notes"
                        name="notes"
                        value={values.notes}
                        /> 
                    </div>
                    <div style={{color: 'red', margin: '10px 0'}}>{error}</div>
                    <div style={{color: 'green', margin: '10px 0'}}>{success}</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={onClick}>Close</button>
                    <button type="submit" class="btn btn-primary">Add</button>
                </div>
                </div>
            </div>
            </div>
            </form>
        </div>
    );

};

export default AddDoctor