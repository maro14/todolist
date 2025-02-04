import React from 'react';
import { FunnelIcon, TagIcon, SignalIcon } from '@heroicons/react/24/outline';
import './TodoFilters.css';

const TodoFilters = ({ 
  category, 
  setCategory, 
  priority, 
  setPriority, 
  filter, 
  setFilter 
}) => {
  return (
    <div className="filters-container">
      <div className="filter-group">
        <TagIcon className="filter-icon" />
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Categories</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="shopping">Shopping</option>
          <option value="health">Health</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="filter-group">
        <SignalIcon className="filter-icon" />
        <select 
          value={priority} 
          onChange={(e) => setPriority(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="filter-group">
        <FunnelIcon className="filter-icon" />
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Tasks</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
};

export default TodoFilters; 