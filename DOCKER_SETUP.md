# Docker Setup Guide

## Project Overview

This project consists of:

- React (Frontend)
- Django REST Framework (Backend)
- SQLite Database
- Docker Compose

---

## Prerequisites

Install:

- Docker Desktop
- Git

Verify Docker:

```cmd
docker --version
docker compose version
```

---

## Clone Repository

```cmd
git clone https://github.com/venkatesh-sai/Surya_project.git
cd Surya_project
```

---

## Build & Run

```cmd
docker compose up --build
```

The first build may take several minutes because Docker downloads the required images.

---

## Application URLs

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:8000
```

Django Admin

```
http://localhost:8000/admin
```

---

## Stop the Application

```cmd
docker compose down
```

---

## Restart the Application

```cmd
docker compose up
```

---

## Rebuild After Code Changes

```cmd
docker compose up --build
```

---

## Check Running Containers

```cmd
docker ps
```

---

## Check Docker Volumes

```cmd
docker volume ls
```

---

## Important Notes

Do **NOT** run:

```cmd
docker compose down -v
```

because it removes Docker volumes and may delete the persistent database and uploaded media.

---

## Technology Stack

- React (Frontend)
- Django REST Framework (Backend)
- SQLite
- Docker
- Docker Compose

---

## Project Structure

```
Surya_project/
│
├── backend/
│   ├── Dockerfile
│   └── project/
│
├── frontend/
│   ├── Dockerfile
│
├── docker-compose.yml
├── .dockerignore
└── DOCKER_SETUP.md
```

---

## Troubleshooting

If Docker containers are not running:

```cmd
docker compose down
docker compose up --build
```

If containers are already built:

```cmd
docker compose up
```