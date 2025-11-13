import React, { useState, useEffect } from "react";

const TaskForm = ({ onSubmit, editingTask, onCancel }) => {
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [priority,setPriority]=useState("Normal");
  const [dueDate,setDueDate]=useState("");

  useEffect(()=>{
    if (editingTask) {
      setTitle(editingTask.title || "");
      setDescription(editingTask.description || "");
      setPriority(editingTask.priority || "Normal");
      setDueDate(editingTask.dueDate ? editingTask.dueDate.split("T")[0] : "");
    } else {
      setTitle(""); setDescription(""); setPriority("Normal"); setDueDate("");
    }
  },[editingTask]);

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, priority, dueDate: dueDate || null });
    // clear handled by parent if needed
  };

  return (
    <div className="card" style={{ marginBottom: "1rem" }}>
      <form onSubmit={submit}>
        <input className="input" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
        <input className="input" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <select className="input" value={priority} onChange={e=>setPriority(e.target.value)} style={{ maxWidth: 160 }}>
            <option>Low</option>
            <option>Normal</option>
            <option>High</option>
          </select>
          <input className="input" type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} style={{ maxWidth: 200 }} />
        </div>

        <div style={{ marginTop: "0.5rem" }}>
          <button className="btn" type="submit">{editingTask ? "Update Task" : "Add Task"}</button>
          {editingTask && <button type="button" className="btn secondary" onClick={onCancel} style={{ marginLeft: "0.5rem" }}>Cancel</button>}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
