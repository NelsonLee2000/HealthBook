const db = require('../db');
const { hash } = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');
const { SECRET } = require('../constants');
const multer = require('multer');

exports.getUser = async  (req, res) => {
    const token = req.cookies.token;
    try {
        const decoded = verifyToken(token);
        const userId = decoded.id;
        const {rows} = await db.query('SELECT * FROM \"user\" WHERE user_id = $1', 
        [userId]);
        res.json(rows);
    } catch (err) {
        res.status(401).json({error: err.message});
    }
};

exports.register = async (req, res) => {
    const {email, password, firstname, lastname} = req.body;
    try {
        const hashedPassword = await hash(password, 10);
        
        await db.query('INSERT INTO \"user\"(email, password, firstname, lastname) VALUES ($1, $2, $3, $4)',
        [email, hashedPassword, firstname, lastname]);

        return res.status(201).json({
            success: true,
            message: "The registration was successful"
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            error: err.message,
        })
    }
};

exports.login = async (req, res) => {
    let user = req.user;
    let payload = {
        id: user.user_id,
        email: user.email
    };
    try {
        const token = await sign(payload, SECRET);

        return res.status(200).cookie('token', token, {httpOnly: true}).json({
            success: true,
            message: 'Logged in successfully',
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            error: err.message,
        });
    }
};

exports.protected = async (req, res) => {
    try {
        res.status(200).json({
            info: 'protected info'
        });
    } catch (err) {
        console.error(err.message);
    };
}

exports.logout = async (req, res) => {
    try {
        return res.status(200).clearCookie('token', {httpOnly: true}).json({
            success: true,
            message: 'Logged out successfully',
        }); 
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            error: err.message
        });
    }
};

const verifyToken = (token) => {
    try {
        return verify(token, SECRET);
    } catch (err) {
        console.error(err.message);
        throw new Error('Unauthorized');
    }
}


exports.getDoctors = async (req, res) => {
    const token = req.cookies.token;
    try {
        const decoded = verifyToken(token);
        const userId = decoded.id;
        const { rows } = await db.query('SELECT * FROM doctor WHERE user_id = $1', 
        [userId]);
        res.json(rows);
    } catch (err) {
        res.status(401).json({error: err.message});
    }
};

exports.newDoctor = async (req, res) => {
    const token = req.cookies.token;
    const {firstname, lastname, typeofdoc, phonenumber, location, notes} = req.body;
    try {
        const decoded = verifyToken(token);
        const userId = decoded.id;
        await db.query('INSERT INTO doctor(firstname, lastname, typeofdoc, phonenumber, location, notes, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
        [firstname, lastname, typeofdoc, phonenumber, location, notes, userId]);

        return res.status(201).json({
            success: true,
            message: "Professional added successfully"
        });
    } catch (err) {
        res.status(401).json({error: err.message});
    }
};

exports.editDoctor = async (req, res) => {
    const token = req.cookies.token;
    const {firstname, lastname, typeofdoc, phonenumber, location, notes} = req.body;
    try {  
        const decoded = verifyToken(token);
        const userId = decoded.id;
        const doctorId = req.params.id;
        await db.query('UPDATE doctor SET firstname = $1, lastname = $2, typeofdoc = $3, phonenumber = $4, location = $5, notes = $6 WHERE doctor_id = $7 AND user_id = $8', 
        [firstname, lastname, typeofdoc, phonenumber, location, notes, doctorId, userId]);

        return res.status(200).json({
            success: true,
            message: "Professional editted successfully"
        });
    } catch (err) {
        console.log('Error Editting Professional');
        res.status(500).json({error: err.message});
    }
};

exports.deleteDoctor = async (req, res) => {
    const token = req.cookies.token;
    try {
        const decoded = verifyToken(token);
        const userId = decoded.id;
        const doctorId = req.params.id;
        await db.query('DELETE FROM doctor WHERE doctor_id = $1 AND user_id = $2', 
        [doctorId, userId]);
        
        return res.status(200).json({
            success: true,
            message: "Professional deleted successfully"
        });
    } catch (err) {
        console.log('Error Deleting Professional');
        res.status(500).json({error: err.message});
    }
};

exports.getMedicine = async (req, res) => {
    const token = req.cookies.token;
    try {
        const decoded = verifyToken(token);
        const userId = decoded.id;
        const { rows } = await db.query('SELECT m.medicine_id, m.name, m.function, m.frequency, m.doctor_id, m.user_id, m.other_prescriber, m.prescription, d.firstname, d.lastname, d.typeofdoc, d.phonenumber, d.location, d.notes FROM medicine AS m LEFT JOIN doctor AS d ON m.doctor_id = d.doctor_id WHERE m.user_id = $1', 
        [userId])
        res.json(rows)
    } catch (err) {
        res.status(401).json({error: err.message});
    }
}

