# Ad Shopping House

> **Ad-Shopping-House** — A full‑stack e‑commerce / shopping application scaffold with separate `frontend` and `backend` services and Docker Compose support.

---

## Table of Contents

* [Project Overview](#project-overview)
* [Key Features](#key-features)
* [Repository Structure](#repository-structure)
* [Tech Stack](#tech-stack)
* [System Architecture](#system-architecture)
* [Prerequisites](#prerequisites)
* [Environment Variables](#environment-variables)
* [Local Development (Quickstart)](#local-development-quickstart)
* [Running with Docker Compose](#running-with-docker-compose)
* [Database setup (Windows PowerShell)](#database-setup-windows-powershell)
* [Build & Production Notes](#build--production-notes)
* [Testing](#testing)
* [Contributing](#contributing)
* [License](#license)
* [Author / Contact](#author--contact)

---

## Project Overview

Ad Shopping House is a modular full‑stack shopping application split into `frontend` and `backend` folders. It includes scripts and a `docker-compose.yml` scaffold to run the services and database together.

This README gives contributors and maintainers a clear guide for setup, development, and deployment.

---

## Key Features

* Separate **frontend** and **backend** codebases for clean separation of concerns.
* Docker Compose orchestration for easy local development.
* TypeScript used across the project for safer, typed code.
* Scripts included to help start the database and services.

---

## Repository Structure

```
/ (root)
├─ backend/          # Server-side code (API, DB models, migrations)
├─ frontend/         # Client app (UI, assets)
├─ docker-compose.yml
├─ start-database.ps1 # PowerShell helper script
└─ .gitignore
```

> Note: The project contains both `frontend` and `backend` folders and a `docker-compose.yml` at repo root to orchestrate them.

---

## Tech Stack (suggested)

* **Frontend:** TypeScript, modern web toolchain (Vite/React/Next/Angular — adjust if needed)
* **Backend:** TypeScript (Node.js/Express/Nest/Next API — adjust to your chosen framework)
* **Database:** (configure your DB of choice — Postgres, MySQL, MongoDB)
* **Local orchestration:** Docker & Docker Compose

---

## System Architecture

1. **Frontend** — Single Page Application (SPA) that talks to the backend REST/GraphQL API.
2. **Backend** — Auth, product/catalog API, order processing, and database access.
3. **Database** — Persistent data store. `docker-compose.yml` can be used to run a local database for development.

---

## Prerequisites

* Git
* Node.js (LTS recommended)
* npm or yarn or pnpm
* Docker & Docker Compose (optional but recommended for local DB)
* PowerShell (Windows) if you plan to use `start-database.ps1`

---

## Environment Variables

Create `.env` files in both `backend` and `frontend` (if required). Example variables that you may need to provide (replace values according to your stack):

### Backend `.env` example

```
PORT=4000
NODE_ENV=development
DATABASE_URL=postgres://user:password@db:5432/ad_shopping_house
JWT_SECRET=your_jwt_secret_here
```

### Frontend `.env` example (Vite or similar)

```
VITE_API_URL=http://localhost:4000/api
```

> Keep secrets out of the repo. Add `.env` to `.gitignore`.

---

## Local Development (Quickstart)

Below are two ways: using Docker Compose (recommended) or running services individually.

### Option A — Using Docker Compose (recommended)

1. Clone the repo:

```bash
git clone https://github.com/Adnan-Ahmed07/Ad-Shopping-House.git
cd Ad-Shopping-House
```

2. Start services (this will use `docker-compose.yml` at the repo root):

```bash
docker-compose up --build
```

3. Open the frontend at `http://localhost:3000` (or whichever port is configured) and backend at `http://localhost:4000`.

### Option B — Run services individually

**Backend**

```bash
cd backend
npm install
# set .env as shown above
npm run dev # or npm start depending on the project scripts
```

**Frontend**

```bash
cd frontend
npm install
# set .env (VITE_API_URL or REACT_APP_API_URL)
npm run dev
```

---

## Running with Docker Compose

If your `docker-compose.yml` contains services for `frontend`, `backend`, and `db`, use:

```bash
# build and start in background
docker-compose up --build -d
# show logs
docker-compose logs -f
# stop and remove
docker-compose down
```

---

## Database setup (Windows PowerShell)

The repository includes `start-database.ps1` — a helper to start a local DB. You can run this in PowerShell (run as Administrator if necessary):

```powershell
# From repo root
.\start-database.ps1
```

Open the script to see what it does and adapt credentials to your `.env`.

---

## Build & Production Notes

* Build frontend for production: `cd frontend && npm run build` (adjust per framework).
* Build backend for production: compile TypeScript to JS and run with a process manager (pm2, systemd, etc.).
* Use environment-specific `.env` files or a secrets manager in production.
* Configure reverse proxy (Nginx) or a cloud provider's load balancer for production deployments.

---

## Testing

If tests exist, run them in each package:

```bash
cd backend && npm run test
cd frontend && npm run test
```

Adjust according to the repo's actual test scripts.

---

## Contributing

Thanks for considering contributing! Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/my-feature`.
3. Commit changes: `git commit -m "feat: add ..."`.
4. Push: `git push origin feat/my-feature`.
5. Open a Pull Request describing your changes.

Guidelines:

* Keep commits small and focused.
* Write clear commit messages.
* Run linters and tests before opening PRs.

---

## License

Add a license (e.g., MIT) to the repo if you want to permit reuse. Example:

```
MIT License
Copyright (c) 2025 Adnan Ahmed
```

---

## Author / Contact

Adnan Ahmed 
