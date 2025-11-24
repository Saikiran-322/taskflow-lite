# 🏛️ TaskFlow Lite Architecture

TaskFlow Lite is a full-stack, containerized task management system built with modern web technologies such as **React**, **Node.js**, **Prisma**, and **PostgreSQL**, all orchestrated using **Docker Compose**.

This document explains the architecture, modules, and request flow.

---

## 🔷 High-Level Diagram

┌────────────────────────────┐
│ Frontend (React) │
│ Vite + Axios + MUI │
│ Port: 5173 │
└───────────────┬────────────┘
│ HTTP (REST)
▼
┌────────────────────────────┐
│ Backend (Node + Express) │
│ TypeScript + Prisma Client │
│ Port: 4000 │
└───────────────┬────────────┘
│ Prisma ORM
▼
┌────────────────────────────┐
│ PostgreSQL Database │
│ Port: 5432 │
└────────────────────────────┘

scss
Copy code

All running inside Docker Compose network:

taskflow-network

yaml
Copy code

---

## 📦 Project Structure

taskflow-lite/
│
├── backend/
│ ├── src/
│ │ ├── routes/
│ │ ├── controllers/
│ │ ├── services/
│ │ └── app.ts
│ ├── prisma/
│ │ ├── schema.prisma
│ │ └── migrations/
│ └── Dockerfile
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── pages/
│ │ └── main.tsx
│ ├── Dockerfile
│ └── nginx.conf
│
└── docker-compose.yml

yaml
Copy code

---

## 🧠 Backend Architecture (Node + Express + Prisma)

### Layers

#### 1. **Routes**

Defines REST endpoints.

Example:
GET /api/tasks
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id

bash
Copy code

#### 2. **Controllers**

Handle request/response logic.

Example:

````ts
TaskController.getAll
TaskController.update
3. Services
Business logic + database access via Prisma Client.

Example:

ts
Copy code
TaskService.getAll()
TaskService.create()
4. Prisma ORM
Converts JavaScript/TypeScript calls into SQL queries.

🎨 Frontend Architecture (React + Vite + MUI)
Key Layers
Components: Render UI (TaskCard, TaskForm)

Pages: TaskList = main page

Hooks: useTasks() manages API state & CRUD actions

API: Axios instance → VITE_API_URL

Theme: MUI custom theme

🐋 Docker Architecture
Services
1. taskflow-frontend
Built using Node (build stage), served via NGINX

Exposes port 5173

2. taskflow-backend
Node + Express + Prisma

Compiled TypeScript served via Node

Exposes port 4001 → 4000

3. taskflow-postgres
PostgreSQL with persistent volume

Exposes port 5433 → 5432

Network
All services run inside Docker network:

Copy code
taskflow-lite_default
Backend connects to Postgres using service name:

bash
Copy code
postgresql://postgres:postgres@taskflow-postgres:5432/taskflow
🔄 Request Flow
1. User interacts with UI
Clicks “Create Task”.

2. Frontend calls backend
bash
Copy code
POST http://localhost:4001/api/tasks
3. Backend validates and saves via Prisma
lua
Copy code
prisma.task.create(...)
4. PostgreSQL stores data
5. Response returns to frontend
UI updates through useTasks() hook.

✔ Deployment Ready
Production build uses:

Multi-stage Dockerfiles

NGINX static hosting for frontend

Node.js runtime for backend

Persistent PostgreSQL volume

This project is suitable for:

Local dev

Cloud deployment

CI/CD automation

Portfolio projects

🎉 End of Architecture Documentation
yaml
Copy code

---

# ✅ **Your 3 files are ready.**
You can now commit & push:

```bash
git add .
git commit -m "Add CONTRIBUTING.md, LICENSE, and ARCHITECTURE.md"
git push
````
