import React from 'react';
import { NavLink } from 'react-router-dom';
const AttendeeSidebar = () => {
  return (
    <div className="attendee-sidebar">
      <nav className="sidebar-nav">
        <h3 className="sidebar-title">Browse Categories</h3>
        <ul className="sidebar-links">
          <li>
            <NavLink 
              to="/attendee" 
              className={({ isActive }) => isActive ? 'active-link' : ''}
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/attendee/sports" 
              className={({ isActive }) => isActive ? 'active-link' : ''}
            >
              Sports
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/arts" 
              className={({ isActive }) => isActive ? 'active-link' : ''}
            >
              Arts
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/other" 
              className={({ isActive }) => isActive ? 'active-link' : ''}
            >
              Other
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AttendeeSidebar;
