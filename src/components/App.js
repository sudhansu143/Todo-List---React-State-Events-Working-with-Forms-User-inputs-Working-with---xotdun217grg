import React, { useState } from "react";
import "./../styles/App.css";

const Edit = ({ inputValue, index, handleEditChange, saveEdit }) => {
  return (
    <div className="edit-mode">
      <input
        className="editTask"
        type={"text"}
        placeholder={"edit task here..."}
        value={inputValue}
        onChange={(e) => handleEditChange(e, index)}
      />
      <button className="saveTask" onClick={() => saveEdit(index)}>
        save
      </button>
    </div>
  );
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentValue, setCurrentValue] = useState({
    edit_mode: false,
    value: "",
  });

  const addTodo = () => {
    if (currentValue.value === "") return;
    setTasks([...tasks, currentValue]);
    setCurrentValue({ edit_mode: false, value: "" });
  };

  const deleteTodo = (index) => {
    const new_tasks = [...tasks];
    new_tasks.splice(index, 1);
    setTasks([...new_tasks]);
  };

  const toggleEditMode = (index) => {
    const toggle_tasks = [...tasks];
    toggle_tasks[index].edit_mode = true;
    setTasks([...toggle_tasks]);
  };

  const handleEditChange = (e, index) => {
    const edit_task = [...tasks];
    edit_task[index].value = e.target.value;
    setTasks([...edit_task]);
  };

  const saveEdit = (index) => {
    if (tasks[index].value === "") return;
    const save_tasks = [...tasks];
    save_tasks[index].edit_mode = false;
    setTasks([...save_tasks]);
  };

  return (
    <div id="main">
      <div>
        <input
          id="task"
          type={"text"}
          placeholder={"Add your todo here..."}
          value={currentValue.value}
          onChange={(e) =>
            setCurrentValue({ ...currentValue, value: e.target.value })
          }
        />
        <button id="btn" onClick={addTodo}>
          Add Tod
        </button>
      </div>
      <div>
        <ul>
          {tasks.map((data, index) => {
            const { edit_mode, value } = data;
            return (
              <div key={index}>
                {edit_mode ? (
                  <Edit
                    inputValue={value}
                    index={index}
                    handleEditChange={handleEditChange}
                    saveEdit={saveEdit}
                  />
                ) : (
                  <div className="lists">
                    <li className="list">{value}</li>
                    <button
                      className="edit"
                      onClick={() => toggleEditMode(index)}
                    >
                      edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => deleteTodo(index)}
                    >
                      delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
