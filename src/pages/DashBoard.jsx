import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const loggedUser = JSON.parse(localStorage.getItem("LoggedInUser"));

  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [goal, setGoal] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [expandedTodoId, setExpandedTodoId] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Load todos on mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("userTodos")) || {};
    if (loggedUser && storedTodos[loggedUser.username]) {
      const userTodos = storedTodos[loggedUser.username];
      setTodos(userTodos);
      setFilteredTodos(userTodos);
    }
  }, [loggedUser]);

  // Save to localStorage
  const saveToStorage = (newTodos) => {
    const stored = JSON.parse(localStorage.getItem("userTodos")) || {};
    stored[loggedUser.username] = newTodos;
    localStorage.setItem("userTodos", JSON.stringify(stored));
  };

  // Submit (add/update)
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: editingId || Date.now(),
      title,
      description,
      endDate,
      goal,
    };

    const updatedTodos = editingId
      ? todos.map((todo) => (todo.id === editingId ? newTodo : todo))
      : [...todos, newTodo];

    setTodos(updatedTodos);
    setFilteredTodos(updatedTodos);
    saveToStorage(updatedTodos);

    // Reset form
    setTitle("");
    setDescription("");
    setEndDate("");
    setGoal("");
    setEditingId(null);
    setIsSearching(false);
  };

  // Edit existing todo
  const handleEdit = (id) => {
    const selected = todos.find((todo) => todo.id === id);
    if (selected) {
      setTitle(selected.title);
      setDescription(selected.description);
      setEndDate(selected.endDate);
      setGoal(selected.goal);
      setEditingId(id);
    }
  };

  // Delete todo
  const handleDelete = (id) => {
    const updated = todos.filter((todo) => todo.id !== id);
    setTodos(updated);
    setFilteredTodos(updated);
    saveToStorage(updated);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("LoggedInUser");
    navigate("/");
  };

  // Expand/Collapse details
  const toggleTodoDetails = (id) => {
    setExpandedTodoId(expandedTodoId === id ? null : id);
  };

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    const query = title.trim().toLowerCase();
    if (!query) return;

    const matched = todos.filter((todo) =>
      todo.title.toLowerCase().includes(query)
    );
    setFilteredTodos(matched);
    setIsSearching(true);
  };

  // Clear search
  const handleClearSearch = () => {
    setFilteredTodos(todos);
    setIsSearching(false);
  };

  return (
    <div className="dashboard-wrapper">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      <div className="user-info">
        <h2>
          <span style={{ color: "green" }}>Welcome,</span>{" "}
          <span style={{ color: "lightblue" }}>
            {loggedUser?.firstname} {loggedUser?.secondname}
          </span>
        </h2>
        <p>Email: {loggedUser?.email}</p>
      </div>

      <form className="dashboard-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          placeholder="Todo Title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          value={description}
          placeholder="Description..."
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <input
          type="text"
          value={goal}
          placeholder="Goal or Objective"
          onChange={(e) => setGoal(e.target.value)}
        />
        <br />

        <div className="form-buttons">
          <button
            type="button"
            className="search-btn"
            onClick={handleSearch}
          >
            Search
          </button>

          {isSearching && (
            <button
              type="button"
              className="clear-btn"
              onClick={handleClearSearch}
            >
              Clear
            </button>
          )}

          <button type="submit">
            {editingId ? "Update" : "Add"} Todo
          </button>
        </div>
      </form>

      <div className="todo-list-container">
        <h3>Your Due Tasks</h3>
        <div className="scrollable-todo-list">
          {filteredTodos.length > 0 ? (
            filteredTodos
              .slice()
              .reverse()
              .map((todo) => (
                <div
                  className="todo-card"
                  key={todo.id}
                  onClick={() => toggleTodoDetails(todo.id)}
                >
                  <div className="todo-title">{todo.title}</div>
                  {expandedTodoId === todo.id && (
                    <div className="todo-details">
                      <p>
                        <strong>Title:</strong> {todo.title}
                      </p>
                      <p>
                        <strong>Description:</strong> {todo.description}
                      </p>
                      <p>
                        <strong>End Date:</strong> {todo.endDate}
                      </p>
                      <p>
                        <strong>Goal:</strong> {todo.goal}
                      </p>
                      <div className="todo-actions">
                        <button
                          className="edit-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(todo.id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(todo.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
          ) : (
            <p>No todos yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
