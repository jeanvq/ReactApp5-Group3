# Task & Study Planner — Team Guide

## Team

| Name | Role | What to build |
|------|------|---------------|
| Gurinder | Setup + lead | Project scaffold, App.tsx, types, integration |
| Ahmad | TaskForm | Add task form component |
| Ken | TaskList + TaskItem | Task list and individual task cards |
| Jean | FilterBar + localStorage | Filter dropdowns, search, localStorage hook |

---

## Tech Stack

- React 19 + TypeScript (Vite)
- Bootstrap 5 for styling
- localStorage for data persistence

---

## Setup

```
cd final
npm install
npm run dev
```

App runs at http://localhost:5173

---

## Folder Structure

```
src/
  models/
    types.ts                <- DONE (Gurinder) - shared types
  components/
    TaskForm.tsx             <- TODO-AHMAD
    TaskList.tsx             <- TODO-KEN
    TaskItem.tsx             <- TODO-KEN
    FilterBar.tsx            <- TODO-JEAN
  hooks/
    useLocalStorage.ts       <- TODO-JEAN
  data/
    sampleTasks.ts           <- add starter tasks here when needed
  App.tsx                    <- Gurinder - main state + wiring
  main.tsx                   <- DONE - entry point
```

---

## App Layout (ASCII)

```
┌─────────────────────────────────────────────────────┐
│             Task & Study Planner                    │
│     track assignments, deadlines and priorities     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─── TaskForm (AHMAD) ──────────────────────────┐  │
│  │                                               │  │
│  │  Title: [__________________]                  │  │
│  │  Due:   [2026-05-15]  Priority: [High ▼]      │  │
│  │  Category: [Homework ▼]     [ + Add Task ]    │  │
│  │                                               │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  ┌─── FilterBar (JEAN) ─────────────────────────┐   │
│  │  Status: [All ▼]  Priority: [All ▼]  [____]  │   │
│  └───────────────────────────────────────────────┘   │
│                                                     │
│  ┌─── Stats (App.tsx - Gurinder) ────────────────┐  │
│  │  Total: 8   Pending: 5   Done: 3   Overdue: 1│  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  ┌─── TaskList (KEN) ───────────────────────────┐   │
│  │                                              │   │
│  │  ┌─ TaskItem (KEN) ────────────────────────┐ │   │
│  │  │ ○  Math Assignment    May 12  🔴 HIGH   │ │   │
│  │  │    Homework              [Delete]       │ │   │
│  │  └─────────────────────────────────────────┘ │   │
│  │                                              │   │
│  │  ┌─ TaskItem ──────────────────────────────┐ │   │
│  │  │ ○  React A5 Project   May 14  🟡 MED    │ │   │
│  │  │    Project               [Delete]       │ │   │
│  │  └─────────────────────────────────────────┘ │   │
│  │                                              │   │
│  │  ┌─ TaskItem ──────────────────────────────┐ │   │
│  │  │ ✓  Read Chapter 12    May 10  🟢 LOW    │ │   │
│  │  │    Reading  (strikethrough)   [Delete]  │ │   │
│  │  └─────────────────────────────────────────┘ │   │
│  │                                              │   │
│  └──────────────────────────────────────────────┘   │
│                                                     │
│        Built with React + TypeScript + Bootstrap    │
└─────────────────────────────────────────────────────┘
```

---

## Data Flow

```
App.tsx (owns tasks[] state + filters state)
  │
  ├── TaskForm (Ahmad)
  │     user fills form, clicks Add
  │     calls props.onAddTask(newTask)
  │     App.tsx adds it to tasks[]
  │
  ├── FilterBar (Jean)
  │     user changes dropdown or types in search
  │     calls props.onFilterChange(newFilters)
  │     App.tsx updates filter state
  │     App.tsx re-filters tasks[] and passes to TaskList
  │
  └── TaskList (Ken)
        receives filtered tasks[]
        maps over them, renders TaskItem for each
        │
        └── TaskItem (Ken)
              checkbox → calls props.onComplete(id)
              delete btn → calls props.onDelete(id)
              App.tsx updates tasks[]
```

