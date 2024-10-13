import { useEffect, useState } from 'react';

const API = process.env.REACT_APP_API_URL || "http://localhost:3001"; // Using environment variables

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    setLoading(true); // Show loading before fetching todos
    try {
      const response = await fetch(`${API}/todo/all`);
      const result = await response.json();
      if (!response.ok) throw new Error('Failed to fetch todos');
      setTodos(result.data);  // Accessing result.data instead of result
    } catch (err) {
      console.error("Error fetching todos", err);
    } finally {
      setLoading(false); // Hide loading after the data is fetched
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) {
      alert('Task cannot be empty!');
      return;
    }

    setLoading(true); // Show loading during the add operation
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

      const result = await response.json();  // Adjusted to access the right response structure
      if (!response.ok) throw new Error('Failed to add todo');

      // Fetch updated todos after successfully adding a task
      await getTodos();

      setPopupActive(false);
      setNewTodo("");

    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      setLoading(false); // Hide loading after adding the todo
    }
  };

  const completeTodo = async (id) => {
    setLoading(true); // Show loading during the complete operation
    try {
      const response = await fetch(`${API}/todo/complete/${id}`);
      const result = await response.json(); // Accessing the data correctly
      if (!response.ok) throw new Error('Failed to complete todo');

      setTodos(todos => todos.map(todo =>
        todo._id === result.data._id ? { ...todo, complete: result.data.complete } : todo
      ));
    } catch (error) {
      console.error("Error completing todo:", error);
    } finally {
      setLoading(false); // Hide loading after completing the todo
    }
  };

  const deleteTodo = async (id) => {
    setLoading(true); // Show loading during the delete operation
    try {
      const response = await fetch(`${API}/todo/delete/${id}`, {
        method: "DELETE",
      });
      const result = await response.json(); // Accessing the data correctly
      if (!response.ok) throw new Error('Failed to delete todo');

      setTodos(todos => todos.filter(todo => todo._id !== result.data._id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    } finally {
      setLoading(false); // Hide loading after deleting the todo
    }
  };

  return (
    <div className="App">
      <h1>Welcome, Friends</h1>
      <h4>Your Task</h4>

      {loading ? ( // Show loading indicator if loading is true
        <p>Loading...</p>
      ) : (
        <div className="todos">
          {todos.length > 0 ? todos.map(todo => (
            <div
              className={`todo ${todo.complete ? "is-complete" : ""}`}
              key={todo._id}
              onClick={() => completeTodo(todo._id)}
            >
              <div className="checkbox"></div>
              <div className="text">{todo.text}</div>
              <div
                className="delete-todo"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTodo(todo._id);
                }}
              >
                X
              </div>
            </div>
          )) : (
            <p>You currently have no tasks</p>
          )}
        </div>
      )}

      <div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>X</div>
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-todo-input"
              onChange={e => setNewTodo(e.target.value)}
              value={newTodo}
            />
            <div className="button" onClick={addTodo}>Create Task</div>
          </div>
        </div>
      ) : ''}
    </div>
  );
}

export default App;
