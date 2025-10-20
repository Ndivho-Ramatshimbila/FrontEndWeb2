import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import Footer from '../components/Footer';
import "../styles/components/_adminlayout.scss";

const AdminLayout = () => {
  return (
    <div className="admin-layout-container">
      {/* Fixed Sidebar */}
      <AdminSidebar />

      {/* Main Content Area with Footer */}
      <div className="admin-main-wrapper">
        <div className="admin-content-area">
          <Outlet />
        </div>
        
        
      </div>
      {/* Footer stays at bottom */}
        <Footer />
    </div>
  );
};

export default AdminLayout;