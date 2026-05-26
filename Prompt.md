````md
# Prompt

## Context and Role
As a Full-Stack Software Engineer specializing in modern web application development, you are responsible for designing and implementing a scalable, secure, and production-ready CRUD Blog Application. The application must provide a seamless blogging experience where users can create, manage, publish, and interact with blog content through an intuitive and responsive interface.

The system should combine a high-performance frontend with a robust backend architecture, ensuring maintainability, scalability, and deployment readiness. Additionally, the platform must implement secure authentication, protected content management, image uploads, and optimized API communication suitable for real-world production environments.

---

## Objective
Develop a complete full-stack CRUD Blog Application that:

- Implements secure user authentication and session persistence for seamless user access.
- Provides complete blog management functionality, allowing authenticated users to create, update, delete, and manage their own blog content.
- Includes public blog browsing capabilities where visitors can explore published blog posts.
- Supports image upload functionality for blog cover images with validation and secure storage handling.
- Provides advanced search, filtering, and sorting capabilities to improve blog discoverability and user experience.
- Includes a personalized user dashboard for managing authored blog content and viewing quick activity insights.
- Implements production-grade backend APIs with proper validation, authentication, authorization, and structured error handling.
- Ensures responsive UI design, accessibility, maintainability, and deployment readiness.

---

## UI and Frontend Requirements

### User Experience and Layout
The application must provide a modern and user-friendly blogging interface that works seamlessly across devices.

The frontend should include:

- A visually appealing Home page showcasing featured or recent blog posts.
- A clean authentication flow including Login and Registration pages with proper validation feedback.
- A Blog Details page where users can read complete blog content with proper formatting.
- A Dashboard page where authenticated users can manage their blog posts efficiently.
- Dedicated Create Blog and Edit Blog pages with rich form interactions.
- A Profile page displaying user details and account information.
- A custom 404 error page for invalid routes.

The layout must:

- Be fully responsive across mobile, tablet, and desktop devices.
- Use reusable UI components for maintainability and scalability.
- Provide smooth loading states, toast notifications, and confirmation dialogs.
- Include a clean navigation bar and footer for seamless navigation.
- Maintain accessibility standards using semantic HTML and proper labeling.

---

## Authentication Requirements

### User Authentication Flow
Implement a secure authentication system that allows users to:

- Register with account credentials.
- Log in securely using email and password authentication.
- Log out safely by clearing active sessions.
- Remain authenticated after browser refresh using secure token persistence.

The authentication system must ensure:

- Only authenticated users can access protected pages.
- Only content owners can edit or delete their own blog posts.
- Unauthorized users cannot perform restricted actions.
- Passwords are securely hashed before database storage.
- JWT authentication is implemented securely using HTTP-only cookies.
- Cross-origin requests are configured securely.
- Basic rate limiting is implemented to prevent brute-force attacks.

---

## Blog Management Requirements

### CRUD Functionality
Implement complete blog management functionality.

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
Create a personalized dashboard where authenticated users can manage their blog content efficiently.

The dashboard should include:

- A list of all blog posts created by the logged-in user.
- Quick actions for creating, editing, and deleting blog posts.
- Quick statistics such as total blogs created or recently updated content.
- Easy navigation between account management and blog operations.
- Responsive dashboard design for usability across devices.

---

## Search and Filtering Requirements

### Blog Discovery Features
Implement advanced content discovery features to improve usability.

Users should be able to:

- Search blogs by title, content, or keywords.
- Filter blog posts by category.
- Sort blog posts by latest published date.
- Sort blog posts by oldest published date.

Ensure search operations are optimized and user interactions are debounced where necessary.

---

## Image Upload Requirements

### Cover Image Management
Implement secure blog cover image upload functionality.

The upload system must:

- Accept common image formats including JPG, JPEG, PNG, and WEBP.
- Validate uploaded file types before processing.
- Enforce file size limits to prevent oversized uploads.
- Handle upload failures gracefully.
- Store image references securely for retrieval.
- Optimize images where appropriate for performance.

---

## Database Requirements

### Data Modeling
Design scalable MongoDB database schemas.

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
Implement secure REST APIs for authentication:

- `POST /api/auth/register` for user registration.
- `POST /api/auth/login` for user authentication.
- `POST /api/auth/logout` for secure session termination.
- `GET /api/auth/me` for authenticated user profile retrieval.

### Blog APIs
Implement REST APIs for blog management:

- `POST /api/blogs` for creating blog posts.
- `GET /api/blogs` for retrieving all blogs.
- `GET /api/blogs/:id` for retrieving a single blog.
- `PUT /api/blogs/:id` for updating blog content.
- `DELETE /api/blogs/:id` for deleting blogs.
- `GET /api/blogs/user/my-blogs` for retrieving user-authored blogs.

---

## Validation and Security Requirements

### Input Validation
Validate all user input thoroughly.

The system must prevent:

- Invalid email submissions.
- Empty required form submissions.
- Malformed blog data.
- Invalid image uploads.
- Duplicate user registration attempts.

### Security Protections
Implement security best practices to prevent:

- Unauthorized access.
- Token misuse.
- Injection attacks.
- Cross-site scripting (XSS).
- Malicious file uploads.
- Session hijacking.
- Cross-origin vulnerabilities.
- Brute-force login abuse.

---

## Error Handling Requirements
The application must gracefully handle:

- Invalid login credentials with meaningful feedback.
- Duplicate signup attempts.
- Unauthorized route access.
- Invalid blog identifiers.
- Database connection failures.
- Image upload failures.
- Token expiration scenarios.
- Validation failures.
- Unexpected server crashes.

All backend responses must return structured JSON containing:

- Success status.
- Human-readable message.
- Optional payload data.
- Error details where appropriate.

---

## Performance and Scalability Requirements
Optimize the application for production-level performance.

The system must:

- Use optimized Redux state management patterns.
- Reduce unnecessary frontend re-renders.
- Implement lazy loading for heavy pages and components.
- Optimize image loading and rendering.
- Minimize API bottlenecks through efficient backend architecture.
- Use proper debouncing for search interactions.
- Maintain scalability for future feature expansion such as comments, likes, bookmarks, and admin moderation.

---

## Technology Stack

### Frontend
Use the following technologies:

- React
- Vite
- Tailwind CSS
- React Router DOM
- Redux Toolkit
- Axios

### Backend
Use the following technologies:

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
````

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

Prepare the project for production deployment.

Frontend deployment should support:

* Vercel or Netlify hosting.

Backend deployment should support:

* Render or Railway hosting.

Database deployment should support:

* MongoDB Atlas.

Environment variables must include:

```env
PORT=
MONGO_URI=
JWT_SECRET=
CLIENT_URL=
NODE_ENV=
COOKIE_SECRET=
```

---

## Documentation Requirements

Provide complete project documentation including:

* Folder structure explanation.
* Setup and installation instructions.
* Environment variable configuration guidance.
* API endpoint documentation.
* Authentication flow explanation.
* Deployment steps for frontend, backend, and database services.
* Production optimization notes.

---

## Final Deliverable

Build a complete production-ready full-stack CRUD Blog Application that includes:

* Secure authentication and authorization.
* Complete blog CRUD functionality.
* Image upload support.
* Search, filtering, and sorting capabilities.
* Personalized user dashboard.
* Protected backend APIs.
* Responsive frontend UI.
* Structured validation and error handling.
* Deployment-ready configuration.
* Clean modular architecture suitable for future scaling.

```
```
