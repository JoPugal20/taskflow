import React from "react";

const TaskList = ({ tasks, onToggleComplete, onEdit, onDelete }) => {
  if (!tasks || tasks.length === 0) return <div className="card">No tasks yet.</div>;

  return (
    <div className="card">
      {tasks.map(task => (
        <div className="task" key={task._id}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div className={task.completed ? "completed" : ""}><strong>{task.title}</strong></div>
                <div className="small">{task.description}</div>
              </div>
              <div className="small">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ""}</div>
            </div>
            <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <div className={task.priority === "High" ? "priority-high" : (task.priority === "Normal" ? "priority-normal" : "priority-low")}>
                {task.priority}
              </div>
              <div className="small">Created: {new Date(task.createdAt).toLocaleString()}</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <button className="btn" onClick={()=>onToggleComplete(task)}>{task.completed ? "Undo" : "Done"}</button>
            <button className="btn secondary" onClick={()=>onEdit(task)}>Edit</button>
            <button className="btn secondary" onClick={()=>onDelete(task._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
