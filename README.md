# IMPORTANT
The main focus is backend architecture and API design.
Frontend design is not the priority and is implemented as best as possible to support testing and usage of the backend.

# WeBlog
WeBlog is a project that was originally inspired by blog websites out there, and I tried to create a similar idea in my own way.


#  Docker Setup (Recommended)
## Prerequisites
* Docker
* Docker Compose

## Run with Docker Compose
```bash
docker-compose up --build
```
or 
```bash
docker-compose up -d --build
```

## Services
| Service | URL |
|------|------------|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:5000 |

## Stop Containers
```bash
docker-compose down
```

## Rebuild Containers
```bash
docker-compose down
docker-compose up --build
```

# Backend (Express.js)

## Installation

```bash
cd backend
pnpm install
```

## Environment Variables

Create a `.env` file in the `backend` folder:

## Run the Server

```bash
pnpm run dev
# or
pnpm start
```

The server will run at:

```
http://localhost:5000
```

# Frontend (Next.js)

## Installation

```bash
cd frontend
pnpm install
```

## Run the Application

```bash
pnpm run dev
```

The app will run at:

```
http://localhost:3000
```

## Author

Created by **MrAgungS**

Feel free to fork, use, and improve this project 