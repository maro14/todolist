import React from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onComplete, onDelete }) => {
  return (
    <div
      className={`todo ${todo.complete ? "is-complete" : ""}`}
      onClick={() => onComplete(todo._id)}
    >
      <div className="checkbox"></div>
      <div className="text">{todo.text}</div>
      <div
        className="delete-todo"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(todo._id);
        }}
      >
        X
      </div>
    </div>
  );
};

export default TodoItem; 