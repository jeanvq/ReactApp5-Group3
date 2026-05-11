// src/App.tsx
// main app - Gurinder (setup)
// will hold task state and pass props to child components
// teammates build their components, we wire them together here

export default function App() {
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

            {/* TODO-JEAN: FilterBar component goes here */}
            <div className="card shadow-sm mb-4">
                <div className="card-body text-muted">FilterBar placeholder - Jean</div>
            </div>

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
