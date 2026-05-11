# Task & Study Planner

A React web application for students to track assignments, deadlines and priorities. Built as a team sprint project.

## Features

- Add tasks with title, due date, priority and category
- View tasks in a list with color-coded priority badges
- Mark tasks as complete (strikethrough)
- Delete tasks
- Filter by status (all, pending, completed, overdue)
- Filter by priority (all, high, medium, low)
- Search tasks by title
- Data persists in localStorage across page refreshes

## Tech Stack

- React 19
- TypeScript
- Vite
- Bootstrap 5

## Team

| Name | Role |
|------|------|
| Gurinder Saini | Project setup, App.tsx, state management, integration |
| Ahmad Wahidi | TaskForm component |
| Kenneth Plumstead | TaskList and TaskItem components |
| Jeancarlo Ricardo | FilterBar, localStorage hook, testing |

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```
git clone https://github.com/gurinder1996/ReactApp5-Group3.git
cd ReactApp5-Group3
npm install
```

### Run Development Server

```
npm run dev
```

Open your browser at http://localhost:5173

### Build

```
npm run build
```

## Project Structure

```
src/
  models/
    types.ts               - Task and Filters type definitions
  components/
    TaskForm.tsx            - add task form (Ahmad)
    TaskList.tsx            - renders list of tasks (Ken)
    TaskItem.tsx            - single task card (Ken)
    FilterBar.tsx           - filter dropdowns and search (Jean)
  hooks/
    useLocalStorage.ts      - custom hook for localStorage (Jean)
  data/
    sampleTasks.ts          - starter tasks for first load
  App.tsx                   - main component, state and wiring (Gurinder)
  main.tsx                  - entry point
```

## Screenshots

(add screenshots here after app is complete)
