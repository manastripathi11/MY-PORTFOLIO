# 🚀 Manas Tripathi — Developer Portfolio

A modern, full-stack personal portfolio website built with the **MERN stack**. Features a clean dark theme, smooth animations, dynamic content management via an admin dashboard, and a working contact form with email notifications.

---

## ✨ Features

- 🎨 Dark-themed, responsive UI with smooth Framer Motion animations
- 📂 Dynamic **Projects** & **Experience** sections powered by MongoDB
- 📬 **Contact Form** with email notifications via Nodemailer
- 🔐 **Admin Dashboard** — add, edit, and delete projects/experiences
- 🛡️ JWT-based admin authentication (protected routes)
- 📄 Resume modal with PDF preview and download

---

## 🗂️ Project Structure

```
MY PORTFOLIO/
├── frontend/          # React + Vite frontend
│   ├── src/
│   │   ├── admin/     # Admin dashboard pages
│   │   ├── sections/  # Hero, Skills, Projects, Experience, Contact
│   │   ├── api/       # Axios instance
│   │   └── context/   # Auth context
│   └── vite.config.js
│
└── backend/           # Node.js + Express API
    ├── controllers/
    ├── models/        # Mongoose schemas
    ├── routes/
    ├── middleware/
    └── server.js
```

---

## 🛠️ Tech Stack

| Layer     | Technologies                                      |
|-----------|---------------------------------------------------|
| Frontend  | React 19, Vite, Framer Motion, React Router DOM   |
| Backend   | Node.js, Express 5, Mongoose                      |
| Database  | MongoDB Atlas                                     |
| Auth      | JWT (jsonwebtoken), bcryptjs                      |
| Email     | Resend API (Gmail)                                |
| Deploy    | Vercel (frontend) · Render (backend)              |

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Gmail account with App Password enabled

### 1. Clone the repo
```bash
git clone https://github.com/manastripathi11/MY-PORTFOLIO.git
cd MY-PORTFOLIO
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_gmail@gmail.com
RESEND_API_KEY=your_api_key
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

```bash
npm run dev   # Starts on http://localhost:5000
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev   # Starts on http://localhost:5173
```

---

## 🔐 Admin Dashboard

Access the hidden admin panel to manage your portfolio content:

```
URL:      http://localhost:5173/admin/login
Password: (set in backend .env → ADMIN_PASSWORD)
```

**Admin features:**
- `/admin/dashboard` — Overview
- `/admin/projects` — Add / Edit / Delete projects
- `/admin/experiences` — Manage work experience
- `/admin/messages` — View contact form messages

---

## 📬 Contact

**Manas Tripathi** — [manastripathi22@gmail.com](mailto:manastripathi22@gmail.com)
