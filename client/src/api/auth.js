import axios from "axios";
axios.defaults.withCredentials = true;

export async function onRegistration(registrationData) {
  return await axios.post(
    "https://healthbook-backend.onrender.com/api/register",
    registrationData
  );
}

export async function onLogin(loginData) {
  return await axios.post("https://healthbook-backend.onrender.com/api/login", loginData);
}

export async function onLogout() {
  return axios.get("https://healthbook-backend.onrender.com/api/logout");
}

export async function fetchProtectedInfo() {
  return axios.get("https://healthbook-backend.onrender.com/api/protected");
}

export async function fetchUser() {
  return axios.get("https://healthbook-backend.onrender.com/api/user");
}

export async function onAddDoctor(doctorData) {
  return axios.post("https://healthbook-backend.onrender.com/api/doctor", doctorData);
}

export async function fetchDoctorList() {
  return axios.get("https://healthbook-backend.onrender.com/api/doctor");
}

export async function onDeleteDoctor(doctorId) {
  return axios.delete(`https://healthbook-backend.onrender.com/api/doctor/${doctorId}`);
}

export async function onEditDoctor(doctorId, updatedData) {
  return axios.put(`https://healthbook-backend.onrender.com/api/doctor/${doctorId}`, updatedData);
}

export async function fetchMedicineList() {
  return axios.get("https://healthbook-backend.onrender.com/api/medicine");
}

export async function onDeleteMedicine(medicineId) {
  return axios.delete(`https://healthbook-backend.onrender.com/api/medicine/${medicineId}`);
}

export async function onAddMedicine(medicineData) {
  return axios.post("https://healthbook-backend.onrender.com/api/medicine", medicineData);
}

export async function onEditMedicine(medicineId, updatedData) {
  return axios.put(
    `https://healthbook-backend.onrender.com/api/medicine/${medicineId}`,
    updatedData
  );
}

export async function fetchAppointmentList() {
  return axios.get("https://healthbook-backend.onrender.com/api/appointment");
}

export async function onAddAppointment(appointmentData) {
  return axios.post("https://healthbook-backend.onrender.com/api/appointment", appointmentData);
}

export async function onDeleteAppointment(appointmentId) {
  return axios.delete(`https://healthbook-backend.onrender.com/api/appointment/${appointmentId}`);
}

export async function OnEditAppointment(appointmentId, updatedData) {
  return axios.put(
    `https://healthbook-backend.onrender.com/api/appointment/${appointmentId}`,
    updatedData
  );
}
