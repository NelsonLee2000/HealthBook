import axios from "axios";
axios.defaults.withCredentials = true;

export async function onRegistration(registrationData) {
  return await axios.post(
    "https://healthbook-server.onrender.com/api/register",
    registrationData
  );
}

export async function onLogin(loginData) {
  return await axios.post("https://healthbook-server.onrender.com/api/login", loginData);
}

export async function onLogout() {
  return axios.get("https://healthbook-server.onrender.com/api/logout");
}

export async function fetchUser() {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get("https://healthbook-server.onrender.com/api/user", config);
}

export async function onAddDoctor(doctorData) {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post("https://healthbook-server.onrender.com/api/doctor", doctorData, config);
}

export async function fetchDoctorList() {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get("https://healthbook-server.onrender.com/api/doctor", config);
}

export async function onDeleteDoctor(doctorId) {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.delete(`https://healthbook-server.onrender.com/api/doctor/${doctorId}`, config);
}

export async function onEditDoctor(doctorId, updatedData) {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.put(`https://healthbook-server.onrender.com/api/doctor/${doctorId}`, updatedData, config);
}

export async function fetchMedicineList() {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get("https://healthbook-server.onrender.com/api/medicine", config);
}

export async function onDeleteMedicine(medicineId) {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.delete(`https://healthbook-server.onrender.com/api/medicine/${medicineId}`, config);
}

export async function onAddMedicine(medicineData) {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post("https://healthbook-server.onrender.com/api/medicine", medicineData, config);
}

export async function onEditMedicine(medicineId, updatedData) {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.put(
    `https://healthbook-server.onrender.com/api/medicine/${medicineId}`,
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
  return axios.get("https://healthbook-server.onrender.com/api/appointment", config);
}

export async function onAddAppointment(appointmentData) {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post("https://healthbook-server.onrender.com/api/appointment", appointmentData, config);
}

export async function onDeleteAppointment(appointmentId) {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.delete(`https://healthbook-server.onrender.com/api/appointment/${appointmentId}`, config);
}

export async function OnEditAppointment(appointmentId, updatedData) {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.put(
    `https://healthbook-server.onrender.com/api/appointment/${appointmentId}`,
    updatedData, config
  );
}
