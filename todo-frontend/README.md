# Todo Frontend

A Vue 3 frontend application for managing todos, built with TypeScript and Vite. Connects to a backend API to perform CRUD operations on todos.

## Features

- Add new todos
- Mark todos as complete/incomplete
- Delete todos
- Responsive design with Tailwind CSS
- Icons from Lucide

## Prerequisites

- Node.js (or Bun)
- Backend API running on `http://localhost:3000`

## Installation

Install dependencies:

```bash
npm install
# or
bun install
```

## Development

Start the development server:

```bash
npm run dev
# or
bun run dev
```

The app will be available at `http://localhost:5173`.

## Build

Build for production:

```bash
npm run build
# or
bun run build
```

## Preview

Preview the production build:

```bash
npm run preview
# or
bun run preview
```

## Technologies

- [Vue 3](https://vuejs.org/) - Progressive JavaScript framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide Vue Next](https://lucide.dev/) - Icon library

## Project Structure

```
src/
├── App.vue          # Main application component
├── main.ts          # Application entry point
├── style.css        # Global styles
├── components/      # Vue components
└── assets/          # Static assets
```

## API Integration

The frontend communicates with the backend API at `http://localhost:3000/todos`. Ensure the backend is running before starting the frontend.
