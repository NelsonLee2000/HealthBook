import axios from "axios";
axios.defaults.withCredentials = true;

export async function onRegistration(registrationData) {
  return await axios.post(
    "http://localhost:4000/api/register",
    registrationData
  );
}

export async function onLogin(loginData) {
  return await axios.post("http://localhost:4000/api/login", loginData);
}

export async function onLogout() {
  return axios.get("http://localhost:4000/api/logout");
}

export async function fetchUser() {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get("http://localhost:4000/api/user", config);
}

export async function onAddDoctor(doctorData) {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post("http://localhost:4000/api/doctor", doctorData, config);
}

export async function fetchDoctorList() {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get("http://localhost:4000/api/doctor", config);
}

export async function onDeleteDoctor(doctorId) {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.delete(`http://localhost:4000/api/doctor/${doctorId}`, config);
}

export async function onEditDoctor(doctorId, updatedData) {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.put(`http://localhost:4000/api/doctor/${doctorId}`, updatedData, config);
}

export async function fetchMedicineList() {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get("http://localhost:4000/api/medicine", config);
}

export async function onDeleteMedicine(medicineId) {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.delete(`http://localhost:4000/api/medicine/${medicineId}`, config);
}

export async function onAddMedicine(medicineData) {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post("http://localhost:4000/api/medicine", medicineData, config);
}

export async function onEditMedicine(medicineId, updatedData) {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.put(
    `http://localhost:4000/api/medicine/${medicineId}`,
    updatedData, config
  );
}

export async function fetchAppointmentList() {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get("http://localhost:4000/api/appointment", config);
}

export async function onAddAppointment(appointmentData) {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post("http://localhost:4000/api/appointment", appointmentData, config);
}

export async function onDeleteAppointment(appointmentId) {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.delete(`http://localhost:4000/api/appointment/${appointmentId}`, config);
}

export async function OnEditAppointment(appointmentId, updatedData) {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.put(
    `http://localhost:4000/api/appointment/${appointmentId}`,
    updatedData, config
  );
}
