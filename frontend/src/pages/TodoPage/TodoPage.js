import React, { useState, useEffect } from 'react';
import TodoItem from '../../components/TodoItem/TodoItem';
import Loading from '../../components/Loading/Loading';
import AddTodoPopup from '../../components/AddTodoPopup/AddTodoPopup';
import './TodoPage.css';

const API = process.env.REACT_APP_API_URL || "http://localhost:3001";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API}/todo/all`);
      const result = await response.json();
      if (!response.ok) throw new Error('Failed to fetch todos');
      setTodos(result.data);
    } catch (err) {
      console.error("Error fetching todos", err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) {
      alert('Task cannot be empty!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API}/todo/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newTodo,
        }),
      });

      if (!response.ok) throw new Error('Failed to add todo');
      await getTodos();
      setPopupActive(false);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      setLoading(false);
    }
  };

  const completeTodo = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${API}/todo/complete/${id}`);
      const result = await response.json();
      if (!response.ok) throw new Error('Failed to complete todo');

      setTodos(todos => todos.map(todo =>
        todo._id === result.data._id ? { ...todo, complete: result.data.complete } : todo
      ));
    } catch (error) {
      console.error("Error completing todo:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${API}/todo/delete/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (!response.ok) throw new Error('Failed to delete todo');

      setTodos(todos => todos.filter(todo => todo._id !== result.data._id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="todo-page">
      <h1>Welcome, Friends</h1>
      <h4>Your Task</h4>

      {loading ? (
        <Loading />
      ) : (
        <div className="todos">
          {todos.length > 0 ? todos.map(todo => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onComplete={completeTodo}
              onDelete={deleteTodo}
            />
          )) : (
            <p>You currently have no tasks</p>
          )}
        </div>
      )}

      <div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

      {popupActive && (
        <AddTodoPopup
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          onAdd={addTodo}
          onClose={() => setPopupActive(false)}
        />
      )}
    </div>
  );
};

export default TodoPage; 