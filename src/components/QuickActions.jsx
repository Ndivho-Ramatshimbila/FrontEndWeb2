import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate('/create-event');
  };

  return (
    <div className="quick-actions">
      <h3>Quick Actions</h3>
      <button className="action-btn" onClick={handleCreateClick}>
        + Create New Event
      </button>
      <button className="action-btn">💬 View Approval Chats</button>
    </div>
  );
};

export default QuickActions;
