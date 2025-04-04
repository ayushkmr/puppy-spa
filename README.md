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

### Frontend Setup
```bash
# From the project root
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
# From the project root
cd backend
npm install
npm run start:dev
```

### Database Setup
```bash
# Create PostgreSQL database
createdb puppy_spa

# The application will handle migrations on startup
```

## Project Structure

```
puppy-spa/
├── frontend/               # Next.js application
│   ├── components/         # React components
│   ├── pages/              # Next.js pages
│   ├── styles/             # CSS styles
│   └── lib/                # Utilities and hooks
│
├── backend/                # NestJS application
│   ├── src/
│   │   ├── waiting-list/   # Waiting list module
│   │   ├── common/         # Shared utilities
│   │   └── main.ts         # Application entry point
│   └── test/               # Test files
│
└── docs/                   # Documentation
    ├── PLANNING.md         # System design document
    └── TASKS.md            # Implementation tasks
```

## Feature Roadmap

- [ ] Backend API development
- [ ] Frontend UI implementation
- [ ] Database integration
- [ ] Deployment configuration

## Contributing

1. Clone the repository
2. Create a feature branch
3. Submit a pull request 