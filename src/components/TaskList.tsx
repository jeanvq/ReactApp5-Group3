// src/components/TaskList.tsx
// renders the list of tasks using TaskItem
// shows empty message if no tasks match filters

import type { Task } from "../models/types.ts";
import TaskItem from "./TaskItem.tsx";

type TaskListProps = {
    tasks: Task[];
    onComplete: (id: string) => void;
    onDelete: (id: string) => void;
};

export default function TaskList({ tasks, onComplete, onDelete }: TaskListProps) {
    // empty state
    if (tasks.length === 0) {
        return (
            <div className="card shadow-sm">
                <div className="card-body text-center py-5">
                    <p style={{ color: "#94a3b8", margin: 0 }}>
                        No tasks found. Add one above or change your filters.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onComplete={onComplete}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