exports.newMedicine = async (req, res) => {
    const token = req.cookies.token;
    const {name, func, frequency, prescription, doctorId, otherPrescriber} = req.body;
    try {
        const decoded = verifyToken(token);
        const userId = decoded.id;

        await db.query('INSERT INTO medicine(name, function, frequency, doctor_id, user_id, other_prescriber, prescription) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
        [name, func, frequency, doctorId, userId, otherPrescriber, prescription]);

        return res.status(201).json({
            success: true,
            message: "Medicine added successfully"
        });

    } catch (err) {
        res.status(401).json({error: err.message});
    }
};

exports.editMedicine = async (req, res) => {
    const token = req.cookies.token;
    const {name, func, frequency, prescription, doctorId, otherPrescriber} = req.body;
    try {
        const decoded = verifyToken(token);
        const userId = decoded.id;
        const medicineId = req.params.id;
        await db.query('UPDATE medicine SET name = $1, function = $2, frequency = $3, prescription = $4, doctor_id = $5, other_prescriber = $6 WHERE medicine_id = $7 AND user_id = $8', 
        [name, func, frequency, prescription, doctorId, otherPrescriber, medicineId, userId]);

        return res.status(200).json({
            success: true,
            message: "Medicine editted successfully"
        });
    } catch (err) {
        console.log('Error Editting Medicine');
        res.status(500).json({error: err.message});
    }
}

exports.deleteMedicine = async (req, res) => {
    const token = req.cookies.token;
    try {
        const decoded = verifyToken(token);
        const userId = decoded.id;
        const medicineId = req.params.id;
        await db.query('DELETE FROM medicine WHERE medicine_id = $1 AND user_id = $2', 
        [medicineId, userId]);

        return res.status(200).json({
            success: true,
            message: "Medicine deleted successfully"
        });
    } catch (err) {
        console.log('Error Deleting Medicine');
        res.status(500).json({error: err.message});
    }
}

exports.getAppointments = async (req, res) => {
    const token = req.cookies.token;
    try {
        const decoded = verifyToken(token);
        const userId = decoded.id;
        const { rows } = await db.query(
            'SELECT a.appointment_id, a.title, a.date, a.time, a.prenotes, a.postnotes, a.doctor_id, a.other_professional, a.user_id, d.firstname, d.lastname, d.typeofdoc, d.phonenumber, d.location, d.notes FROM appointment AS a LEFT JOIN doctor AS d ON a.doctor_id = d.doctor_id WHERE a.user_id = $1', 
            [userId]
        ); 
        res.json(rows)
    } catch (err) {
        res.status(401).json({error: err.message});
    }
};

exports.newAppointment = async (req, res) => {
    const token = req.cookies.token;
    const {title, date, time, prenotes, postnotes, doctorId, otherProfessional} = req.body;
    try {
        const decoded = verifyToken(token);
        const userId = decoded.id;
        await db.query('INSERT INTO appointment(title, date, time, prenotes, postnotes, doctor_id, user_id, other_professional) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', 
        [title, date, time, prenotes, postnotes, doctorId, userId, otherProfessional]);

        return res.status(201).json({
            success: true,
            message: "Appointment added successfully"
        });

    } catch (err) {
        res.status(401).json({error: err.message});
    }
};


exports.editAppointment = async (req, res) => {
    const token = req.cookies.token;
    const {title, date, time, prenotes, postnotes, doctorId, otherProfessional} = req.body;
    const appointmentId = req.params.id;
    try {
        const decoded = verifyToken(token);
        const userId = decoded.id;
        await db.query('UPDATE appointment SET title = $1, date = $2, time = $3, prenotes = $4, postnotes = $5, doctor_id = $6, other_professional = $7 WHERE user_id = $8 AND appointment_id = $9', 
        [title, date, time, prenotes, postnotes, doctorId, otherProfessional, userId, appointmentId]);

        return res.status(200).json({
            success: true,
            message: "Appointment editted successfully"
        });

    } catch (err) {
        console.log('Error Editting Appointment');
        res.status(500).json({error: err.message});
    }
};

exports.deleteAppointment = async (req, res) => {
    const token = req.cookies.token;
    try {
        const decoded = verifyToken(token);
        const userId = decoded.id;
        const appointmentid = req.params.id;
        await db.query('DELETE FROM appointment WHERE user_id = $1 AND appointment_id = $2', 
        [userId, appointmentid])

        return res.status(200).json({
            success: true,
            message: "Appointment deleted successfully"
        });
        
    } catch (err) {
        console.log('Error Deleting Medicine');
        res.status(500).json({error: err.message});
    }
}

// exports.newImage = async (req, res) => {
//     console.log("req.body", req.body);
//     console.log("req.file", req.file);
//     res.send({});
// }