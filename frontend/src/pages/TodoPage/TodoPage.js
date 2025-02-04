import React, { useState, useEffect } from 'react';
import TodoItem from '../../components/TodoItem/TodoItem';
import Loading from '../../components/Loading/Loading';
import AddTodoPopup from '../../components/AddTodoPopup/AddTodoPopup';
import UpdateTodoPopup from '../../components/UpdateTodoPopup/UpdateTodoPopup';
import './TodoPage.css';

const API = process.env.REACT_APP_API_URL || "http://localhost:3001";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [updatedText, setUpdatedText] = useState("");

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
      setShowAddPopup(false);
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

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    setUpdatedText(todo.text);
    setShowUpdatePopup(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${API}/todo/update/${selectedTodo._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: updatedText })
      });

      const data = await response.json();

      if (data.success) {
        setTodos(todos.map(todo => 
          todo._id === selectedTodo._id ? { ...todo, text: updatedText } : todo
        ));
        setShowUpdatePopup(false);
        setSelectedTodo(null);
        setUpdatedText("");
      }
    } catch (error) {
      console.error('Error updating todo:', error);
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
              onEdit={handleEdit}
            />
          )) : (
            <p>You currently have no tasks</p>
          )}
        </div>
      )}

      <div className="addPopup" onClick={() => setShowAddPopup(true)}>+</div>

      {showAddPopup && (
        <AddTodoPopup
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          onAdd={addTodo}
          onClose={() => {
            setShowAddPopup(false);
            setNewTodo("");
          }}
        />
      )}

      {showUpdatePopup && selectedTodo && (
        <UpdateTodoPopup
          todo={selectedTodo}
          updatedText={updatedText}
          setUpdatedText={setUpdatedText}
          onUpdate={handleUpdate}
          onClose={() => {
            setShowUpdatePopup(false);
            setSelectedTodo(null);
            setUpdatedText("");
          }}
        />
      )}
    </div>
  );
};

export default TodoPage; 