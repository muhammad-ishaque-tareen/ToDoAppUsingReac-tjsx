import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const loggedUser = JSON.parse(localStorage.getItem("LoggedInUser"));

  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("userTodos")) || {};
    if (loggedUser && storedTodos[loggedUser.username]) {
      setTodos(storedTodos[loggedUser.username]);
    }
  }, [loggedUser]);

  const saveToStorage = (newTodos) => {
    const storedTodos = JSON.parse(localStorage.getItem("userTodos")) || {};
    storedTodos[loggedUser.username] = newTodos;
    localStorage.setItem("userTodos", JSON.stringify(storedTodos));
  };

  const handleAdd = () => {
    if (!task.trim()) return;
    const updatedTodos = [...todos, task];
    setTodos(updatedTodos);
    saveToStorage(updatedTodos);
    setTask("");
  };

const handleSearch = () => {
  if (!search.trim()) return;
  navigate(`/search/${search.trim()}`);
};
  const handleLogout = () => {
    localStorage.removeItem("LoggedInUser");
    navigate("/");
  };

  return (
    <div className="dashboard-wrapper">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      <div className="dashboard-container">
        <div className="user-info">
          <h2>
            <span style={{ color: "green" }}>Welcome,</span>{" "}
            <span style={{ color: "lightblue" }}>
              {loggedUser?.firstname} {loggedUser?.secondname}
            </span>
          </h2>
          <p>Email: {loggedUser?.email}</p>
        </div>

        {/* Add Task Section */}
        <div className="input-row">
          <input
            type="text"
            placeholder="Enter your task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className="btn green" onClick={handleAdd}>
            Add
          </button>
        </div>

        {/* Search Section */}
        <div className="input-row">
          <input
            type="text"
            placeholder="Search todo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn green" onClick={handleSearch}>
            Search
          </button>
        </div>

        {/* Todo List Section */}
        <div className="todo-box">
          <h3>Your Tasks</h3>
          <div className="todo-list">
            {todos.length > 0 ? (
              todos.map((todo, idx) => (
                <div className="todo-item" key={idx}>
                  {todo}
                </div>
              ))
            ) : (
              <p className="no-todo">No todos added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
