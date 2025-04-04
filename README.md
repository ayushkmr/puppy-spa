# Puppy Spa Waiting List App

A modern digital solution for Puppy Spa to manage their daily client waiting lists. This application replaces the traditional physical logbook with an intuitive web interface, allowing receptionists to efficiently track and manage puppies waiting for grooming services.

## Project Overview

Puppy Spa operates as a walk-in-only service. This app helps manage:
- Daily waiting lists
- Client entry order
- Service status tracking
- List reordering when clients miss their turn
- Historical data viewing and searching

## Tech Stack

### Frontend
- Next.js with TypeScript
- Tailwind CSS for styling
- React Query for data fetching
- React DnD for drag-and-drop functionality

### Backend
- NestJS with TypeScript
- PostgreSQL database
- TypeORM for database interaction
- Class-validator for input validation

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL

### Database Setup
```bash
# Create PostgreSQL database
createdb puppy_spa

# Configure database connection in backend/.env file
```

### Backend Setup
```bash
# Navigate to the backend directory
cd puppy-spa/backend

# Install dependencies
npm install

# Create .env file with database configuration
# (Use the example below or copy from backend/.env.example)

# Start the development server
npm run start:dev
```

Example `.env` file:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=puppy_spa
PORT=3001
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

The API will be running at http://localhost:3001/api with endpoints including:
- GET /api/health - API health check
- GET /api/waiting-lists/today - Get today's waiting list
- GET /api/waiting-lists - Get all waiting lists
- POST /api/waiting-lists/:waitingListId/entries - Add a puppy to a waiting list

### Frontend Setup
```bash
# Navigate to the frontend directory
cd puppy-spa/frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be running at http://localhost:3000

## Project Structure

```
puppy-spa/
├── frontend/               # Next.js application
│   ├── src/
│   │   ├── app/            # Next.js app directory
│   │   ├── components/     # React components
│   │   └── lib/            # Utilities and hooks
│   └── public/             # Static assets
│
├── backend/                # NestJS application
│   ├── src/
│   │   ├── waiting-list/           # Waiting list module
│   │   ├── waiting-list-entry/     # Waiting list entry module
│   │   └── main.ts                 # Application entry point
│   └── test/               # Test files
```

## API Endpoints

### Waiting Lists

- `GET /api/waiting-lists` - Get all waiting lists
- `GET /api/waiting-lists/today` - Get today's waiting list
- `GET /api/waiting-lists/:id` - Get a specific waiting list
- `GET /api/waiting-lists/by-date` - Get a waiting list by date
- `POST /api/waiting-lists` - Create a new waiting list

### Waiting List Entries

- `GET /api/waiting-lists/:waitingListId/entries` - Get all entries for a waiting list
- `GET /api/waiting-lists/:waitingListId/entries/:id` - Get a specific entry
- `POST /api/waiting-lists/:waitingListId/entries` - Add a new entry to a waiting list
- `PUT /api/waiting-lists/:waitingListId/entries/:id/position` - Update an entry's position
- `PUT /api/waiting-lists/:waitingListId/entries/:id/service` - Mark an entry as serviced
- `DELETE /api/waiting-lists/:waitingListId/entries/:id` - Remove an entry

### Search

- `GET /api/entries/search?q=query` - Search for entries by owner name or puppy name

## Development Guidelines

- Use conventional commit messages: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`
- Follow TypeScript best practices with proper typing
- Implement robust error handling
- Create reusable components and utilities
- Maintain proper documentation

## Feature Roadmap

- [ ] Backend API development
- [ ] Frontend UI implementation
- [ ] Database integration
- [ ] Deployment configuration

## Contributing

1. Clone the repository
2. Create a feature branch
3. Submit a pull request 