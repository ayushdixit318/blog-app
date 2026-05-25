# CRUD Blog Application

A production-minded MERN blog platform with secure authentication, blog CRUD, image uploads, comments, likes, protected author workflows, validation, and deployment-ready environment configuration.

## Stack

- Frontend: React, Vite, Tailwind CSS, React Router DOM, Redux Toolkit, Axios, lucide-react
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, cookie-parser, multer

## Quick Start

1. Install dependencies:

   ```bash
   npm.cmd run install:all
   ```

2. Create environment files:

   ```bash
   copy server\.env.example server\.env
   copy client\.env.example client\.env
   ```

3. Update `server/.env` with your MongoDB connection string and JWT secret.

4. Run both apps:

   ```bash
   npm.cmd run dev
   ```

The API runs on `http://localhost:5000` and the frontend on `http://localhost:5173`.

## Deployment Notes

- Frontend: deploy `client` to Vercel or Netlify with `VITE_API_URL` pointing to the backend `/api` URL.
- Backend: deploy `server` to Render or Railway with `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, and `NODE_ENV=production`.
- Database: use MongoDB Atlas in production.
