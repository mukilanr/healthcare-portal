# 🏥 Healthcare Patient Portal

A secure and scalable MERN-based healthcare patient portal that enables patients to manage health records and healthcare providers to administer care. Built with an Agile process over two sprints and deployed to AWS.

---

## Tech Stack

- **Frontend:** React.js + Material UI + Redux.js + Axios
- **Backend:** Node.js + Express.js + GraphQL
- **Database:** MongoDB (Atlas)
- **Authentication:** JWT-based Auth (with role-based access control)
- **Deployment:** AWS (EC2, S3, Route 53, MongoDB Atlas)
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

### 🏗️ Sprint 0 – Planning & Architecture

- ✅ Requirements & features defined
- ✅ Tech stack finalized
- ✅ High-level architecture & folder structure
- ✅ Initial README documentation
- ⬜ MongoDB schema definitions
- ⬜ API contract (OpenAPI/Swagger)
- ⬜ GitHub repo and CI/CD setup

### Sprint 1 – Core Features

- [ ] Auth system (JWT, role-based)
- [ ] Patient dashboard (appointments, tips)
- [ ] Profile management (CRUD)
- [ ] Doctor dashboard (view-only)

### Sprint 2 – Enhancements & Deployment

- [ ] Public health info page
- [ ] Appointment request system
- [ ] Logging middleware
- [ ] Deploy backend/frontend to AWS
- [ ] CI/CD integration

---

## System Design

### Backend API Routes

```
/auth
  - POST /register
  - POST /login

/patient
  - GET /dashboard
  - GET /profile
  - PUT /profile
  - POST /appointments

/provider
  - GET /patients
  - GET /patients/:id

/public
  - GET /health-info
```

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

## ☁️ AWS Infrastructure Plan

- **EC2:** Host Node.js backend
- **S3:** Optional, for static file hosting
- **MongoDB Atlas:** Cloud NoSQL database
- **GitHub Actions:** CI/CD for deployment

---

## 🧪 Local Development

```bash
# Clone
git clone https://github.com/mukilanr/healthcare-portal
cd patient-portal

# Start frontend
cd frontend
npm install
npm start

# Start backend
cd backend
npm install
npm run dev
```
