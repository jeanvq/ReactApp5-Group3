// src/models/types.ts
// task type used across the whole app

export type Task = {
    id: string;
    title: string;
    dueDate: string;
    priority: "high" | "medium" | "low";
    category: string;
    completed: boolean;
    createdAt: string;
};

// filter state type used by FilterBar and App
export type Filters = {
    status: "all" | "pending" | "completed" | "overdue";
    priority: "all" | "high" | "medium" | "low";
    search: string;
};
