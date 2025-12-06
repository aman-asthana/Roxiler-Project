<p align="center">
  <strong style="font-size: 32px;">⭐ Store Rating System</strong>
</p>


<p align="center">
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node" />
  <img src="https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/PostgreSQL-15-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-api-endpoints">API</a> •
  <a href="#-screenshots">Screenshots</a>
</p>

---

## 🎯 About The Project

A **modern full-stack web application** that enables users to submit ratings for stores listed on the platform. The system supports **three distinct user roles** with specific functionalities:

| Role | Description |
|------|-------------|
| 🔴 **System Admin** | Manages users, stores, and views platform analytics |
| 🟢 **Normal User** | Browses stores, submits/modifies ratings |
| 🟡 **Store Owner** | Views store analytics and user feedback |

---

## ✨ Features

### 🔴 System Administrator
- 📊 **Dashboard** with total users, stores, and ratings count
- 👥 Add new users (Normal Users / Store Owners / Admins)
- 🏪 Add new stores and assign owners
- 🔍 **Filter** users by Name, Email, Address, Role
- ↕️ **Sort** users by any column (ascending/descending)
- 📋 View detailed user information
- ⭐ View Store Owner's rating when checking user details
- 🏬 View all stores with filtering and sorting capabilities

### 🟢 Normal User
- 📝 **Sign Up** with validated form fields
- 🔐 Secure **Login/Logout** functionality
- 🏪 Browse all stores with **search by Name/Address**
- ⭐ Submit ratings (1-5 stars) for any store
- ✏️ Modify previously submitted ratings
- 👁️ View own rating displayed on store cards
- 🔑 **Update password** with validation

### 🟡 Store Owner
- 📊 **Dashboard** showing average store rating
- 👥 View list of users who rated the store
- ⭐ See individual ratings from each user
- 🔑 Update password functionality

---

## 🛠 Tech Stack

<table>
<tr>
<td align="center" width="50%">

### Frontend
![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/-Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/-React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/-Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)

</td>
<td align="center" width="50%">

### Backend
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/-Express-000000?style=flat-square&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/-JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![Bcrypt](https://img.shields.io/badge/-Bcrypt-003A70?style=flat-square&logo=letsencrypt&logoColor=white)

</td>
</tr>
</table>

---

## 📁 Project Structure

```
📦 Roxiler-Project
│
├── 📂 Client/                     → React Frontend (Vite + Tailwind CSS)
│   └── 📂 src/
│       ├── 📂 api/                → Axios API services for auth, admin, stores, ratings
│       ├── 📂 components/         → Reusable UI components (Navbar, StoreCard)
│       ├── 📂 context/            → React Context for global auth state management
│       ├── 📂 pages/              → All page components organized by role
│       │   ├── 📂 admin/          → Admin dashboard, user/store management pages
│       │   ├── 📂 owner/          → Store owner dashboard with analytics
│       │   └── 📂 user/           → User store browsing and password update
│       └── 📂 router/             → Protected route wrapper for auth guarding
│
├── 📂 Server/                     → Node.js + Express Backend
│   └── 📂 src/
│       ├── 📂 controllers/        → Business logic for all API endpoints
│       ├── 📂 routes/             → Express route definitions with middleware
│       ├── 📂 middlewares/        → JWT auth verification & role-based access control
│       └── 📂 database/           → PostgreSQL connection configuration
│
└── README.md
```

---

## 🚀 Installation

### Prerequisites

- **Node.js** v18+ 
- **PostgreSQL** v15+
- **npm** or **yarn**

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/aman-asthana/Roxiler-Project.git
cd Roxiler-Project
```

### 2️⃣ Database Setup

Create a PostgreSQL database and run the following SQL:

```sql
-- Create Database
CREATE DATABASE rating_system_roxiler;

-- Connect to database and create tables
\c rating_system_roxiler;

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(400),
    role VARCHAR(20) DEFAULT 'USER' CHECK (role IN ('ADMIN', 'USER', 'OWNER')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stores Table
CREATE TABLE stores (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    address VARCHAR(400),
    owner_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ratings Table
CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    store_id INTEGER REFERENCES stores(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    rating_value INTEGER CHECK (rating_value >= 1 AND rating_value <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(store_id, user_id)
);

-- Create an Admin user (password: Admin@123)
INSERT INTO users (name, email, password, address, role) 
VALUES ('System Administrator User', 'admin@example.com', '$2b$10$...hashed_password...', 'Admin Office Address', 'ADMIN');
```

### 3️⃣ Backend Setup

```bash
cd Server
npm install
```

Create `Server/.env`:
```env
PORT=3000
CLIENT_URL=http://localhost:5173
SECRET_KEY=your_super_secret_jwt_key
DATABASE_URL=postgres://username:password@localhost:5432/rating_system_roxiler
```

Start the server:
```bash
npm start
```

### 4️⃣ Frontend Setup

```bash
cd Client
npm install
```

Create `Client/.env`:
```env
VITE_URL=http://localhost:3000
```

Start the development server:
```bash
npm run dev
```

### 5️⃣ Open the Application

🌐 Visit: **http://localhost:5173**

---

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/signup` | Register new user |
| `POST` | `/auth/login` | User login |

### 👤 Admin Routes (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/admin/dashboard` | Get dashboard stats |
| `POST` | `/admin/add-user` | Add new user |
| `POST` | `/admin/add-store` | Add new store |
| `GET` | `/admin/users` | Get all users (with filters) |
| `GET` | `/admin/users/:id` | Get user details |

### 🏪 Store Routes (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/stores` | Get all stores |
| `GET` | `/stores?name=abc&address=xyz` | Filter stores |

### ⭐ Rating Routes (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/ratings/:storeId` | Submit rating (1-5) |
| `PUT` | `/ratings/:storeId` | Update rating |

### 🏠 Owner Routes (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/owner/dashboard` | Get owner dashboard |

### 🔑 User Routes (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `PUT` | `/users/update-password` | Update password |

---

## ✅ Validation Rules

### 📝 Registration Form

| Field | Validation |
|-------|------------|
| **Name** | 20 - 60 characters |
| **Email** | Valid email format |
| **Address** | Maximum 400 characters |
| **Password** | 8-16 characters, at least 1 uppercase letter, 1 special character (!@#$%^&*) |

### ⭐ Rating

| Rule | Description |
|------|-------------|
| Value | Integer between 1-5 |
| Unique | One rating per user per store |
| Editable | Users can modify their ratings |

---


## 🖼️ Screenshots

<details>
<summary>📸 Click to view screenshots</summary>

### Login Page
> Modern login form with validation

### Admin Dashboard
> Dashboard showing total users, stores, and ratings

### User Store List
> Beautiful card layout with search and rating functionality

### Rating Modal
> Interactive star rating with animations

### Owner Dashboard
> Store analytics and user ratings list

</details>

---

## 🛠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| **400 on rating** | Ensure `rating_value` is 1-5 (not empty/0) |
| **401 Unauthorized** | Check if JWT token is valid and included in headers |
| **CORS Error** | Verify `CLIENT_URL` in server `.env` matches frontend URL |
| **Database Connection** | Check `DATABASE_URL` format and PostgreSQL is running |
| **Env Variables** | Frontend uses `VITE_` prefix (e.g., `VITE_URL`) |

---

## 👨‍💻 Author

**Aman Asthana**

[![GitHub](https://img.shields.io/badge/GitHub-aman--asthana-181717?style=for-the-badge&logo=github)](https://github.com/aman-asthana)


