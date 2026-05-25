# Full-Stack Blog Application Development Prompt

## Project Overview
You are a **Full-stack Software Engineer** tasked with designing and developing a **scalable, production-ready CRUD Blog Application** that allows users to create, manage, publish, and interact with blog content.

The application must support:
- Secure authentication
- Content management
- Database persistence
- User-friendly interfaces
- Production-grade backend APIs

You will be responsible for:
- Frontend development
- Backend architecture
- Authentication
- Database modeling
- API design
- Validation
- Error handling
- Deployment readiness

The final application must be:
- Modular
- Maintainable
- Secure
- Scalable for future feature expansion

---

## Tech Stack

### Frontend
Use:
- React
- Vite
- Tailwind CSS
- React Router DOM
- Redux Toolkit
- Axios

### Backend
Use:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- cookie-parser
- multer

---

## Core Features

## Authentication
Users should be able to:
- Register
- Log in
- Log out
- Stay logged in after refresh

Rules:
- Users can only edit or delete their own blog posts

---

## Blog CRUD
Implement complete CRUD functionality.

Users should be able to:
- Create blog posts
- View all blogs
- View single blog page
- Edit their own blogs
- Delete their own blogs

Each blog must include:
- Title
- Content
- Cover image
- Category
- Tags
- Author
- Created date

---

## Dashboard
Create a user dashboard with:

Features:
- View all personal blogs
- Create new blog
- Edit blog
- Delete blog
- Quick stats

---

## Search & Filter
Users should be able to:
- Search blogs
- Filter by category
- Sort by latest
- Sort by oldest

---

## Image Upload
Support cover image upload.

Requirements:
- Image validation
- File size limit
- Common image formats support (jpg, jpeg, png, webp)

---

## Database Models

### User Model
Fields:
```js
name
email
password
profileImage
createdAt
```

### Blog Model
Fields:
```js
title
content
coverImage
category
tags
authorId
slug
createdAt
updatedAt
```

---

## REST API Requirements

### Authentication APIs
Implement:
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me

---

### Blog APIs
Implement:
- POST /api/blogs
- GET /api/blogs
- GET /api/blogs/:id
- PUT /api/blogs/:id
- DELETE /api/blogs/:id
- GET /api/blogs/user/my-blogs

---

## Frontend Pages
Create:

- Home
- Login
- Register
- Dashboard
- Create Blog
- Edit Blog
- Blog Details
- Profile
- 404 Page

---

## UI Requirements
The application must be:

- Modern
- Responsive
- Clean
- User-friendly

Include:
- Navbar
- Footer
- Blog cards
- Forms
- Loading states
- Toast notifications
- Confirmation modal

---

## Security Requirements
Implement:
- JWT authentication
- Password hashing using bcrypt
- Protected routes
- Authorization checks
- Input validation
- Secure HTTP-only cookies
- CORS configuration
- Rate limiting (recommended)

---

## Error Handling
Handle:
- Invalid login
- Duplicate signup
- Unauthorized access
- Invalid blog ID
- Upload failures
- Database connection failures
- Validation errors
- Server errors

---

## Suggested Project Structure

### Frontend
```bash
client/
 ┣ src/
 ┃ ┣ app/
 ┃ ┣ components/
 ┃ ┣ pages/
 ┃ ┣ features/
 ┃ ┣ services/
 ┃ ┣ utils/
 ┃ ┣ hooks/
 ┃ ┣ routes/
 ┃ ┗ main.jsx
```

### Backend
```bash
server/
 ┣ config/
 ┣ controllers/
 ┣ middleware/
 ┣ models/
 ┣ routes/
 ┣ utils/
 ┣ uploads/
 ┣ app.js
 ┗ server.js
```

---

## Deployment Requirements

Prepare deployment for:

Frontend:
- Vercel or Netlify

Backend:
- Render or Railway

Database:
- MongoDB Atlas

Environment variables:
```env
PORT=
MONGO_URI=
JWT_SECRET=
CLIENT_URL=
NODE_ENV=
COOKIE_SECRET=
```

---

## Additional Production Expectations
Include:
- Clean architecture
- Reusable components
- Modular folder structure
- API response standardization
- Loading/error state management
- SEO-friendly blog slugs
- Proper form validation
- Optimized image handling
- Secure authentication persistence
- Deployment-ready configuration

---

## Final Deliverable
Build a complete full-stack blog application with:
✅ Production-ready code  
✅ Secure authentication  
✅ Full CRUD blog functionality  
✅ Responsive frontend UI  
✅ Protected backend APIs  
✅ Image upload support  
✅ Search/filter/sort functionality  
✅ Dashboard management  
✅ Deployment-ready setup
