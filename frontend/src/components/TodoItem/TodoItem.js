import React from 'react';
import { PencilSquareIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/solid';
import './TodoItem.css';

const TodoItem = ({ todo, onComplete, onDelete, onEdit }) => {
  return (
    <div
      className={`todo ${todo.complete ? "is-complete" : ""}`}
      onClick={() => onComplete(todo._id)}
    >
      <div className="checkbox">
        {todo.complete && <CheckIcon className="check-icon" />}
      </div>
      <div className="text">{todo.text}</div>
      <div className="todo-actions">
        <div
          className="edit-todo"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(todo);
          }}
        >
          <PencilSquareIcon className="action-icon" />
        </div>
        <div
          className="delete-todo"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(todo._id);
          }}
        >
          <XMarkIcon className="action-icon" />
        </div>
      </div>
    </div>
  );
};

export default TodoItem; 