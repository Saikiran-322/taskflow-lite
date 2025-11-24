TaskFlow Lite — Full-Stack Task Manager (Node.js + React + Docker)

TaskFlow Lite is a production-ready, containerized full-stack application built using Node.js, Express, PostgreSQL, Prisma, React (Vite), Material UI, and Docker.
It demonstrates how to build a clean, scalable, enterprise-style project.

🚀 Tech Stack
Frontend

React (Vite)

TypeScript

Material UI (MUI)

Axios

NGINX (for production build inside Docker)

Backend

Node.js + Express

TypeScript

Prisma ORM

PostgreSQL

Docker

DevOps / Deployment

Docker Compose (multi-container setup)

Prisma migrations

Containerized NGINX server for React build

🏗️ Project Architecture
taskflow-lite/
│
├── backend/ # Node.js API server
│ ├── src/
│ ├── prisma/
│ ├── Dockerfile
│ └── .env
│
├── frontend/ # React + Vite UI
│ ├── src/
│ ├── public/
│ ├── Dockerfile
│ ├── nginx.conf
│ └── .env
│
├── docker-compose.yml # Multi-container setup
└── README.md # Project documentation

🔧 Environment Variables
Backend (backend/.env)
PORT=4000
DATABASE_URL="postgresql://postgres:postgres@taskflow-postgres:5432/taskflow?schema=public"

Frontend (frontend/.env)
VITE_API_URL=http://localhost:4001

🐋 Running With Docker (Recommended)

1. Start all services
   docker compose up -d --build

2. Access the apps:
   Service URL
   Frontend http://localhost:5173

Backend http://localhost:4001

API (tasks) http://localhost:4001/api/tasks

PostgreSQL localhost:5433 (exposed)
🛠️ Running Backend Locally (Without Docker)
cd backend
npm install
npx prisma generate
npm run dev

Apply Database Migrations
npx prisma migrate dev --name init

🛠️ Running Frontend Locally (Without Docker)
cd frontend
npm install
npm run dev

Visit:

http://localhost:5173

🧪 Prisma Commands

Generate Prisma Client:

npx prisma generate

Create migration:

npx prisma migrate dev --name init

Deploy migration (for production):

npx prisma migrate deploy

Open Prisma Studio:

npx prisma studio

✨ Features

✔ Create task
✔ Edit task
✔ Delete task
✔ Toggle task status
✔ Persistent PostgreSQL database
✔ Fully Dockerized
✔ Clean service/controller architecture
✔ Prisma ORM
✔ Material UI frontend
✔ Production NGINX static hosting
✔ Hot reload during dev

🚀 Production Build (Docker)

The frontend uses:

Node:18-alpine (builder)

NGINX (runtime)

The backend uses:

Node:20-alpine

Prisma with PostgreSQL

docker compose up -d --build

This produces:

Container Purpose
taskflow-frontend NGINX serving React build
taskflow-backend Node.js API
taskflow-postgres PostgreSQL database
🧩 API Endpoints
GET /api/tasks

Get all tasks.

POST /api/tasks

Create a new task.

PUT /api/tasks/:id

Update a task.

DELETE /api/tasks/:id

Delete a task.

📌 Future Enhancements

Signup/Login (JWT Auth)

User-specific task lists

Filters & sorting

CI/CD with GitHub Actions

Cloud deployment (Render/EC2)
