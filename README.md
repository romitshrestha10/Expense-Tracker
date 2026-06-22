# 💰 Expense Tracker API

Containerized expense management REST API supporting cycle-based settlements, automated balance calculations, and cloud deployment using Docker, Render, and Aiven MySQL.
---

## 🚀 Features

### 👥 User Management
- User registration and authentication
- JWT-based authentication and authorization
- Secure password encryption using bcrypt

### 💸 Expense Management
- Create and manage expenses
- Track shared expenses such as rent, groceries, and utilities
- Associate expenses with users and settlement cycles

### 🔄 Cycle-Based Settlement System
- Configurable settlement periods (weekly or bi-weekly)
- Automated cycle creation and management
- Equal expense distribution among users
- Calculation of:
  - Total expenses
  - Individual contributions
  - Remaining balances
  - Amounts to pay or receive

### 📊 Summary & Analytics
- Expense summaries by cycle
- User contribution tracking
- Balance calculations
- Pending settlement calculations

### 📧 Planned Features
- Dashboard analytics
- Receipt upload and OCR processing
- Email notifications
- SMS reminders
- Financial insights and reports

---

# 🏗️ System Architecture

```text
Browser / Postman
        ↓
Express REST API
        ↓
Controllers
        ↓
Services
        ↓
Sequelize ORM
        ↓
MySQL Database
```

---

# 🐳 Docker Architecture

```text
Browser / Postman
        ↓
localhost:1333
        ↓
expense-api container
        ↓
Docker Internal Network
        ↓
mysql service
        ↓
expense-mysql container
        ↓
mysql_data volume
```

---

# 🛠️ Tech Stack

## Backend
- Node.js
- Express.js
- TypeScript
- REST APIs

## Database
- MySQL
- Sequelize ORM
- Sequelize Typescript

## Authentication & Security
- JWT Authentication
- bcrypt Password Encryption

## DevOps & Deployment
- Docker
- Docker Compose
- Render
- Aiven Cloud MySQL
- Git & GitHub

## Testing & Tools
- Postman
- Nodemon
- Node Cron
- Jest
- Supertest

---

# 📂 Project Structure

```text
Expense-Tracker
│
├── src
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── router
│   ├── jobs
│   ├── db
│   ├── utils
│   └── server.ts
│
├── build
├── Dockerfile
├── docker-compose.yml
├── .env
├── .env.docker
├── package.json
└── README.md
```

---

# ⚙️ Environment Variables

## Local Docker Environment

Create a file named:

```text
.env.docker
```

```env
PORT=1333

DB_HOST=mysql
DB_USER=root
DB_PASSWORD=password
DB_NAME=expense
DB_PORT=3306
DB_SSL=false

JWT_SECRET=your_secret_key

SENDGRID_API_KEY=dummy
SENDGRID_EMAIL=test@example.com
```

---

## Production Environment

```env
PORT=10000

DB_HOST=your-aiven-host
DB_USER=your-aiven-user
DB_PASSWORD=your-aiven-password
DB_NAME=defaultdb
DB_PORT=10987
DB_SSL=true

JWT_SECRET=your_secret_key

SENDGRID_API_KEY=your_sendgrid_key
SENDGRID_EMAIL=your_email
```

---

# 🐳 Running with Docker

## 1. Clone Repository

```bash
git clone https://github.com/romitshrestha10/Expense-Tracker.git
cd Expense-Tracker
```

---

## 2. Build and Start Containers

```bash
docker compose up --build
```

This command will:

✅ Build the Expense Tracker API image  
✅ Pull the MySQL image  
✅ Create Docker containers  
✅ Create Docker network  
✅ Create persistent database volume  
✅ Start API and Database services

---

## 3. Verify Containers

### Running Containers

```bash
docker ps
```

### All Containers

```bash
docker ps -a
```

### Docker Compose Status

```bash
docker compose ps
```

---

## 4. Verify API

Open:

```text
http://localhost:1333/health
```

Expected Response:

```json
{
  "status": "success",
  "message": "Expense Tracker API is running"
}
```

---

# 📋 Useful Docker Commands

## Start Containers

```bash
docker compose up
```

---

## Build and Start Containers

```bash
docker compose up --build
```

---

## Stop Containers

```bash
docker compose down
```

---

## Stop Containers and Delete Database Data

```bash
docker compose down -v
```

---

## View API Logs

```bash
docker compose logs api
```

---

## View MySQL Logs

```bash
docker compose logs mysql
```

---

## Restart Containers

```bash
docker compose restart
```

---

## Remove Stopped Containers

```bash
docker container prune
```

---

# 🧠 How Docker Works in This Project

## API Container

Contains:

- Linux Environment
- Node.js Runtime
- npm Dependencies
- Express Server
- TypeScript Build Files
- Application Source Code

---

## Database Container

Contains:

- MySQL Server
- Expense Database
- Persistent Storage Volume

---

## Internal Communication

Containers communicate through Docker's internal network:

```text
expense-api
      ↓
DB_HOST=mysql
      ↓
expense-mysql
```

Docker automatically resolves:

```text
mysql
```

to the MySQL container's internal IP address.

---

# 📬 API Testing with Postman

## Local Environment

Create:

```text
Expense Tracker - Local
```

Variables:

```text
base_url = http://localhost:1333
token =
```

---

## Production Environment

Create:

```text
Expense Tracker - Production
```

Variables:

```text
base_url = https://expense-tracker-zlbm.onrender.com
token =
```

---

# Example Requests

### Health Check

```http
GET {{base_url}}/health
```

### Register User

```http
POST {{base_url}}/auth/register
```

### Login User

```http
POST {{base_url}}/auth/login
```

### Create Expense

```http
POST {{base_url}}/expenses
```

### Get Expenses

```http
GET {{base_url}}/expenses
```

### Get Summary

```http
GET {{base_url}}/summary/{{cycleId}}
```

---

# ☁️ Production Deployment

The application is deployed on:

### Application Hosting
- Render

### Cloud Database
- Aiven MySQL

### Production Architecture

```text
Internet
      ↓
Render
      ↓
Express API
      ↓
Sequelize ORM
      ↓
Aiven Cloud MySQL
```

---

# 🎯 Learning Outcomes

This project demonstrates practical experience with:

✅ REST API Development  
✅ Backend Architecture Design  
✅ Authentication & Security  
✅ Relational Database Design  
✅ ORM Implementation  
✅ Docker & Docker Compose  
✅ Cloud Database Integration  
✅ Environment Management  
✅ Production Deployment  
✅ Logging & Debugging  
✅ API Testing with Postman  
✅ Git & GitHub Workflow

---

# 📌 Future Enhancements

- Dashboard and analytics
- OCR receipt processing
- Email notifications
- SMS reminders
- Redis caching
- CI/CD with GitHub Actions
- Kubernetes deployment
- API documentation with Swagger
- Unit and integration testing improvements

---

# 👨‍💻 Author

**Romit Shrestha**


