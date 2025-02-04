import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import './AddTodoPopup.css';

const AddTodoPopup = ({ newTodo, setNewTodo, onAdd, onClose }) => {
  return (
    <div className="popup">
      <div className="closePopup" onClick={onClose}>
        <XMarkIcon className="close-icon" />
      </div>
      <div className="content">
        <h3>Add Task</h3>
        <input
          type="text"
          className="add-todo-input"
          onChange={e => setNewTodo(e.target.value)}
          value={newTodo}
          placeholder="What needs to be done?"
        />
        <div className="button" onClick={onAdd}>Create Task</div>
      </div>
    </div>
  );
};

export default AddTodoPopup; 