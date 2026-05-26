# Prompt

## Context and Role

You’re a Full-Stack Software Engineer, with experience in modern web technologies, and will build a scalable, secure, production-ready CRUD blog app.The program should provide an intuitive, responsive interface to organize, create, publish and interact with blog content for a seamless blogging experience.The system has to be deployable, scalable and maintainable and demands a high performance frontend and a solid backend design. It should also have image uploads, managed content security, authentication, and simplified APIs for practical, production-ready use.

---

## Objective

Develop a complete full-stack CRUD Blog Application that:

-Secure user authentication and session persistence are used to facilitate user access.
- Allowing allowed users to add, edit, remove, and manage their own blog entries, it provides complete blog management features.
- Users can browse previously published blog articles using its public blog browsing tools.
- Offers capabilities for uploading images and handling secure storage for blog cover photos.
- Provides advanced search, filtering, and sorting capabilities that improve blog discoverability and user experience.
- With its personalized user interface, you can control published blog content and analyze speedy activity data.
- Develops production-quality backend APIs with suitable authorization, authentication, validation, and structured error handling.
- Guarantees adaptive user interface design, accessibility, maintainability, and deployment readiness.

---

## UI and Frontend Requirements

### User Experience and Layout

- The application must provide a modern and user-friendly blogging interface that works seamlessly across devices.

The frontend should include:

- A visually appealing Home page showcasing featured or recent blog posts.
- A clean authentication flow including Login and Registration pages with proper validation feedback.
- A Blog Details page where users can read complete blog content with proper formatting.
- A Dashboard page where authenticated users can manage their blog posts efficiently.
- Dedicated Create Blog and Edit Blog pages with rich form interactions.
- A Profile page displaying user details and account information.
- A custom 404 error page for invalid routes.

The layout must:

- Be fully responsive across mobile, tablet and desktop platforms.
- Use reusable UI components to improve maintainability and scalability.
- Provide smooth loading states, confirmation dialogs and toast alerts.
- Add a neat navigation bar and footer for simple navigating.
- Maintain accessibility standards by using suitable tags and semantic HTML.

---

## Authentication Requirements

### User Authentication Flow

Implement a secure authentication system that allows users to:

- Register with account credentials.
- Log in securely using email and password authentication.
- Log out safely by clearing active sessions.
- Remain authenticated after browser refresh using secure token persistence.

The authentication system must ensure:

- Only authenticated users can view protected pages.
- Blog posts can only be edited or deleted by the content owner.
- Restricted actions are not allowed to unauthorized users.
- Hashed passwords stored in database
- JWT authentication is implemented securely via HttpOnly Cookies.
- Cross-origin queries are configured securely.
- Basic rate restriction is used to prevent brute-force assaults.

---

## Blog Management Requirements

### CRUD Functionality

Authenticated users should be able to:

- Create new blog posts.
- Edit their own blog posts.
- Delete their own blog posts.
- View all published blog posts.
- Read a single blog post in detail.

Each blog post must contain:

- Title for blog identification and SEO readability.
- Rich blog content supporting formatted text.
- Cover image for visual presentation.
- Category classification for filtering.
- Tags for discoverability and organization.
- Author information linked to the creator.
- SEO-friendly slug generation for clean URLs.
- Creation and update timestamps.

---

## Dashboard Requirements

### User Dashboard

The dashboard should include:

- A list of all blog posts created by the logged-in user.
- Quick actions for creating, editing, and deleting blog posts.
- Quick statistics such as total blogs created or recently updated content.
- Easy navigation between account management and blog operations.
- Responsive dashboard design for usability across devices.

---

## Search and Filtering Requirements

### Blog Discovery Features

Users should be able to:

- Search blogs by title, content, or keywords.
- Filter blog posts by category.
- Sort blog posts by latest published date.
- Sort blog posts by oldest published date.
- Experience optimized search interactions using debouncing where necessary.

---

## Image Upload Requirements

### Cover Image Management

The upload system must:

- Supports up to JPG, JPEG, PNG and WEBP popular image formats.
- Check file types of uploaded files before processing.
- Restrict file size to prevent large uploads.
- Graceful upload failure handling
- Store image references securely for retrieval.
- Optimize images where appropriate for performance.

---

## Database Requirements

### Data Modeling

#### User Model

The user model must include:

- Name for account identification.
- Email as a unique authentication credential.
- Password for secure login authentication.
- Optional profile image.
- Account creation timestamp.

#### Blog Model

The blog model must include:

