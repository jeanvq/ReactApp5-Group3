// src/components/TaskItem.tsx
// single task card with checkbox, title, due date, priority badge and delete
// strikethrough on title when completed
// red text if overdue (past due and not done)

import type { Task } from "../models/types.ts";

type TaskItemProps = {
    task: Task;
    onComplete: (id: string) => void;
    onDelete: (id: string) => void;
};

// returns the right bootstrap badge class for each priority
function getPriorityBadge(priority: string) {
    if (priority === "high") return "bg-danger";
    if (priority === "medium") return "bg-warning text-dark";
    return "bg-success";
}

// check if a task is past its due date and not done yet
function isOverdue(task: Task) {
    if (task.completed) return false;
    const due = new Date(task.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return due < today;
}

export default function TaskItem({ task, onComplete, onDelete }: TaskItemProps) {
    const overdue = isOverdue(task);

    return (
        <div className={`card mb-2 ${task.completed ? "opacity-50" : ""} ${overdue ? "border-danger" : ""}`}>
            <div className="card-body d-flex justify-content-between align-items-center py-2 px-3">
                {/* left side - checkbox and task info */}
                <div className="d-flex align-items-center gap-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        checked={task.completed}
                        onChange={() => onComplete(task.id)}
                        style={{ width: 20, height: 20 }}
                    />

                    <div>
                        {/* title with strikethrough if done */}
                        <div style={{
                            fontWeight: 500,
                            textDecoration: task.completed ? "line-through" : "none",
                            color: task.completed ? "#94a3b8" : "#1e293b",
                        }}>
                            {task.title}
                        </div>
                        {/* due date and category */}
                        <small style={{ color: overdue ? "#ef4444" : "#64748b" }}>
                            {overdue && "OVERDUE - "}
                            Due: {task.dueDate} | {task.category}
                        </small>
                    </div>
                </div>

                {/* right side - badge and delete */}
                <div className="d-flex align-items-center gap-2">
                    <span className={`badge ${getPriorityBadge(task.priority)}`}
                        style={{ fontSize: 11 }}>
                        {task.priority}
                    </span>
                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onDelete(task.id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
