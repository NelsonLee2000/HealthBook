CREATE DATABASE healthbook;

CREATE TABLE "user"(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(50),
    password VARCHAR(255),
    firstname TEXT,
    lastname TEXT,
    UNIQUE (email)
);

CREATE TABLE doctor(
    doctor_id SERIAL PRIMARY KEY,
    firstname TEXT,
    lastname TEXT,
    typeofdoc TEXT,
    phonenumber VARCHAR(50),
    location VARCHAR(255),
    notes VARCHAR(255),
    user_id INT,
        CONSTRAINT fk_user_doctor
        FOREIGN KEY (user_id)
        REFERENCES "user"(user_id)
        ON DELETE CASCADE
);

CREATE TABLE appointment(
    appointment_id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    date DATE,
    time TIME,
    prenotes VARCHAR(255),
    postnotes VARCHAR(255),
    doctor_id INT,
        CONSTRAINT fk_doctor_appointment
        FOREIGN KEY (doctor_id)
        REFERENCES doctor(doctor_id),
    user_id INT,
        CONSTRAINT fk_user_appointment
        FOREIGN KEY (user_id)
        REFERENCES "user"(user_id)
        ON DELETE CASCADE
);

CREATE TABLE medicine(
    medicine_id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    function VARCHAR(255),
    frequency VARCHAR(50),
    doctor_id INT, 
        CONSTRAINT fk_doctor_medicine
        FOREIGN KEY (doctor_id)
        REFERENCES doctor(doctor_id),
    user_id INT,
        CONSTRAINT fk_user_medicine
        FOREIGN KEY (user_id)
        REFERENCES "user"(user_id)
        ON DELETE CASCADE
    other_prescriber VARCHAR(255),
    prescription BOOLEAN
);

/*ran everything above at DEC 6 */

/*adding sample data into doctor*/
INSERT INTO doctor(
    firstname, lastname, typeofdoc, phonenumber, location, notes, user_id
    ) VALUES (
        'Francis', 'Cheng', 'Optometrist', '6048210202', 'Aberdeen Square', 'lasik pre and post-op Optometrist', 8
    );

INSERT INTO doctor(
    firstname, lastname, typeofdoc, phonenumber, location, notes, user_id
    ) VALUES (
        'Daphne', 'Cheng', 'Optometrist', '6048210202', 'Aberdeen Square', 'lasik pre and post-op Optometrist', 8
    );

DELETE FROM doctor WHERE doctor_id = 3;

INSERT into medicine(name, function, frequency, doctor_id, user_id) VALUES('blood pressure medication', 'lowers blood pressure', 'once a day', 5, 8);

ALTER TABLE medicine ADD COLUMN other_prescriber VARCHAR(255), ADD COLUMN prescription BOOLEAN;
