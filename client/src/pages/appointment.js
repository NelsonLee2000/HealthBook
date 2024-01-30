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

    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    
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
            <div>
                <h1>Upcoming</h1>
                {appointment
                    .filter((appointment) => new Date(withYearDate(appointment.date)).getTime() >= new Date(formattedCurrentDate).getTime())
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
                        <div key={appointment.appointment_id}>
                            <h2>{appointment.title}</h2>
                            {appointment.doctor_id ? (<InfoDoctor doctor={appointment}/>) 
                            :(<h5>{appointment.other_professional}</h5>)}
                            {new Date(appointment.date).getFullYear() === currentDate.getFullYear() ? (
                            new Date(withYearDate(appointment.date)).getTime() === new Date(formattedCurrentDate).getTime() ? (
                                <h5>Today, {twelveHourTime(appointment.time)}</h5>
                            ) : new Date(withYearDate(appointment.date)).getTime() - new Date(formattedCurrentDate).getTime() === oneDayInMilliseconds ? (
                            <h5>Tomorrow, {twelveHourTime(appointment.time)}</h5>
                            ):(<h5>{noYearDate(appointment.date)}, {twelveHourTime(appointment.time)}</h5>)
                            ): (<h5>{withYearDate(appointment.date)}, {twelveHourTime(appointment.time)}</h5>)}
                            {appointment.prenotes && <h6>prenotes: {appointment.prenotes}</h6>}
                            {appointment.postnotes && <h6>postnotes: {appointment.postnotes}</h6>}
                            <div><EditAppointment appointment={appointment} appointmentList={appointmentList}/></div>
                            <div><DeleteAppointment withYearDate={withYearDate} appointment={appointment} appointmentList={appointmentList}/></div>
                        </div>
                    ))
                }
            </div>
            <div>
                <h1>Previous</h1>
                {appointment
                    .filter((appointment) => new Date(appointment.date) < new Date(formattedCurrentDate))
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
                        <div key={appointment.appointment_id}>
                            <h2>{appointment.title}</h2>
                            {appointment.doctor_id ? (<InfoDoctor doctor={appointment}/>) 
                            :(<h5>{appointment.other_professional}</h5>)}
                            {new Date(appointment.date).getFullYear() === currentDate.getFullYear()
                            ? (<h5>{noYearDate(appointment.date)}, {twelveHourTime(appointment.time)}</h5>
                            ): (<h5>{withYearDate(appointment.date)}, {twelveHourTime(appointment.time)}</h5>)}
                            {appointment.prenotes && <h6>prenotes: {appointment.prenotes}</h6>}
                            {appointment.postnotes && <h6>postnotes: {appointment.postnotes}</h6>}
                            <div><EditAppointment appointment={appointment} appointmentList={appointmentList}/></div>
                            <div><DeleteAppointment withYearDate={withYearDate} appointment={appointment} appointmentList={appointmentList}/></div>
                        </div>
                    ))
                }
            </div>
        </Layout>
        </div>
    )
};

export default Appointment;