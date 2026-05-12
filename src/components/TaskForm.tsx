import { useState } from "react";
import { Task } from "../models/types";

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
    <div className="task-form-container">
      <h2>Add New Task</h2>

      <form onSubmit={handleSubmit}>
        {/* task title input */}
        <div>
          <label>Task Title</label>
          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* due date input */}
        <div>
          <label>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        {/* priority dropdown */}
        <div>
          <label>Priority</label>

          <select
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
        <div>
          <label>Category</label>

          <input
            type="text"
            placeholder="Homework, Exam, Study..."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        {/* submit button */}
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default TaskForm;