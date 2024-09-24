// CREATE TABLE users (
//     user_id SERIAL PRIMARY KEY,
//     name VARCHAR(50) UNIQUE NOT NULL,
//     email VARCHAR(100) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'doctor', 'patient')) DEFAULT 'patient',
//     gender VARCHAR(10),
//     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//     profile_image VARCHAR(100),
//     isActive BOOLEAN DEFAULT TRUE,
//     start_time TIMESTAMP WITH TIME ZONE NOT NULL,
//     end_time TIMESTAMP WITH TIME ZONE NOT NULL
// );

// CREATE TABLE appointments (
//     appointment_id SERIAL PRIMARY KEY,
//     patient_id INTEGER REFERENCES users(user_id),
//     doctor_id INTEGER REFERENCES users(user_id),
//     appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
//     status VARCHAR(20) CHECK (status IN ('scheduled', 'completed', 'cancelled')),
//     notes TEXT
// );


// -- Medical Records table
// CREATE TABLE medical_records (
//     record_id SERIAL PRIMARY KEY,
//     patient_id INTEGER REFERENCES users(user_id),
//     doctor_id INTEGER REFERENCES users(user_id),
//     date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//     diagnosis TEXT,
//     treatment TEXT,
//     prescription TEXT
// );

// -- Billing table
// CREATE TABLE billing (
//     bill_id SERIAL PRIMARY KEY,
//     patient_id INTEGER REFERENCES users(user_id),
//     appointment_id INTEGER REFERENCES appointments(appointment_id),
//     amount DECIMAL(10, 2) NOT NULL,
//     status VARCHAR(20) CHECK (status IN ('pending', 'paid', 'overdue')),
//     payment_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
// );

// -- Feedback table
// CREATE TABLE feedback (
//     feedback_id SERIAL PRIMARY KEY,
//     patient_id INTEGER REFERENCES users(user_id),
//     rating INTEGER CHECK (rating BETWEEN 1 AND 5),
//     comment TEXT,
//     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
// );







// CREATE TABLE appointments (
//     appointment_id SERIAL PRIMARY KEY,
//     doctor_id INTEGER REFERENCES users(user_id),
//     appointment_start TIMESTAMP WITH TIME ZONE NOT NULL,
//     appointment_end TIMESTAMP WITH TIME ZONE NOT NULL,
//     booking_status BOOLEAN NOT NULL DEFAULT true,
//     status VARCHAR(20) CHECK (status IN ('completed', 'canceled')),
//     notes TEXT
// );



// CREATE TABLE staff_schedules (
//     schedule_id SERIAL PRIMARY KEY,
//     doctor_id INTEGER REFERENCES users(user_id),
//     start_time TIMESTAMP WITH TIME ZONE NOT NULL,
//     end_time TIMESTAMP WITH TIME ZONE NOT NULL,
//     is_available BOOLEAN DEFAULT true,
//     is_payed BOOLEAN DEFAULT false
// );