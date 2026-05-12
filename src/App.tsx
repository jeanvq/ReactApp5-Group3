// src/App.tsx
import { useState } from "react";
import type { Filters } from "./models/types.ts";
import FilterBar from "./components/FilterBar.tsx";
import useLocalStorage from "./hooks/useLocalStorage.ts";

const defaultFilters: Filters = {
    status: "all",
    priority: "all",
    search: "",
};

export default function App() {
    const [tasks, setTasks] = useLocalStorage("tasks", []);
    const [filters, setFilters] = useState<Filters>(defaultFilters);

    return (
        <div className="container py-4" style={{ maxWidth: 900 }}>
            <div className="text-center mb-4">
                <h1 className="fw-bold">Task & Study Planner</h1>
                <p className="text-muted">track assignments, deadlines and priorities</p>
            </div>

            {/* TODO-AHMAD: TaskForm component goes here */}
            <div className="card shadow-sm mb-4">
                <div className="card-body text-muted">TaskForm placeholder - Ahmad</div>
            </div>

            {/* TODO-JEAN: FilterBar */}
            <FilterBar filters={filters} onFilterChange={setFilters} />

            {/* TODO-KEN: TaskList + TaskItem components go here */}
            <div className="card shadow-sm">
                <div className="card-body text-muted">TaskList placeholder - Ken</div>
            </div>

            <div className="text-center mt-4">
                <small className="text-muted">Built with React + TypeScript + Bootstrap</small>
            </div>
        </div>
    );
}
