# Smart Expense Tracker

A full-stack personal finance application for tracking income and expenses, monitoring account balance, filtering transactions, and visualizing financial data through interactive charts.

The project was built as a portfolio application demonstrating full-stack development with React, Node.js, Express, MongoDB, REST APIs, JWT authentication, and responsive design.

## Live Demo

- Frontend: Coming soon
- Backend API: Coming soon

## Features

### Authentication

- User registration
- User login
- JWT-based authentication
- Password hashing with bcrypt
- Protected frontend routes
- Public route protection for authenticated users
- Persistent authentication after page refresh
- Secure logout

### Transactions

- Add income
- Add expenses
- Edit transactions
- Delete transactions
- Confirmation before deletion
- Search transactions by description
- Filter transactions by category
- Filter transactions by date range
- User-specific transaction data
- Loading and empty states
- Toast notifications

### Dashboard

- Total balance
- Total income
- Total expenses
- Five most recent transactions
- Expenses grouped by category
- Monthly expense statistics
- Interactive pie chart
- Interactive bar chart

### User Interface

- Responsive navigation
- Responsive dashboard
- Responsive transaction form
- Horizontally scrollable transaction table on smaller screens
- Custom 404 page
- Form validation
- Error handling
- Mobile-friendly design

## Tech Stack

### Frontend

- React
- JavaScript
- React Router
- Axios
- Recharts
- React Toastify
- CSS
- Vite

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens
- bcryptjs
- CORS
- dotenv

### Development Tools

- Visual Studio Code
- Git
- GitHub
- MongoDB Atlas
- Postman

## Project Structure

```text
SmartExpenseTracker/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
│
├── .gitignore
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

Install the following software:

- Node.js
- npm
- Git
- A MongoDB Atlas account or local MongoDB instance

### Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd SmartExpenseTracker
```

## Backend Setup

Open the backend folder:

```bash
cd backend
```

Install the dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Start the backend in development mode:

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:5000
```

## Frontend Setup

Open a second terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

## Production Build

To create a production build of the frontend:

```bash
cd frontend
npm run build
```

The production files will be generated inside:

```text
frontend/dist
```

To start the backend in production mode:

```bash
cd backend
npm start
```

## API Endpoints

### Authentication

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Log in a user | No |
| GET | `/api/auth/profile` | Get the authenticated user | Yes |

### Transactions

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| GET | `/api/transactions` | Get transactions | Yes |
| POST | `/api/transactions` | Create a transaction | Yes |
| PUT | `/api/transactions/:id` | Update a transaction | Yes |
| DELETE | `/api/transactions/:id` | Delete a transaction | Yes |
| GET | `/api/transactions/recent` | Get the five most recent transactions | Yes |
| GET | `/api/transactions/stats` | Get dashboard statistics | Yes |
| GET | `/api/transactions/chart-data` | Get chart statistics | Yes |

### Transaction Filters

The following query parameters can be used with:

```text
GET /api/transactions
```

| Parameter | Description |
|---|---|
| `search` | Search by transaction description |
| `category` | Filter by category |
| `startDate` | Filter from a selected date |
| `endDate` | Filter until a selected date |

Example:

```text
/api/transactions?category=Food&search=lunch&startDate=2026-01-01
```

## Security

- Passwords are hashed before being stored
- JWT is required for protected API endpoints
- Transactions are scoped to the authenticated user
- Sensitive values are stored in environment variables
- Environment files are excluded from Git
- CORS is restricted to the configured frontend URL
- Request body size is limited
- Protected and public frontend routes are separated

## Screenshots

Screenshots will be added after the production deployment is completed.

## Future Improvements

- Pagination for large transaction lists
- Recurring transactions
- Budget limits by category
- Export transactions to CSV or PDF
- Dark mode
- Automated tests
- Password reset functionality
- Email verification

## Author

**Mihail Petrov**

Software Engineering student and aspiring full-stack developer.

## License

This project was created for educational and portfolio purposes.