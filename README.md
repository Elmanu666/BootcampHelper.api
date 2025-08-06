# BootcampHelper API

BootcampHelper API is an Express and MongoDB based backend for a bootcamp training assistant.  It exposes REST endpoints for managing users, sessions, materials and other training resources.

## Prerequisites

- [Node.js](https://nodejs.org/) and npm
- A running [MongoDB](https://www.mongodb.com/) instance

## Installation

```bash
npm install
```

### Environment

This project relies on a few environment variables for database and CORS configuration.  You can provide them in a `.env` file at the project root.

| Variable | Description |
| --- | --- |
| `MONGOODBURL` | MongoDB host and port (default `localhost:27017`). |
| `DBUSER` | Username used when connecting to MongoDB. |
| `DBPSW` | Password for the MongoDB user. |
| `CORSORIGINE`, `CORSORIGINE2` | Additional CORS origins allowed by the API. |

## Running

Start the API in development mode:

```bash
npm start
```

The server listens on the port defined in `bin/www` (default `3000`).  It mounts all REST endpoints under the `/api` path.

## API Overview

| Resource | Base path | Description |
| --- | --- | --- |
| Users | `/api/user` or `/api/users` | User registration, authentication and profile management. |
| Sessions | `/api/sessions` | CRUD operations for training sessions. |
| Session | `/api/session/:id` | Retrieve a single session by id. |
| Rounds | `/api/rounds` | Manage rounds of exercises inside sessions. |
| Exercises | `/api/exercises` | Manage exercises definitions. |
| Materials | `/api/materials` | Manage materials used for training. |
| Material types | `/api/materialTypes` | Lookup for material categories. |
| Files | `/api/files` | Manage uploaded files. |
| Calories burnt | `/api/caloriesBurnt` | CRUD operations for calorie tracking. |
| Sports | `/api/sports` | Retrieve sports information. |

Each resource generally supports standard REST methods:

- `GET /resource` – list entities
- `GET /resource/:id` – get a specific entity
- `POST /resource` – create a new entity
- `PUT /resource/:id` – update an entity
- `DELETE /resource/:id` – remove an entity

Some resources provide additional endpoints:

- `POST /api/user/signup` – create a user account
- `POST /api/user/login` and `POST /api/user/signin` – authenticate and obtain a token
- `POST /api/caloriesBurnt/several` – create multiple calorie entries

## Project Structure

```
controllers/   → Request handlers
models/        → Mongoose models
routes/        → Express routes
services/      → Miscellaneous helpers
```

## Testing

Currently there are no automated tests.  The default `npm test` command launches the server with `nodemon` for manual verification.

## License

This project is provided as-is for educational purposes.
