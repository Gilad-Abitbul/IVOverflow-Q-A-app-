# Q&A Web Application (MERN Stack)

This is a full-stack Q&A (Questions and Answers) web application built using the **MERN** stack:
- **MongoDB** for database
- **Express.js** as backend framework
- **React** for frontend interface
- **Node.js** as runtime environment

Users can register, log in, post questions, answer others, and interact within a simple and intuitive UI.

---

## Features

- User authentication with JWT
- Ask and answer questions
- Client-side and server-side validation using **Zod**
- Protected routes
- Modular folder structure

---

## 📁 Project Structure
```bash
root/
├── client/ # React frontend
├── server/ # Express backend
└── README.md
```

## Installation Guide

### 1. Clone the repository

```bash
git clone https://github.com/Gilad-Abitbul/IVOverflow-Q-A-app-.git
```

### 2. Install dependencies
Backend (server)
```bash
cd server
npm install
```
Frontend (client)
```bash
cd client
npm install
```

### 3. Environment Variables

You need to create .env files in both the server and client directories.

.env file for the server:
Create a file at: server/.env
```bash
JWT_SECRET=your_jwt_secret_key_here
MONGO_URI=your_mongodb_connection_string_here
```
JWT_SECRET: A secret string used to sign and verify JWT tokens.
MONGO_URI: Your MongoDB connection string (e.g., from MongoDB Atlas).

.env file for the client:
Create a file at: client/.env
```bash
VITE_BASE_URL=http://localhost:8080/api
```
This should point to your backend API base URL.

## Running the App
### 1. Start the backend server
```bash
cd server
npm run dev
```

### 2. Start the frontend client
```bash
cd client
npm run dev
```