---

## Task Type (already in models/types.ts)

```typescript
type Task = {
    id: string;
    title: string;
    dueDate: string;
    priority: "high" | "medium" | "low";
    category: string;
    completed: boolean;
    createdAt: string;
};

type Filters = {
    status: "all" | "pending" | "completed" | "overdue";
    priority: "all" | "high" | "medium" | "low";
    search: string;
};
```

---

## Component Specs

### TODO-AHMAD: TaskForm.tsx

**File:** `src/components/TaskForm.tsx`

**Props:**
```typescript
type TaskFormProps = {
    onAddTask: (task: Task) => void;
};
```

**What to build:**
- Bootstrap card with form inside
- Inputs: title (text), due date (date), priority (select: high/medium/low), category (select: Homework/Project/Study/Reading/Other)
- Submit button calls `onAddTask` with a new Task object
- Use `crypto.randomUUID()` for the task id
- Clear the form after adding
- Use `useState` for each field

---

### TODO-KEN: TaskList.tsx

**File:** `src/components/TaskList.tsx`

**Props:**
```typescript
type TaskListProps = {
    tasks: Task[];
    onComplete: (id: string) => void;
    onDelete: (id: string) => void;
};
```

**What to build:**
- If tasks is empty, show "No tasks found" message
- Otherwise map over tasks and render a `<TaskItem>` for each
- Pass task + onComplete + onDelete to each TaskItem

---

### TODO-KEN: TaskItem.tsx

**File:** `src/components/TaskItem.tsx`

**Props:**
```typescript
type TaskItemProps = {
    task: Task;
    onComplete: (id: string) => void;
    onDelete: (id: string) => void;
};
```

**What to build:**
- Bootstrap card showing one task
- Checkbox that calls `onComplete(task.id)` when clicked
- Title with strikethrough if `task.completed === true`
- Due date and category text
- Priority badge: high = `bg-danger`, medium = `bg-warning`, low = `bg-success`
- If overdue (past due date + not completed) show red text
- Delete button that calls `onDelete(task.id)`

---

### TODO-JEAN: FilterBar.tsx

**File:** `src/components/FilterBar.tsx`

**Props:**
```typescript
type FilterBarProps = {
    filters: Filters;
    onFilterChange: (filters: Filters) => void;
};
```

**What to build:**
- Bootstrap card with a row of filter controls
- Status dropdown: All / Pending / Completed / Overdue
- Priority dropdown: All / High / Medium / Low
- Search text input to filter by title
- When any control changes, call `onFilterChange` with the updated filters object

---

### TODO-JEAN: useLocalStorage.ts

**File:** `src/hooks/useLocalStorage.ts`

**What to build:**
- Custom hook that works like useState but saves to localStorage
- Usage: `const [tasks, setTasks] = useLocalStorage("tasks", defaultTasks)`
- On first render, load from localStorage (if exists) or use default
- On every change, save to localStorage
- Use `useEffect` to sync

---

## Priority Badge Colors

| Priority | Bootstrap Class | Color |
|----------|----------------|-------|
| high | `bg-danger` | red |
| medium | `bg-warning text-dark` | yellow |
| low | `bg-success` | green |

---

## Git Workflow

1. Clone the repo
2. Create your own branch: `git checkout -b ahmad-taskform`
3. Build your component in the right file
4. Commit with clear messages: `git commit -m "add TaskForm component"`
5. Push and create a pull request
6. Gurinder merges and wires into App.tsx

---

## Submission Checklist

- [ ] App runs without errors
- [ ] All components work together
- [ ] README updated
- [ ] Demo video recorded (1-2 min per person)
- [ ] TeamReflection-yourname.md written
- [ ] AIReflection-yourname.md written
- [ ] Repo link sent to Louise
