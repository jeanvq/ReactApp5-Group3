// src/App.tsx 
// Gurinder - main app, wires all components together 
// holds task state and filter state
// passes handlers down to TaskForm, FilterBar, TaskList

import { useState } from "react";
import type { Task, Filters } from "./models/types.ts";
import { sampleTasks } from "./data/sampleTasks.ts";
import useLocalStorage from "./hooks/useLocalStorage.ts";
import TaskForm from "./components/TaskForm.tsx";
import FilterBar from "./components/FilterBar.tsx";
import TaskList from "./components/TaskList.tsx";

const defaultFilters: Filters = {
    status: "all",
    priority: "all",
    search: "",
};

export default function App() {
    // task data saved in localStorage so it survives refresh
    const [tasks, setTasks] = useLocalStorage<Task[]>("taskplanner_tasks", sampleTasks);

    // filter state
    const [filters, setFilters] = useState<Filters>(defaultFilters);

    // add new task from the form
    function handleAddTask(task: Task) {
        setTasks([task, ...tasks]);
    }

    // toggle completed on a task
    function handleComplete(id: string) {
        setTasks(tasks.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        ));
    }

    // remove a task
    function handleDelete(id: string) {
        setTasks(tasks.filter(t => t.id !== id));
    }

    // filter tasks based on current filters
    const filteredTasks = tasks.filter(task => {
        // search by title
        const matchesSearch = task.title
            .toLowerCase()
            .includes(filters.search.toLowerCase());

        // status filter
        let matchesStatus = true;
        if (filters.status === "pending") matchesStatus = !task.completed;
        if (filters.status === "completed") matchesStatus = task.completed;
        if (filters.status === "overdue") {
            matchesStatus = !task.completed && new Date(task.dueDate) < new Date();
        }

        // priority filter
        const matchesPriority =
            filters.priority === "all" || task.priority === filters.priority;

        return matchesSearch && matchesStatus && matchesPriority;
    });

    // stats for the counter row
    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(t => !t.completed).length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const overdueTasks = tasks.filter(t =>
        !t.completed && new Date(t.dueDate) < new Date()
    ).length;

    return (
        <div className="container py-4" style={{ maxWidth: 900 }}>
            {/* header */}
            <div className="text-center mb-4">
                <h1 className="fw-bold">Task & Study Planner</h1>
                <p className="text-muted">track assignments, deadlines and priorities</p>
            </div>

            {/* ahmad's form */}
            <TaskForm onAddTask={handleAddTask} />

            {/* jean's filter bar */}
            <FilterBar filters={filters} onFilterChange={setFilters} />

            {/* stats row */}
            <div className="row g-3 mb-4">
                <div className="col-3">
                    <div className="card text-center shadow-sm">
                        <div className="card-body py-2">
                            <div className="fw-bold fs-4">{totalTasks}</div>
                            <small className="text-muted">Total</small>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card text-center shadow-sm">
                        <div className="card-body py-2">
                            <div className="fw-bold fs-4 text-primary">{pendingTasks}</div>
                            <small className="text-muted">Pending</small>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card text-center shadow-sm">
                        <div className="card-body py-2">
                            <div className="fw-bold fs-4 text-success">{completedTasks}</div>
                            <small className="text-muted">Done</small>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card text-center shadow-sm">
                        <div className="card-body py-2">
                            <div className="fw-bold fs-4 text-danger">{overdueTasks}</div>
                            <small className="text-muted">Overdue</small>
                        </div>
                    </div>
                </div>
            </div>

            {/* ken's task list */}
            <TaskList
                tasks={filteredTasks}
                onComplete={handleComplete}
                onDelete={handleDelete}
            />

            {/* footer */}
            <div className="text-center mt-4">
                <small className="text-muted">Built with React + TypeScript + Bootstrap</small>
            </div>
        </div>
    );
}
