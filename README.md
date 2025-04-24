
# User Book Library API

A robust RESTful Node.js API for managing a personal book library. It includes **JWT-based authentication**, **role-based access control**, and full **CRUD operations** for books. The backend is built using **Node.js + Express**, with in-memory storage (for simplicity), making it perfect for demos, learning, and frontend integration.

---

##  Features

- User registration & login
-  JWT authentication (token-based)
- Role-based access control (`user`, `admin`)
- Full CRUD for books
- Request validation and error handling
- Protected routes
-  Clean file structure (routes, controllers, models, middleware)
-  Fast and lightweight (no database required)

---

## Tech Stack

- Node.js
- Express.js
- JSON Web Token (JWT)
- JavaScript (ES6+)

---

## 📁 Project Structure

book-library-api/ ├── src/ │ ├── controllers/ │ │ ├── authController.js │ │ └── bookController.js │ ├── middleware/ │ │ ├── authMiddleware.js │ │ └── roleMiddleware.js │ ├── models/ │ │ ├── userModel.js │ │ └── bookModel.js │ ├── routes/ │ │ ├── authRoutes.js │ │ └── bookRoutes.js │ └── app.js ├── package.json └── README.md

yaml
Copy
Edit

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Hanorah/api.git
cd book-library-api
2. Install Dependencies
bash
Copy
Edit
npm install
3. Run the API
bash
Copy
Edit
npm start
By default, the API runs on http://localhost:3000

Authentication & Authorization
Login and Register to get a JWT token.

Use the token in the Authorization header:

makefile
Copy
Edit
Authorization: Bearer <your-token-here>
Role Control
Normal users can view and add books.

Admin users can also delete books.

API Endpoints
Auth Routes

Method	Endpoint	Description
POST	/auth/register	Register a new user
POST	/auth/login	Login & receive JWT
Book Routes (Protected)

Method	Endpoint	Description
GET	/books	Get all books
POST	/books	Add a new book
PUT	/books/:id	Update a book
DELETE	/books/:id	Delete a book (admin only)
User Roles (in-memory)
The app comes with a hardcoded admin user:

pgsql
Copy
Edit
username: admin
password: admin123
role: admin
All other users registered are assigned the user role by default.

In-Memory Storage
Users and books are stored in arrays (RAM only).

No database setup required.

Great for prototyping and frontend integration.

Example Usage
Register a new user:

json
Copy
Edit
POST /auth/register
{
  "username": "john",
  "password": "secret"
}
Login and get token:

json
Copy
Edit
POST /auth/login
{
  "username": "john",
  "password": "secret"
}
Use JWT to access protected routes:

sql
Copy
Edit
GET /books
Authorization: Bearer <token>
💡 Notes
You can add token validation and expiration timeout.

Add database support (MongoDB, PostgreSQL, etc.) for production use.

Integrate with a frontend like React (see book-library-client repo).
