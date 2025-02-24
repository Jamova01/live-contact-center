# Agents & Clients Management Dashboard

## Project Overview

This project is a web application built with Next.js, Zustand for state management, and API routes to manage agents and clients. It provides filtering functionality, real-time data updates, and a simple UI for managing agents and clients.

## Features

- Display a list of agents and clients.
- Filter agents based on their status.
- Fetch agents and clients from the API.
- Update agent status and client wait times.
- Zustand-based global state management.

## Deployment

You can access the live application at the following link:
🔗 Live Demo: https://live-contact-center.netlify.app/

## Installation

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn

### Setup

1. Clone the repository:
   ```sh
   git clone <repository_url>
   cd <repository_name>
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```

## Project Structure

```
src/
  ├── app/
  │   ├── (agents)/
  │   │   ├── page.tsx
  │   ├── (clients)/
  │   │   ├── page.tsx
  │   ├── api/
  │   │   ├── agents/
  │   │   │   ├── route.ts
  │   │   ├── clients/
  │   │   │   ├── route.ts
  ├── components/
  │   ├── molecules/
  │   │   ├── AgentCard.tsx
  │   ├── organisms/
  │   │   ├── List.tsx
  ├── store/
  │   ├── useStore.ts
  ├── services/
  │   ├── fetchAgents.ts
  │   ├── fetchClients.ts
```

## API Endpoints

### `GET /api/agents`

Returns a list of available agents.

**Response:**

```json
[
  { "id": 1, "name": "Carlos López", "status": "available", "waitTime": 0 },
  { "id": 2, "name": "María González", "status": "on call", "waitTime": 120 }
]
```

### `GET /api/clients`

Returns a list of available clients.

**Response:**

```json
[
  { "id": 1, "name": "Client A", "waitTime": 3 },
  { "id": 2, "name": "Client B", "waitTime": 8 }
]
```

## Technologies Used

- **Next.js** - Framework for React applications
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety

## License

This project is licensed under the MIT License.
