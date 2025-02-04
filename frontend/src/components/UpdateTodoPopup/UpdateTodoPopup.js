import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import './UpdateTodoPopup.css';

const UpdateTodoPopup = ({ todo, updatedText, setUpdatedText, onUpdate, onClose }) => {
  return (
    <div className="popup">
      <div className="closePopup" onClick={onClose}>
        <XMarkIcon className="close-icon" />
      </div>
      <div className="content">
        <h3>Update Task</h3>
        <input
          type="text"
          className="update-todo-input"
          onChange={e => setUpdatedText(e.target.value)}
          value={updatedText}
          placeholder={todo.text}
        />
        <div className="button" onClick={onUpdate}>Update Task</div>
      </div>
    </div>
  );
};

export default UpdateTodoPopup; 