const {Router} = require('express');
const { getUser, register, login, protected, logout, getDoctors, newDoctor, editDoctor, deleteDoctor, getMedicine, newMedicine, editMedicine, deleteMedicine, getAppointments, newAppointment, editAppointment, deleteAppointment} = require('../controllers/auth');
const { registerValidation, loginValidation, doctorValidation, medicineValidation, appointmentValidation } = require('../validators/auth');
const { validationsMiddleware } = require('../middlewares/validations-middleware');
const { userAuth } = require('../middlewares/auth-middleware');
const router = Router();
const multer = require('multer')

//routes for login, logout, protected data
router.get('/user', getUser);
router.get('/protected', userAuth, protected)
router.post('/register', registerValidation, validationsMiddleware, register);
router.post('/login', loginValidation, validationsMiddleware, login);
router.get('/logout', logout);

//routes for doctors
router.get('/doctor', userAuth, getDoctors); //this works on postman! when signed into the right account returns an array with the rows of doctors as objects
router.post('/doctor', doctorValidation, validationsMiddleware, newDoctor); //this works on postman! it will make a new doctor that belongs to the signed in account
router.put('/doctor/:id', doctorValidation, validationsMiddleware, editDoctor); //this works on post man! it will edit the doctor in the parameters
router.delete('/doctor/:id', userAuth, deleteDoctor); //this works on post man! it will delete the doctor in the paramters

router.get('/medicine', userAuth, getMedicine); // works on postman! the join with the doctor table works perfectly
router.post('/medicine', medicineValidation, validationsMiddleware, newMedicine) //works on postman!
router.put('/medicine/:id', medicineValidation, validationsMiddleware, editMedicine) // works on postman!
router.delete('/medicine/:id', userAuth, deleteMedicine) //works on postman!

router.get('/appointment', userAuth, getAppointments) //works on postman!
router.post('/appointment', appointmentValidation, validationsMiddleware, newAppointment) //works on postman!
router.put('/appointment/:id', appointmentValidation, validationsMiddleware, editAppointment) //works on postman!
router.delete('/appointment/:id', userAuth, deleteAppointment) //works on postman!


module.exports = router