- Blog title.
- Blog content.
- Cover image reference.
- Category.
- Tags collection.
- Author relationship using user reference.
- SEO-friendly slug.
- Created timestamp.
- Updated timestamp.

---

## Backend API Requirements

### Authentication APIs

Implement:

- POST `/api/auth/register` for user registration.
- POST `/api/auth/login` for user authentication.
- POST `/api/auth/logout` for secure session termination.
- GET `/api/auth/me` for authenticated user profile retrieval.

### Blog APIs

Implement:

- POST `/api/blogs` for creating blog posts.
- GET `/api/blogs` for retrieving all blogs.
- GET `/api/blogs/:id` for retrieving a single blog.
- PUT `/api/blogs/:id` for updating blog content.
- DELETE `/api/blogs/:id` for deleting blogs.
- GET `/api/blogs/user/my-blogs` for retrieving user-authored blogs.

---

## Validation and Security Requirements

### Input Validation

The system must prevent:

- Invalid email submissions.
- Empty required form submissions.
- Malformed blog data.
- Invalid image uploads.
- Duplicate user registration attempts.

### Security Protections

Implement protection against:

- Unauthorized access, ensuring that only persons who have been validated can access sensitive actions and protected channels.
- Preventing user impersonation using stolen or incorrect authentication tokens.Malicious input that attempts to change database queries or backend activities is prevented by injection risks.
- Cross-site scripting (XSS) is the process of sanitizing user input to prevent harmful scripts from executing in the browser.
- Verifying uploaded files to prevent harmful or unsupported files from being stored on the server is known as malicious file uploads.
- Session hijacking is the process of securing user sessions to stop hackers from stealing active login sessions.
- Cross-origin vulnerabilities: ensure that CORS is set up properly to prevent requests from unapproved domains from reaching the backend.
- Brute-force login abuse, limiting repeated login attempts to prevent attackers from guessing passwords.
---

## Error Handling Requirements

The application must gracefully handle:

- Handle incorrect login attempts by showing clear feedback for invalid email or password entries.
- Prevent users from creating multiple accounts with the same email address.
- Block unauthenticated users from accessing restricted pages and protected actions.
- Gracefully handle situations where a requested blog post cannot be found.
- Respond properly if the application loses connection to the database.
- Handle issues during image uploads, such as invalid file formats, oversized files, or failed uploads.
- Ask users to log in again when their session has expired.
- Show clear and helpful error messages when users submit incomplete or invalid information.
- Safely handle unexpected server failures without exposing sensitive system information.

All backend responses must include:

- Success status.
- Human-readable message.
- Optional payload data.
- Error details where appropriate.

---

## Performance and Scalability Requirements

The system must:

- Use optimized Redux state management patterns.
- Reduce unnecessary frontend re-renders.
- Implement lazy loading for heavy pages and components.
- Optimize image loading and rendering.
- Minimize API bottlenecks through efficient backend architecture.
- Use proper debouncing for search interactions.
- Support future expansion such as comments, likes, bookmarks, and admin moderation.

---

## Technology Stack

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
- dotenv

---

## Suggested Project Structure

### Frontend

- `client/src/app/` for store configuration
- `client/src/components/` for reusable UI components
- `client/src/pages/` for route pages
- `client/src/features/` for Redux slices
- `client/src/services/` for API logic
- `client/src/utils/` for helper functions
- `client/src/hooks/` for custom hooks
- `client/src/routes/` for route guards/navigation
- `client/src/main.jsx` as frontend entry point

### Backend

- `server/config/` for environment and DB config
- `server/controllers/` for business logic
- `server/middleware/` for auth/error middleware
- `server/models/` for database schemas
- `server/routes/` for API endpoints
- `server/utils/` for utility helpers
- `server/uploads/` for image storage
- `server/app.js` for Express app config
- `server/server.js` as backend entry point

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

- PORT
- MONGO_URI
- JWT_SECRET
- CLIENT_URL
- NODE_ENV
- COOKIE_SECRET

---

## Documentation Requirements

Provide documentation for:

- Folder structure explanation.
- Setup and installation instructions.
- Environment variable configuration.
- API endpoint documentation.
- Authentication flow explanation.
- Deployment instructions.
- Performance optimization notes.

---

## Final Deliverable

Build a complete production-ready full-stack CRUD Blog Application with:

- Secure authentication and authorization.
- Full CRUD blog functionality.
- Image upload support.
- Search, filtering, and sorting features.
- Personalized dashboard management.
- Protected backend APIs.
- Responsive frontend UI.
- Structured validation and error handling.
- Deployment-ready architecture.
- Modular and scalable codebase.

---
