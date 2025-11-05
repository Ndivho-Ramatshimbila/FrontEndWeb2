import React from 'react';
import DashboardHeader from "../../components/DashBoardHeader";
import OverviewCard from "../../components/OverviewCard";
import QuickActions from "../../components/QuickActions";
import "../../styles/pages/_dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <DashboardHeader user="Organiser" />

      <section className="overview-section">
        <OverviewCard title="Total Events" value="145" icon="fas fa-calendar" />
        <OverviewCard title="Total Attendance" value="8,760" change="2%" isPositive={true} icon="fas fa-users" />
        <OverviewCard title="Resource Utilized" value="78%" change="1%" isPositive={false} icon="fas fa-cogs" />
        <OverviewCard title="Average Rating" value="4.7" change="0.1" isPositive={true} icon="fas fa-star" />
      </section>

      <QuickActions />
    </div>
  );
};

export default Dashboard;