const {Router} = require('express');
const { getUser, register, login, protected, logout, getDoctors, newDoctor, editDoctor, deleteDoctor, getMedicine, newMedicine, editMedicine, deleteMedicine, getAppointments, newAppointment, editAppointment, deleteAppointment} = require('../controllers/auth');
const { registerValidation, loginValidation, doctorValidation, medicineValidation, appointmentValidation } = require('../validators/auth');
const { validationsMiddleware } = require('../middlewares/validations-middleware');
const { userAuth } = require('../middlewares/auth-middleware');
const router = Router();

//routes for register, login, and get user
router.get('/user', getUser);
router.post('/register', registerValidation, validationsMiddleware, register);
router.post('/login', loginValidation, validationsMiddleware, login);
router.get('/logout', logout);

//routes for doctors
router.get('/doctor', userAuth, getDoctors); //this works on postman! when signed into the right account returns an array with the rows of doctors as objects
router.post('/doctor', doctorValidation, validationsMiddleware, newDoctor); //this works on postman! it will make a new doctor that belongs to the signed in account
router.put('/doctor/:id', doctorValidation, validationsMiddleware, editDoctor); //this works on post man! it will edit the doctor in the parameters
router.delete('/doctor/:id', userAuth, deleteDoctor); //this works on post man! it will delete the doctor in the paramters, including all associated medicine and appointments with the specific foreign key

//routes for medicine
router.get('/medicine', userAuth, getMedicine); // works on postman! gets all medicine that belongs to the logged in user
router.post('/medicine', medicineValidation, validationsMiddleware, newMedicine) //works on postman! inserts a new rows of medicine into the db
router.put('/medicine/:id', medicineValidation, validationsMiddleware, editMedicine) // works on postman! updates the selected db row
router.delete('/medicine/:id', userAuth, deleteMedicine) //works on postman! deletes selected medicine from db

//routes for appointments
router.get('/appointment', userAuth, getAppointments) //works on postman! returns all appointments of the user
router.post('/appointment', appointmentValidation, validationsMiddleware, newAppointment) //works on postman! add an appointment into the db
router.put('/appointment/:id', appointmentValidation, validationsMiddleware, editAppointment) //works on postman! updates the selected appointment in the db
router.delete('/appointment/:id', userAuth, deleteAppointment) //works on postman! deletes the selected appointment in the db 

module.exports = router