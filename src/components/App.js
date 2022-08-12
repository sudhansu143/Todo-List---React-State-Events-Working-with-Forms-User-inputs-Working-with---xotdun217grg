import React, { useState, useEffect } from "react";
import "./../styles/App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
  }
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }
  return (
    <div id="main">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          id="task"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button type="submit" id="btn">
          Add Todo
        </button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todo-text">
            {todo.id === todoEditing ? (
              <textarea
                className="edit"
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>
          <div className="todo-actions">
            {todo.id === todoEditing ? (
              <button className="saveTask" onClick={() => submitEdits(todo.id)}>
                Save
              </button>
            ) : (
              <button
                className="editTask"
                onClick={() => setTodoEditing(todo.id)}
              >
                Edit
              </button>
            )}

            <button className="delete" onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
