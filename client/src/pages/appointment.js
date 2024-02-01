import { useState, useEffect } from "react";
import { useDispatch } from "react-redux"
import { fetchAppointmentList, onLogout } from "../api/auth";
import { unauthenticateUser } from "../redux/slices/authSlice";
import Layout from "../components/layout";
import AddAppointment from "../components/addAppointment";
import DeleteAppointment from "../components/deleteAppointment";
import EditAppointment from "../components/editAppointment";
import InfoDoctor from "../components/infoDoctor";

const Appointment = ({name}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [appointment, setAppointment] = useState([])

    const logout = async () => {
        try {
            await onLogout();
            dispatch(unauthenticateUser());
            localStorage.removeItem('isAuth');
        } catch (err) {
            console.log(err.response);
        }
    };

    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const date = currentDate.getDate().toString().padStart(2, '0');

    const formattedCurrentDate = `${year}-${month}-${date}`;


    const noYearDate = (appt) => {
        return new Date(appt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
    };
    //refactor the formatted Time here instead of changing the state like with the appointmentList function below

    const withYearDate = (appt) => {
        return new Date(appt).toISOString().split('T')[0];
    };

    const twelveHourTime = (time) => {
        return new Date(`1970-01-01T${time}Z`)
                .toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                    timeZone: 'UTC'
                });
    }

    const oneDayInMilliseconds = 86400000;

    const upComingApp = appointment
        .filter(
            (appointment) => new Date(withYearDate(appointment.date)).getTime() >= new Date(formattedCurrentDate).getTime()
        );

    const previousApp = appointment
        .filter(
            (appointment) => new Date(appointment.date) < new Date(formattedCurrentDate)
        );
    
    const appointmentList = async () => {
        try {
            const { data } = await fetchAppointmentList();
            setAppointment(data);
            setLoading(false);
        } catch (err) {
            logout();
        }
    };

    useEffect(() => {
        appointmentList();
    }, [])

    return loading ? (
        <Layout name={name}>
            <h1>Loading...</h1>
        </Layout>
    ) : (
        <div>
            <Layout name={name}>
            <div class='mt-3 d-flex align-items-center'>
                <h1><i class="fa-solid fa-calendar-days me-3"></i></h1>
                <h1>Appointments</h1>
                <div class='ms-auto bd-highlight'style={{ paddingLeft: '1rem' }}><AddAppointment appointmentList={appointmentList}/></div>
            </div>
            {!upComingApp.length && !previousApp.length
            ?(
                <div>
                    <h4 class='d-flex justify-content-end align-items-top me-2'>Add Appointments <i class="fa-solid fa-turn-up ms-2"></i></h4>
                    <h1 class='d-flex align-items-center justify-content-center' style={{height: '60vh'}}>No Appointments Added</h1>
                </div>
            ):(
                <div>
                    <h2><u>Upcoming</u></h2>
                    {!upComingApp.length 
                    ?(
                        <h3 class='d-flex align-items-center justify-content-center' style={{height: '20vh'}}>No Upcoming Appointments</h3>
                    ):(
                        <div class='d-flex flex-wrap justify-content-between'>
                        {upComingApp
                            .sort((a,b) => {
                                const dateA = new Date(a.date);
                                const dateB = new Date(b.date);
                                
                                const dateComparison = dateA - dateB;
                                if (dateComparison === 0) {
                                    const timeA = new Date(`1970-01-01T${a.time}Z`);
                                    const timeB = new Date(`1970-01-01T${b.time}Z`);
                                    return timeA - timeB;
                                }
                                return dateA - dateB;
                            })
                            .map((appointment) => (
                                <div key={appointment.appointment_id} style={{ width:'400px', paddingBottom: '0.5rem' }}>
                                    <InfoDoctor doctor={appointment}/>
                                    <EditAppointment appointment={appointment} appointmentList={appointmentList}/>
                                    <DeleteAppointment withYearDate={withYearDate} appointment={appointment} appointmentList={appointmentList}/>
                                    <div class="card bg-secondary">
                                        <div class="card-header d-flex justify-content-between align-items-center" style={{backgroundColor: "#65D582"}}>
                                            <div class='text-white'>{appointment.title}</div>
                                            <div class="dropdown">
                                                <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="fa-solid fa-ellipsis-vertical text-white"></i>
                                                </button>
                                                <ul class="dropdown-menu">
                                                    <li>
                                                        <button type="button" class="btn btn-white dropdown-item" data-bs-toggle="modal" data-bs-target={`#editAppointmentId${appointment.appointment_id}`}>
                                                            Edit
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button type="button" class="btn btn-white dropdown-item" data-bs-toggle="modal" data-bs-target={`#deleteappointmentid${appointment.appointment_id}`}>
                                                            Delete
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="card-body text-white">
                                            <p class="card-text">
                                                {appointment.doctor_id 
                                                    ?(
                                                        <a style={{cursor: 'pointer'}} data-bs-toggle="modal" data-bs-target={`#infoid${appointment.doctor_id}`} >
                                                            <h6 style={{color: "#8AC6FD"}}>
                                                            <i class="fa-solid fa-user-doctor me-1"></i> {appointment.firstname} {appointment.lastname}, {appointment.typeofdoc}
                                                            </h6>
                                                        </a>
                                                    ) 
                                                    :(
                                                        <h6>
                                                            <i class="fa-solid fa-user-doctor me-1"></i> {appointment.other_professional}
                                                        </h6>
                                                    )}
                                                {new Date(appointment.date).getFullYear() === currentDate.getFullYear() 
                                                    ?(
                                                        new Date(withYearDate(appointment.date)).getTime() === new Date(formattedCurrentDate).getTime() 
                                                        ?(
                                                            <h6><i class="fa-solid fa-calendar-check me-1"></i> Today, {twelveHourTime(appointment.time)}</h6>
                                                        ) 
                                                        :new Date(withYearDate(appointment.date)).getTime() - new Date(formattedCurrentDate).getTime() === oneDayInMilliseconds 
                                                            ?(
                                                            <h6><i class="fa-solid fa-calendar-check me-1"></i> Tomorrow, {twelveHourTime(appointment.time)}</h6>
                                                            )
                                                            :(
                                                            <h6><i class="fa-solid fa-calendar-check me-1"></i> {noYearDate(appointment.date)}, {twelveHourTime(appointment.time)}</h6>
                                                            )
                                                    ):(
                                                    <h6><i class="fa-solid fa-calendar-check me-1"></i> {withYearDate(appointment.date)}, {twelveHourTime(appointment.time)}</h6>
                                                    )
                                                }                                               
                                                {appointment.prenotes && <h6><i class="fa-regular fa-clipboard me-1"></i> {appointment.prenotes}</h6>}
                                                {appointment.postnotes && <h6><i class="fa-solid fa-clipboard me-1"></i> {appointment.postnotes}</h6>}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                    )}
                    <h2 class='mt-4'><u>Previous</u></h2>
                    {!previousApp.length 
                    ?(
                        <h3 class='d-flex align-items-center justify-content-center' style={{height: '20vh'}}>No Previous Appointments</h3>
                    ):(
                        <div class='d-flex flex-wrap justify-content-between'>
                            {previousApp
                                .sort((a,b) => {
                                    const dateA = new Date(a.date);
                                    const dateB = new Date(b.date);
                                    
                                    const dateComparison = dateA - dateB;
                                    if (dateComparison === 0) {
                                        const timeA = new Date(`1970-01-01T${a.time}Z`);
                                        const timeB = new Date(`1970-01-01T${b.time}Z`);
                                        return timeB - timeA;
                                    }
                                    return dateB - dateA;
                                })
                                .map((appointment) => (
                                    <div key={appointment.appointment_id} style={{ width:'400px', paddingBottom: '0.5rem' }}>
                                        <InfoDoctor doctor={appointment}/>
                                        <EditAppointment appointment={appointment} appointmentList={appointmentList}/>
                                        <DeleteAppointment withYearDate={withYearDate} appointment={appointment} appointmentList={appointmentList}/>
                                        <div class="card bg-secondary">
                                            <div class="card-header d-flex justify-content-between align-items-center" style={{backgroundColor: "#65D582"}}>
                                                <div class='text-white'>{appointment.title}</div>
                                                <div class="dropdown">
                                                    <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i class="fa-solid fa-ellipsis-vertical text-white"></i>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li>
                                                            <button type="button" class="btn btn-white dropdown-item" data-bs-toggle="modal" data-bs-target={`#editAppointmentId${appointment.appointment_id}`}>
                                                                Edit
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button type="button" class="btn btn-white dropdown-item" data-bs-toggle="modal" data-bs-target={`#deleteappointmentid${appointment.appointment_id}`}>
                                                                Delete
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="card-body text-white">
                                                <p class="card-text">
                                                    {appointment.doctor_id 
                                                        ?(<a style={{cursor: 'pointer'}} data-bs-toggle="modal" data-bs-target={`#infoid${appointment.doctor_id}`} >
                                                            <h6 style={{color: "#8AC6FD"}}>
                                                                <i class="fa-solid fa-user-doctor me-1"></i> {appointment.firstname} {appointment.lastname}, {appointment.typeofdoc}
                                                            </h6>
                                                        </a>) 
                                                        :(<h6>
                                                            <i class="fa-solid fa-user-doctor me-1"></i> {appointment.other_professional}
                                                        </h6>)}
                                                    {new Date(appointment.date).getFullYear() === currentDate.getFullYear() 
                                                        ?(new Date(withYearDate(appointment.date)).getTime() === new Date(formattedCurrentDate).getTime() 
                                                            ?(<h6><i class="fa-solid fa-calendar-check me1"></i> Today, {twelveHourTime(appointment.time)}</h6>) 
                                                            : new Date(withYearDate(appointment.date)).getTime() - new Date(formattedCurrentDate).getTime() === oneDayInMilliseconds 
                                                                ?(<h6><i class="fa-solid fa-calendar-check me-1"></i> Tomorrow, {twelveHourTime(appointment.time)}</h6>)
                                                                :(<h6><i class="fa-solid fa-calendar-check me-1"></i> {noYearDate(appointment.date)}, {twelveHourTime(appointment.time)}</h6>))
                                                        :(<h6><i class="fa-solid fa-calendar-check me-1"></i> {withYearDate(appointment.date)}, {twelveHourTime(appointment.time)}</h6>)}
                                                    {appointment.prenotes && <h6><i class="fa-regular fa-clipboard me-1"></i> {appointment.prenotes}</h6>}
                                                    {appointment.postnotes && <h6><i class="fa-solid fa-clipboard me-1"></i> {appointment.postnotes}</h6>}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </div>
            )}
            </Layout>
        </div>
        )
    };

    export default Appointment;