import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { fetchTasks, createTask, updateTask, deleteTask } from "../services/api";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    if (!user) return navigate("/login");
    loadTasks();
  }, [navigate]);

  const loadTasks = async () => {
    try {
      const { data } = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("userInfo");
        navigate("/login");
      }
    }
  };

  const handleCreateOrUpdate = async (taskData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask._id, taskData);
        setEditingTask(null);
      } else {
        await createTask(taskData);
      }
      loadTasks();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await updateTask(task._id, { completed: !task.completed });
      loadTasks();
    } catch (err) { setError(err.message); }
  };

  const handleEdit = (task) => setEditingTask(task);
  const handleCancelEdit = () => setEditingTask(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete task?")) return;
    try {
      await deleteTask(id);
      loadTasks();
    } catch (err) { setError(err.message); }
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div>
      <div className="header">
        <h2>Dashboard</h2>
        <div>
          <button className="btn" onClick={loadTasks}>Refresh</button>
          <button className="btn secondary" onClick={logout} style={{ marginLeft: "0.5rem" }}>Logout</button>
        </div>
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}

      <TaskForm onSubmit={handleCreateOrUpdate} editingTask={editingTask} onCancel={handleCancelEdit} />

      <TaskList tasks={tasks} onToggleComplete={handleToggleComplete} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Dashboard;
