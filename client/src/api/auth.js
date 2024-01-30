import axios from 'axios'; 
axios.defaults.withCredentials = true;

export async function onRegistration(registrationData) {
    return await axios.post(
        'http://localhost:4000/api/register', 
        registrationData
    );
};

export async function onLogin(loginData) {
    return await axios.post(
        'http://localhost:4000/api/login',
        loginData
    );
};

export async function onLogout() {
    return axios.get(
        'http://localhost:4000/api/logout'
    );
};

export async function fetchProtectedInfo() {
    return axios.get(
        'http://localhost:4000/api/protected'
    );
};

export async function fetchUser() {
    return axios.get(
        'http://localhost:4000/api/user'
    );
};

export async function onAddDoctor(doctorData) {
    return axios.post(
        'http://localhost:4000/api/doctor',
        doctorData
    );
};

export async function fetchDoctorList() {
    return axios.get(
        'http://localhost:4000/api/doctor'
    );
};

export async function onDeleteDoctor(doctorId) {
    return axios.delete(
        `http://localhost:4000/api/doctor/${doctorId}`
    );
};

export async function onEditDoctor(doctorId, updatedData) {
    return axios.put(
        `http://localhost:4000/api/doctor/${doctorId}`,
        updatedData
    );
};

export async function fetchMedicineList() {
    return axios.get(
        'http://localhost:4000/api/medicine'
    );
};

export async function onDeleteMedicine(medicineId) {
    return axios.delete(
        `http://localhost:4000/api/medicine/${medicineId}`,
    );
};

export async function onAddMedicine(medicineData) {
    return axios.post(
        'http://localhost:4000/api/medicine',
        medicineData
    );
};

export async function onEditMedicine(medicineId, updatedData) {
    return axios.put(
        `http://localhost:4000/api/medicine/${medicineId}`,
        updatedData
    );
};

export async function fetchAppointmentList() {
    return axios.get(
        'http://localhost:4000/api/appointment'
    );
};

export async function onAddAppointment(appointmentData) {
    return axios.post(
        'http://localhost:4000/api/appointment',
        appointmentData
    );
};

export async function onDeleteAppointment(appointmentId) {
    return axios.delete(
        `http://localhost:4000/api/appointment/${appointmentId}`
    );
};

export async function OnEditAppointment(appointmentId, updatedData) {
    return axios.put(
        `http://localhost:4000/api/appointment/${appointmentId}`,
        updatedData
    );
};