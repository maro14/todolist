import React from 'react';
import { ChartBarIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import './StatsPage.css';

const StatsPage = ({ todos }) => {
  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.complete).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="stats-page">
      <h1>Task Statistics</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <ChartBarIcon className="stat-icon" />
          <div className="stat-info">
            <h3>Total Tasks</h3>
            <p className="stat-number">{totalTasks}</p>
          </div>
        </div>

        <div className="stat-card">
          <CheckCircleIcon className="stat-icon" />
          <div className="stat-info">
            <h3>Completed</h3>
            <p className="stat-number">{completedTasks}</p>
          </div>
        </div>

        <div className="stat-card">
          <ClockIcon className="stat-icon" />
          <div className="stat-info">
            <h3>Pending</h3>
            <p className="stat-number">{pendingTasks}</p>
          </div>
        </div>
      </div>

      <div className="completion-bar">
        <div className="completion-progress" style={{ width: `${completionRate}%` }}>
          <span className="completion-text">{completionRate}%</span>
        </div>
      </div>
    </div>
  );
};

export default StatsPage; 