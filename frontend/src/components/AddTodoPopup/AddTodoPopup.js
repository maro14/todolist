import React from 'react';
import './AddTodoPopup.css';

const AddTodoPopup = ({ newTodo, setNewTodo, onAdd, onClose }) => {
  return (
    <div className="popup">
      <div className="closePopup" onClick={onClose}>X</div>
      <div className="content">
        <h3>Add Task</h3>
        <input
          type="text"
          className="add-todo-input"
          onChange={e => setNewTodo(e.target.value)}
          value={newTodo}
        />
        <div className="button" onClick={onAdd}>Create new Task</div>
      </div>
    </div>
  );
};

export default AddTodoPopup; 