# Healthcare Patient Portal

A secure and scalable MERN-based healthcare patient portal that enables patients to manage health records and healthcare providers to administer care. Built with an Agile process over two sprints and deployed to AWS and Vercel.

---

## Tech Stack

- **Frontend:** React.js + Material UI (React Router, Axios, Dayjs)
- **Backend:** Node.js + Express.js (bcrypt, dotenv, jsonwebtoken, moongoose, jest, nodemon)
- **Database:** MongoDB (Atlas)
- **Authentication:** JWT-based Auth (with role-based access control)
- **Deployment:** Server - AWS (EC2) and Client - Vercel
- **DevOps:** GitHub Actions (CI/CD)
- **Security:** HTTPS, JWT, basic data encryption at rest (MongoDB)

---

## Key Features to Implement

### 1. Secure Authentication System

- Login and registration for patients and providers
- JWT-based session management with expiration
- Password hashing using bcrypt
- Consent checkbox for data usage during registration

### 2. Personalized Patient Dashboard

- Upcoming appointments
- Health tip of the day based on patient age group

### 3. Profile Management

- View and edit profile
- Fields: age, allergies, current medications

### 4. Healthcare Doctor Dashboard

- View list of patients (mock data)
- View-only patient profile

### 5. Public Health Information Page

- Static content including health info and privacy policy

### 6. Appointment Booking System

- Patients can request appointments (stored in DB)

### 7. Privacy & Security

- Logging user actions (e.g., profile access)
- Basic HTTPS and JWT security

---

## Deliverables

1. Functional authentication system for patients and providers
2. Personalized patient dashboard with basic health information
3. Profile management for patients
4. Simple healthcare provider view
5. Public health information page
6. Basic appointment request feature
7. Deployed frontend and backend applications on AWS
8. CI/CD pipeline with basic tests via GitHub Actions

---

## Agile Sprint Plan

### Sprint 0 – Planning & Architecture

- ✅ Requirements & features defined
- ✅ Tech stack finalized
- ✅ High-level architecture & folder structure
- ✅ Initial README documentation
- ✅ MongoDB schema definitions
- ⬜ API contract (OpenAPI/Swagger)
- ✅ GitHub repo and CI/CD setup

### Sprint 1 – Core Features

- ✅ Auth system (JWT, role-based)
- ✅ Patient dashboard (appointments, tips)
- ✅ Profile management (CRUD)
- ✅ Backend Unit Test cases
- ✅ Doctor dashboard (view-only)

### Sprint 2 – Enhancements & Deployment

- ⬜ Public health info page
- ✅ Appointment request system
- ⬜ Logging middleware
- ✅ Deploy backend to AWS/frontend to Vercel
- ✅ CI/CD integration

---

## System Design

### Backend API Routes

#### Auth Routes (`/auth`)
- `POST /auth/register` — Register a new user (patient or provider)
- `POST /auth/login` — Login and receive JWT token

#### Appointment Routes (`/appointments`)
- `POST /appointments/book` — Book a new appointment (authenticated)
- `GET /appointments/my` — Get patient's own appointments (authenticated)
- `GET /appointments/all` — Get all appointments (provider only)

#### User Routes (`/users`)
- `GET /users/me` — Get current user's profile (authenticated)
- `PUT /users/me` — Update current user's profile (authenticated)
- `GET /users/all` — Get all users (provider only)
- `GET /users/providers` — Get all providers (public)

---

### MongoDB Schemas

#### User

```js
{
  _id,
  name,
  email,
  passwordHash,
  role: ['patient', 'provider'],
  consentGiven: Boolean,
  createdAt
}
```

#### PatientProfile

```js
{
  userId: ObjectId,
  age: Number,
  allergies: [String],
  currentMedications: [String]
}
```

#### AppointmentRequest

```js
{
  patientId: ObjectId,
  requestedDate: Date,
  reason: String,
  createdAt: Date
}
```

#### ActionLog

```js
{
  userId: ObjectId,
  action: String,
  timestamp: Date,
  metadata: Object
}
```

---

## AWS Infrastructure Plan

- **EC2:** Host Node.js backend
- **S3:** Optional, for static file hosting
- **MongoDB Atlas:** Cloud NoSQL database
- **GitHub Actions:** CI/CD for deployment

---

## Local Development

```bash
# Clone
git clone https://github.com/mukilanr/healthcare-portal
cd healthcare-portal

# Start frontend
cd client
npm install
npm start

# Start backend
cd server
npm install
npm run dev
```
