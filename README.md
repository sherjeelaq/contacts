# Contacts

A full-stack contacts application built using Next.js, React, TypeScript, Node.js, Express, Mongoose and other technologies.

## Prerequisites

- Node.js
- npm or yarn
- MongoDB

## Commands

### Backend

#### Before running the project

- Copy `.env.example` file located in `backend/` and rename it to ``.env``.
- In the `.env` file, set the PORT and MONGO_DB_URL. For local environment, its usually,

```bash
PORT=4000
MONGO_DB_URL=mongodb://localhost:27017/contacts
```

#### To run the project

```bash
# using npm
cd backend
npm install
npm run dev


# using yarn
cd backend
yarn
yarn dev
```

### Frontend

#### Before running the project

- Open `env.ts` located in `frontend/src/lib/` and change the API_URL to the backend url (If running locally then its usually http://localhost:4000/api).

```typescript
//example env.ts file for local environment
export const ENV = {
  API_URL: 'http://localhost:4000/api'
}
```

#### To run the project

```bash
cd frontend

# using npm
npm install
npm run dev


# using yarn
yarn
yarn dev
```

#### To run end-to-end tests

```bash
cd frontend

# using npm
npm run cy:e2e

# using yarn
yarn cy:e2e
```
