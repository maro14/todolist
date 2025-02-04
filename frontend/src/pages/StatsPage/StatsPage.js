import React, { useState, useEffect } from 'react';
import { ChartBarIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import Loading from '../../components/Loading/Loading';
import './StatsPage.css';

const API = process.env.REACT_APP_API_URL || "http://localhost:3001";

const StatsPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API}/todo/stats`);
      const data = await response.json();

      if (data.success) {
        const statsData = data.data;
        setStats({
          total: statsData.total || 0,
          completed: statsData.completed || 0,
          pending: (statsData.total - statsData.completed) || 0,
          completionRate: statsData.total ? Math.round((statsData.completed / statsData.total) * 100) : 0
        });
      } else {
        setError(data.error || 'Failed to load statistics');
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      setError('Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="stats-error">{error}</div>;
  if (!stats) return <div className="stats-empty">No statistics available</div>;

  return (
    <div className="stats-page">
      <h1>Task Statistics</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <ChartBarIcon className="stat-icon" />
          <div className="stat-info">
            <h3>Total Tasks</h3>
            <p className="stat-number">{stats.total}</p>
          </div>
        </div>

        <div className="stat-card">
          <CheckCircleIcon className="stat-icon" />
          <div className="stat-info">
            <h3>Completed</h3>
            <p className="stat-number">{stats.completed}</p>
          </div>
        </div>

        <div className="stat-card">
          <ClockIcon className="stat-icon" />
          <div className="stat-info">
            <h3>Pending</h3>
            <p className="stat-number">{stats.pending}</p>
          </div>
        </div>
      </div>

      <div className="completion-bar">
        <div 
          className="completion-progress" 
          style={{ width: `${stats.completionRate}%` }}
        >
          <span className="completion-text">{stats.completionRate}% Complete</span>
        </div>
      </div>
    </div>
  );
};

export default StatsPage; 