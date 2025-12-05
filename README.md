# ⭐ Rating System — Role‑Based Store Rating Platform

Modern full‑stack app where Users rate stores, Owners see analytics, and Admins manage it all. Built with React + Vite + Tailwind on the frontend and Node.js + Express + PostgreSQL on the backend.

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?logo=node.js" alt="Node" />
  <img src="https://img.shields.io/badge/Database-PostgreSQL-336791?logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Auth-JWT-000000" alt="JWT" />
</p>

---

## 🔎 Overview

- Role-based access (Admin, Owner, User)
- Users submit/update 1–5 star ratings; averages refresh instantly
- Owners get store analytics and rater breakdowns
- Admins manage users, stores, and assignments

---

## 🧭 Table of Contents

1. Project Structure
2. Features by Role
3. Tech Stack
4. Architecture
5. Environment Setup
6. Quick Start (Windows)
7. API Summary
8. Validation Rules
9. Troubleshooting
10. Screenshots
11. Contributing & License

---

## 📂 Project Structure

```text
Roxiler-Project/
├─ Client/                          → React (Vite + Tailwind)
│  ├─ .env
│  ├─ vite.config.js
│  └─ src/
│     ├─ App.jsx
│     ├─ main.jsx
│     ├─ index.css
│     ├─ api/
│     │  ├─ axios.js               → uses import.meta.env.VITE_URL
│     │  ├─ auth.js, admin.js, ...
│     ├─ components/               → Navbar, StoreCard, ...
│     ├─ context/                  → AuthContext.jsx
│     ├─ pages/
│     │  ├─ admin/                 → AddStore, UsersList, ...
│     │  ├─ owner/                 → Dashboard.jsx
│     │  └─ user/                  → StoreList.jsx, updatePassword.jsx
│     └─ router/                   → ProtectedRoute.jsx
├─ Server/                          → Express + PostgreSQL
│  ├─ .env
│  ├─ server.js
│  └─ src/
│     ├─ app.js
│     ├─ database/                 → connection.js
│     ├─ middlewares/              → auth-middleware, role-middleware
│     ├─ controllers/              → auth, admin, owner, ratings, stores, users
│     └─ routes/                   → auth, admin, owner, rating, stores, users
└─ README.md
```

---

## 🎯 Features by Role

**Admin**
- Dashboard totals (Users, Stores, Ratings)
- Add stores, assign owners, manage users
- Filter/sort lists; pagination

**Store Owner**
- View owned stores with average ratings
- See who rated and individual scores

**User**
- Browse/search stores in a card layout
- Submit or update rating (1–5)

---

## 🧱 Tech Stack

- Frontend: React (Vite), Tailwind CSS, React Router, Context API, Axios
- Backend: Node.js, Express, PostgreSQL, JWT, Bcrypt, CORS

---

## 🏗 Architecture

```
Client (React + Tailwind)
	│  Axios
	▼
API (Node + Express)
	│  SQL (pg)
	▼
DB (PostgreSQL)
```

Clean controller → route → middleware flow; role-based authorization.

---

## 🔐 Environment Setup

Backend `Server/.env`:
```
PORT=3000
CLIENT_URL=http://localhost:5173
JWT_SECRET=Roxiler
DATABASE_URL=postgres://user:password@localhost:5432/rating_system_roxiler
```

Frontend `Client/.env`:
```
VITE_URL=http://localhost:3000
```

---

## ⚡ Quick Start (Windows cmd)

Backend:
```
cd Server
npm install
npm start
```

Frontend:
```
cd Client
npm install
npm run dev
```

Open: http://localhost:5173

---

## 📘 API Summary

Auth
- POST `/auth/signup`
- POST `/auth/login`

Admin
- GET  `/admin/dashboard`
- POST `/admin/add-store`
- GET  `/admin/stores`

Owner
- GET `/owner/dashboard`

Stores
- GET `/stores`
- GET `/stores?name=abc&address=xyz`

Ratings
- POST `/ratings/:storeId`   (body: `{ rating_value: 1-5 }`)
- PUT  `/ratings/:storeId`   (body: `{ rating_value: 1-5 }`)

---

## ✅ Validation Rules

Registration
- Name: 20–60 chars
- Address: ≤ 400 chars
- Password: 8–16 chars, include uppercase + special char

Ratings
- Integer 1–5, one rating per user per store, editable

---

## 🛠 Troubleshooting

- 400 on rating: ensure a valid 1–5 `rating_value` is sent (not empty/0)
- Auth: include `Authorization: Bearer <token>` header (Axios interceptor handles this)
- Base URL: `Client/src/api/axios.js` uses `import.meta.env.VITE_URL`; set it to `http://localhost:3000`

---

