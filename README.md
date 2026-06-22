# Expense Tracker API

A backend expense management API built with Node.js, Express.js, TypeScript, Sequelize ORM, and MySQL.  
The system manages shared expenses, users, cycles, settlements, and balance calculations.

## Tech Stack

- Node.js
- Express.js
- TypeScript
- Sequelize ORM
- MySQL
- Docker
- Docker Compose
- JWT Authentication
- Postman

## Run Project with Docker

### 1. Clone the Repository

git clone https://github.com/romitshrestha10/Expense-Tracker.git
cd Expense-Tracker

2. Create .env.docker
PORT=1333

DB_HOST=mysql
DB_USER=
DB_PASSWORD= 
DB_NAME=expense
DB_PORT=3306
DB_SSL=false

JWT_SECRET=your_secret_key

SENDGRID_API_KEY=dummy
SENDGRID_EMAIL=test@example.com

3. Start API and MySQL Containers
docker compose up --build

This starts:

expense-api container
expense-mysql container
Docker network
MySQL volume
4. Test Health Endpoint
http://localhost:1333/health

Expected response:

{
  "status": "success",
  "message": "Expense Tracker API is running"
}


Useful Docker Commands

Start Containers
-->docker compose up
Start and Rebuild Containers
-->docker compose up --build
Stop Containers
-->docker compose down
Stop Containers and Delete Database Volume
-->docker compose down -v
View Running Containers
-->docker ps
View All Containers
-->docker ps -a
View API Logs
-->docker compose logs api
View MySQL Logs
-->docker compose logs mysql



Docker Architecture


Postman / Browser
      ↓
localhost:1333
      ↓
expense-api container
      ↓
Docker internal network
      ↓
mysql service
      ↓
expense-mysql container
      ↓
mysql_data volume
Local Postman Setup

Create a Postman environment:

Environment Name: Expense Tracker - Local
base_url = http://localhost:1333
token = empty

Example requests:

GET {{base_url}}/health
POST {{base_url}}/auth/register
POST {{base_url}}/auth/login
POST {{base_url}}/expenses
GET {{base_url}}/expenses
GET {{base_url}}/summary/{{cycleId}}
Production Deployment

Production API is hosted on Render and connected to Aiven Cloud MySQL.

Render API
    ↓
Sequelize ORM
    ↓
Aiven Cloud MySQL

Production Postman environment:

Environment Name: Expense Tracker - Production
base_url = https://expense-tracker-zlbm.onrender.com
token = empty
