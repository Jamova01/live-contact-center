# Agents & Clients Management Dashboard

## Project Overview

This project is a web application built with **Next.js** for a contact center, designed to display and manage information about agents and clients in real time. It interacts with a **.NET backend** via a RESTful API and utilizes **WebSockets** for live updates.

The application implements:

- **Zustand** for global state management.
- **Query parameters** for filtering agents by status and clients by wait time.
- **Atomic Design** methodology for structuring reusable UI components.

## Features

- Display a list of **agents** with name, status, and wait time.
- Display a list of **clients** with name and wait time.
- **Filter agents** by status (available, on call, on break, etc.).
- **Filter clients** by wait time.
- **Real-time updates** using WebSockets for changes in agent statuses and client queue movements.
- **Global state management** using Zustand for efficient state handling.
- **Next.js App Router** with **Loading UI and Streaming** for optimized rendering.

## Deployment

You can access the live application at the following link:
🔗 **Live Demo**: [https://live-contact-center.netlify.app/](https://live-contact-center.netlify.app/)

## Installation

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn

### Setup

1. Clone the repository:
   ```sh
   git clone  https://github.com/Jamova01/live-contact-center
   cd live-contact-center
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
  │   ├── atoms/
  │   ├── molecules/
  │   │   ├── AgentCard.tsx
  │   ├── organisms/
  │   │   ├── List.tsx
  ├── store/
  │   ├── useStore.ts
  ├── services/
  │   ├── fetchAgents.ts
  │   ├── fetchClients.ts
  ├── utils/
  │   ├── websocket.ts
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

## WebSocket Implementation

WebSockets are used to dynamically update the UI when:

- An agent changes status (e.g., from available to on call).
- A new client enters or leaves the queue.

## Technologies Used

- **Next.js** - React framework with SSR and App Router.
- **Zustand** - Lightweight global state management.
- **WebSockets** - Real-time updates for agent and client changes.
- **Tailwind CSS** - Styling and responsive design.
- **TypeScript** - Type safety and maintainability.
- **Atomic Design** - Component-based UI architecture.

## Explanation of Development Decisions

### 1. **Component Architecture (Atomic Design)**

- **Atoms:** Basic UI elements (buttons, inputs, status badges).
- **Molecules:** Combinations of atoms, such as `AgentCard`.
- **Organisms:** More complex UI sections, such as `List`.

### 2. **State Management (Zustand)**

- Zustand is used to handle **real-time updates efficiently** without unnecessary re-renders.
- The store keeps the lists of agents and clients in sync with API calls and WebSocket messages.

### 3. **Filtering with Query Params**

- Query parameters in URLs are used for filtering agents by status and clients by wait time.
- This approach allows for direct linking to filtered views.
