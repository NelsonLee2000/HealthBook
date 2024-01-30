import { useState, useEffect} from "react";
import { onEditMedicine } from "../api/auth";
import { fetchDoctorList } from "../api/auth";


const EditMedicine = ({medicine, medicineList}) => {

    const [values, setValues] = useState({
        name: medicine.name,
        func: medicine.function,
        frequency: medicine.frequency,
        prescription: medicine.prescription,
        otherPrescriber: medicine.other_prescriber,
        doctorId: medicine.doctor_id,
      });

    const resetValues = () => {
        setValues({
            name: medicine.name,
            func: medicine.function,
            frequency: medicine.frequency,
            prescription: medicine.prescription,
            otherPrescriber: medicine.other_prescriber,
            doctorId: medicine.doctor_id,
          });
    };

    const [doctors, setDoctors] = useState([])
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [otherPrescriber, setOtherPrescriber] = useState(false)

    const resetErrorAndSuccess = () => {
        setError("");
        setSuccess("");
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
          const { data } = await onEditMedicine(medicine.medicine_id, values);
          setError('');
          setSuccess(data.message);
          medicineList();
        } catch (err) {
          console.log(err.response.data.errors[0].msg)
          setError(err.response.data.errors[0].msg);
          setSuccess('')
        }
      };

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
        resetErrorAndSuccess();
      }

    const onChangePrescriber = (e) => {
        if (e.target.value === "other") {
            setValues({...values, [e.target.name]: null});
            setOtherPrescriber(true);
            resetErrorAndSuccess();
        } else {
            setValues({...values, 
                [e.target.name]: e.target.value,
                otherPrescriber: ""
            });
            setOtherPrescriber(false);
            resetErrorAndSuccess();
        }
        };


    const doctorList = async () => {
        try {
          const { data } = await fetchDoctorList();
          let sortedData = [...data].sort((a, b) => a.doctor_id - b.doctor_id);
          setDoctors(sortedData);
        } catch (err) {
            console.error(err.message)
        }
    };

    const onChangeRadio = (e) => {
        if (e.target.value === "false") {
            setValues({...values, 
                [e.target.name]: false,
                otherPrescriber: "",
                doctorId: null
            });
            setOtherPrescriber(false);
        } else {
            setValues({...values, [e.target.name]: true});
            doctorList();
        };
    };
    
    const onClick = () => {
        resetValues();
        resetErrorAndSuccess();
        if (!medicine.other_prescriber) {
            setOtherPrescriber(false);
        } else if (medicine.other_prescriber) {
            setOtherPrescriber(true);
        }
    };

    // useEffect(() => {
    //     console.log("From useEffect", values);
    // }, [values],);

    useEffect(() => {
        setOtherPrescriber(values.otherPrescriber !== "");
        doctorList();
    }, [],);

    return (
        <div>
            <form onSubmit={(e) => onSubmit(e)} className='container mt-3'>
            <div class="modal fade" id={`editMedicineId${medicine.medicine_id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit Medicine</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClick}>
                    </button>
                </div>
                <div class="modal-body">
                    <div className='mb-3'>
                        <label htmlFor="name" className="form-label">
                        Name
                        </label>
                        <input
                        onChange={(e) => onChange(e)}
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={values.name} 
                        /> 
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="func" className="form-label">
                        Function
                        </label>
                        <input
                        onChange={(e) => onChange(e)}
                        type="text"
                        className="form-control"
                        id="func"
                        name="func"
                        value={values.func} 
                        /> 
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="frequency" className="form-label">
                        Frequency
                        </label>
                        <input
                        onChange={(e) => onChange(e)}
                        type="text"
                        className="form-control"
                        id="frequency"
                        name="frequency"
                        value={values.frequency} 
                        /> 
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="prescription" className="form-label">
                        Prescription
                        </label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="prescription" id="prescriptionFalse" onChange={(e) => onChangeRadio(e)} value = "false" checked={!values.prescription}>
                            </input>
                            <label class="form-check-label" for="flexRadioDefault">
                                No
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="prescription" id="prescriptionTrue" onChange={(e) => onChangeRadio(e)} value = "true" checked={values.prescription} >
                            </input>
                            <label class="form-check-label" for="flexRadioDefault2">
                                Yes
                            </label>
                        </div>
                    </div>
                    {values.prescription === true && (
                        <div>
                        <select class="form-select" aria-label="Default select example" name='doctorId' onChange={(e) => onChangePrescriber(e)} value={values.doctorId}>
                            {medicine.doctor_id ? (
                                <>
                                    <option value={medicine.doctor_id}>{medicine.firstname} {medicine.lastname}, {medicine.typeofdoc}</option>
                                    <option value="other">Other</option>
                                    
                                </>
                            ): medicine.other_prescriber ? (
                                <>
                                    <option value='other' selected={otherPrescriber}>Other</option>
                                </>
                            ) : (
                                <>
                                    <option disabled selected>Select a Prescriber</option>
                                    <option value="other">Other</option>
                                </>
                            )}
                            {doctors
                            .filter((doctor) => doctor.doctor_id !== medicine.doctor_id)
                            .map((doctor) => (
                                <option value={doctor.doctor_id} key={doctor.doctor_id} >{doctor.firstname} {doctor.lastname}, {doctor.typeofdoc}</option>
                            ))}
                        </select>
                        {otherPrescriber && (
                            <div className='mb-3'>
                            <input
                            onChange={(e) => onChange(e)}
                            type="text"
                            className="form-control"
                            id="otherPrescriber"
                            name="otherPrescriber"
                            value={values.otherPrescriber}
                            placeholder="Provide the prescriber here"
                            /> 
                        </div>
                        )}
                        </div>
                    )}

                    <div style={{color: 'red', margin: '10px 0'}}>{error}</div>
                    <div style={{color: 'green', margin: '10px 0'}}>{success}</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={onClick}>Close</button>
                    <button type="submit" class="btn btn-primary">Edit</button>
                </div>
                </div>
            </div>
            </div>
            </form>
        </div>
    );

};

export default EditMedicine