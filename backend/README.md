# CodeForces Clone Backend

This is the backend server for the CodeForces clone application. It provides APIs for user authentication, problem management, and code submissions.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up your environment variables by creating a `.env` file:
```
DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"
PORT=3000
```

3. Run Prisma migrations:
```bash
npx prisma migrate dev
```

## Development

To start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/signup` - Create a new user account
- POST `/api/auth/signin` - Sign in to existing account

### Problems
- GET `/api/problems` - Get all problems
- GET `/api/problems/:slug` - Get a specific problem by slug
- POST `/api/problems` - Create a new problem

### Submissions
- POST `/api/submissions` - Create a new submission
- GET `/api/submissions/user/:userId` - Get all submissions for a user

## Building for Production

To build the project:
```bash
npm run build
```

To start the production server:
```bash
npm start
```
