

##  Features

- User registration & login
-  JWT authentication (token-based)
- Role-based access control (`user`, `admin`)
- Full CRUD for books
- Request validation and error handling
- Protected routes
-  Clean file structure (routes, controllers, models, middleware)
-  Fast and lightweight (no database required)



## Project Structure

book-library-api/ ├── src/ │ ├── controllers/ │ │ ├── authController.js │ │ └── bookController.js │ ├── middleware/ │ │ ├── authMiddleware.js │ │ └── roleMiddleware.js │ ├── models/ │ │ ├── userModel.js │ │ └── bookModel.js │ ├── routes/ │ │ ├── authRoutes.js │ │ └── bookRoutes.js │ └── app.js ├── package.json └── README.md


---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/book-library-api.git
cd book-library-api
2. Install Dependencies

npm install
3. Run the API

npm start
By default, the API runs on http://localhost:3000

Authentication & Authorization
Login and Register to get a JWT token.

Use the token in the Authorization header:

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


username: admin
password: admin123
role: admin
All other users registered are assigned the user role by default.

In-Memory Storage
Users and books are stored in arrays (RAM only).

No database setup required.
