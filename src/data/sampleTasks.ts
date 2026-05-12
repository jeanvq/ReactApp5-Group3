// src/data/sampleTasks.ts
// starter tasks so the app isnt empty on first load

import type { Task } from "../models/types.ts";

export const sampleTasks: Task[] = [
    {
        id: "1",
        title: "Math Assignment - Chapter 9",
        dueDate: "2026-05-13",
        priority: "high",
        category: "Homework",
        completed: false,
        createdAt: "2026-05-10",
    },
    {
        id: "2",
        title: "React A5 Group Project",
        dueDate: "2026-05-15",
        priority: "high",
        category: "Project",
        completed: false,
        createdAt: "2026-05-11",
    },
    {
        id: "3",
        title: "Read Chapter 12 - Testing",
        dueDate: "2026-05-10",
        priority: "low",
        category: "Reading",
        completed: true,
        createdAt: "2026-05-09",
    },
    {
        id: "4",
        title: "Capstone README and video",
        dueDate: "2026-05-15",
        priority: "high",
        category: "Project",
        completed: false,
        createdAt: "2026-05-08",
    },
    {
        id: "5",
        title: "Review Angular notes",
        dueDate: "2026-05-14",
        priority: "medium",
        category: "Study",
        completed: false,
        createdAt: "2026-05-10",
    },
    {
        id: "6",
        title: "PHP quiz prep",
        dueDate: "2026-05-09",
        priority: "medium",
        category: "Study",
        completed: true,
        createdAt: "2026-05-07",
    },
];
