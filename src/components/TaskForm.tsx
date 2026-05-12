import { useState } from "react";
import type { Task } from "../models/types.ts";

// props received from App component
type TaskFormProps = {
  onAddTask: (task: Task) => void;
};

function TaskForm({ onAddTask }: TaskFormProps) {
  // form state
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">(
    "medium"
  );
  const [category, setCategory] = useState("");

  // handles form submit
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // simple validation
    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }

    // new task object
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      dueDate,
      priority,
      category,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    // send task to parent component
    onAddTask(newTask);

    // clear form after submit
    setTitle("");
    setDueDate("");
    setPriority("medium");
    setCategory("");
  }

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Add New Task</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* task title input */}
            <div className="col-md-6">
              <label className="form-label">Task Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* due date input */}
            <div className="col-md-6">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                className="form-control"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            {/* priority dropdown */}
            <div className="col-md-4">
              <label className="form-label">Priority</label>
              <select
                className="form-select"
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as "low" | "medium" | "high")
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* category input */}
            <div className="col-md-4">
              <label className="form-label">Category</label>
              <input
                type="text"
                className="form-control"
                placeholder="Homework, Exam, Study..."
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            {/* submit button */}
            <div className="col-md-4 d-flex align-items-end">
              <button type="submit" className="btn btn-success w-100">
                + Add Task
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;