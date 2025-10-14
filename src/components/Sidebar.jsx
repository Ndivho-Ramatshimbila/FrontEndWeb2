import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/components/_sidebar.scss';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-menu">

        <NavLink to="/" className="sidebar-item">
          <i className="fas fa-home"></i>
          <span>Home</span>
        </NavLink>

        <NavLink to="/my-events" className="sidebar-item">
          <i className="fas fa-calendar-alt"></i>
          <span>My Events</span>
        </NavLink>

        <NavLink to="/inbox" className="sidebar-item">
          <i className="fas fa-inbox"></i>
          <span>Inbox</span>
        </NavLink>

        <NavLink to="/profile" className="sidebar-item">
          <i className="fas fa-user"></i>
          <span>Profile</span>
        </NavLink>

        <NavLink to="/discover" className="sidebar-item">
          <i className="fas fa-compass"></i>
          <span>Discover</span>
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;
