const { check } = require('express-validator');
const db = require('../db');
const { compare } = require('bcrypt');

//first name
const firstname = check('firstname')
    .isLength({min: 1, max: 100})
    .withMessage('Provide a first name');

//last name
const lastname = check('lastname')
    .isLength({min: 1, max: 100})
    .withMessage('Provide a last name');

//password
const password = check('password')
    .isLength({ min: 6, max: 15 })
    .withMessage('Password must be between 6 and 15 characters.');

//confirmed password
const confirmPassword = check('confirmedPassword').custom(async (value, { req }) => {
    const password = req.body.password;
    if (value !== password) {
        throw new Error('Passwords must match')
    };
});

//email
const email = check('email')
    .isEmail()
    .withMessage('Provide a valid email'); 

//check if email exists
const emailExists = check('email').custom(async (value) => {
    const { rows } = await db.query('SELECT * FROM \"user\" WHERE email =$1',
        [value,])
    
    if (rows.length) {
        throw new Error('Email already exists')
    };
    });

//login validation    
const loginFieldsCheck = check('email').custom(async (value, { req }) => {
    const user = await db.query('SELECT * FROM \"user\" WHERE email = $1', 
    [value])
    if (!user.rows.length) {
        throw new Error('Email is not registered')
    };

    const validPassword = await compare(req.body.password, user.rows[0].password);
 
    if (!validPassword) {
        throw new Error('Wrong password')
    }

    req.user = user.rows[0];
});

//doctor validations
const docType = check('typeofdoc')
    .isLength({min:1, max:100})
    .withMessage('Provide the specialty ex. Family Doctor, Neurosurgeon, Dentist, etc');

const phoneNumber = check('phonenumber')
    .isLength({min:1, max:100})
    .withMessage('Provide the phone number');

const location = check('location')
    .isLength({min:1, max:100})
    .withMessage('Provide the address');

//medicine validations
const medicineName = check('name')
    .isLength({min:1, max:100})
    .withMessage('Provide the medicine name');

const func = check('func')
    .isLength({min:1, max:100})
    .withMessage('Provide the medicine function ex. painkiller, lowers blood pressure, etc');

const frequency = check('frequency')
    .isLength({min:1, max:100})
    .withMessage('Provide the dosage frequency ex. once a day, twice a day, as needed, etc');

const prescription = check('prescription')
    .isBoolean()
    .withMessage('Provide whether the medication was prescribed');

const doctorAndPrescriber = (req, res, next) => {
    const prescriptionValue = req.body.prescription;
    const doctorId = req.body.doctorId;

    if (prescriptionValue === true && !doctorId) {
        return check('otherPrescriber')
            .isLength({ min: 1, max: 100 })
            .withMessage('Select a prescriber or choose other')(req, res, next);
    } else {
        next();
    }
};

//appointment validations

const title = check('title')
    .isLength({min:1, max:100})
    .withMessage('Provide the appointment title')

const date = check('date')
    .isLength({min:1, max:100})
    .withMessage('Provide the appointment date');

const time = check('time')
    .isLength({min:1, max:100})
    .withMessage('Provide the appointment time');

const doctorOrProfessional = (req, res, next) => {
    const doctorId = req.body.doctorId;

    if(!doctorId) {
        return check('otherProfessional')
            .isLength({min: 1, max:100})
            .withMessage('Select your professionals or choose other')(req, res, next);
    } else {
        next();
    }
}






    module.exports = {
        registerValidation: [email, password, confirmPassword, emailExists, firstname, lastname],
        loginValidation: [loginFieldsCheck],
        doctorValidation: [firstname, lastname, docType, phoneNumber, location],
        medicineValidation: [medicineName, func, frequency, prescription, doctorAndPrescriber],
        appointmentValidation: [title, date, time, doctorOrProfessional]
    };

