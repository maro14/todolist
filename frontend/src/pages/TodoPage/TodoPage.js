import React, { useState, useEffect } from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline';
import TodoItem from '../../components/TodoItem/TodoItem';
import Loading from '../../components/Loading/Loading';
import AddTodoPopup from '../../components/AddTodoPopup/AddTodoPopup';
import UpdateTodoPopup from '../../components/UpdateTodoPopup/UpdateTodoPopup';
import SearchBar from '../../components/SearchBar/SearchBar';
import TodoFilters from '../../components/TodoFilters/TodoFilters';
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
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [priority, setPriority] = useState("all");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTodos();
  }, [category, priority, filter]);

  const fetchTodos = async () => {
    try {
      let url = `${API}/todo/all`;
      
      if (category !== 'all') {
        url = `${API}/todo/category/${category}`;
      } else if (priority !== 'all') {
        url = `${API}/todo/priority/${priority}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setTodos(data.data);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchTodos();
      return;
    }

    try {
      const response = await fetch(`${API}/todo/search?query=${searchQuery}`);
      const data = await response.json();

      if (data.success) {
        setTodos(data.data);
      }
    } catch (error) {
      console.error('Error searching todos:', error);
    }
  };

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(debounceSearch);
  }, [searchQuery]);

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
      await fetchTodos();
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

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.complete;
    if (filter === 'completed') return todo.complete;
    return true;
  });

  return (
    <div className="todo-page">
      <h1>Todo List</h1>
      
      <SearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <TodoFilters
        category={category}
        setCategory={setCategory}
        priority={priority}
        setPriority={setPriority}
        filter={filter}
        setFilter={setFilter}
      />

      {loading ? (
        <Loading />
      ) : (
        <div className="todos">
          {filteredTodos.length > 0 ? (
            filteredTodos.map(todo => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onComplete={completeTodo}
                onDelete={deleteTodo}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <p>No tasks found</p>
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