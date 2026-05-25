Prompt 
You are a Full-stack Software Engineer, you are required to design and develop a scalable and production-ready CRUD Blog Application that allows users to create, manage, publish and interact with blog content. 
It should support secure authentication, content management, database persistence with user friendly interfaces and production grade backend APIs. 
You'll be responsible for frontend development, backend architecture, authentication, database modeling, API design, validation, error handling and deployment readiness. 
The end application should be modular, maintainable, secure and scalable for future feature expansion. 
 
Tech Stack 
Use: 
Frontend
React 
Vite 
Tailwind CSS 
React Router DOM 
Redux Toolkit 
Axios 
Backend 
Node.js 
Express.js 
MongoDB 
Mongoose 
JWT 
bcrypt 
cookie-parser 
multer 
 
Core Features 
Authentication 
Users should be able to: 
register 
log in 
log out 
stay logged in after refresh 
Users must only be able to edit or delete their own blog posts. 
 
Blog CRUD 
Implement full CRUD functionality. 
Users should be able to: 
create blog posts 
view all blogs 
open single blog pages 
edit their own blogs 
delete their own blogs 
Each blog should have: 
title 
content 
cover image 
category 
tags 
author 
created date 
 
Dashboard 
Create a dashboard where users can manage their blogs. 
Features: 
view all personal blogs 
create new blog 
edit blog 
delete blog 
quick stats 
 
Search & Filter 
Users should be able to: 
search blogs 
filter by category 
sort blogs by latest/oldest 
 
Image Upload 
Support blog cover image upload. 
Requirements: 
image validation 
file size limit 
common image formats 
 
Database Models 
User 
name 
email 
password 
profile image 
createdAt 
Blog 
title 
content 
cover image 
category 
tags 
authorId 
slug 
createdAt 
updatedAt 
 
API Requirements 
Build REST APIs for: 
Authentication: 
register 
login 
logout 
current user 
Blogs: 
create blog 
get all blogs 
get single blog 
update blog 
delete blog 
get user blogs 
 
Frontend Pages 
Create: 
Home 
Login 
Register 
Dashboard 
Create Blog 
Edit Blog 
Blog Details 
Profile 
404 Page 
 
UI Expectations 
The app should be: 
modern 
responsive 
clean 
user-friendly 
Include: 
navbar 
footer 
blog cards 
forms 
loading states 
toast notifications 
confirmation modal 
 
Security 
Implement: 
JWT authentication 
password hashing 
protected routes 
authorization checks 
input validation 
secure cookies 
 
Error Handling 
Handle cases like: 
invalid login 
duplicate signup 
unauthorized access 
invalid blog ID 
upload failures 
database errors 
 
Deployment 
Prepare for deployment with: 
frontend on Vercel/Netlify 
backend on Render/Railway 
MongoDB Atlas 
Use environment variables properly. 
 

