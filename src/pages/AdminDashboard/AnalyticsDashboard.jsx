import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { TrendingUp, Users, Calendar, CalendarCheck, Settings } from 'lucide-react';
import '../../styles/pages/_analyticsdashboard.scss';
import { useNavigate } from 'react-router-dom';

// Line Graph Component
const LineGraph = ({ data, color = '#000000' }) => {
  const svgRef = useRef();
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = width * 0.25;
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!dimensions.width || !dimensions.height || !data.length) return;

    const { width, height } = dimensions;
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const min = Math.min(...data);
    const max = Math.max(...data);
    const yScale = d3.scaleLinear()
      .domain([min, max])
      .range([innerHeight, 0]);

    const xScale = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, innerWidth]);

    const line = d3.line()
      .x((d, i) => xScale(i))
      .y(d => yScale(d))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 2)
      .attr('d', line);

  }, [data, dimensions, color]);

  return (
    <div ref={containerRef} className="line-graph-container">
      <svg ref={svgRef}></svg>
    </div>
  );
};

// Main Analytics Dashboard Component
const AnalyticsDashboard = () => {
  const navigate = useNavigate();

  const handleExportClick = () => navigate('/admin/export');
  const handleApproveClick = () => navigate('/admin/approvals');
  const handleCalendarClick = () => navigate('/admin/calendar');
  const handleAddVenueClick = () => navigate('/admin/add-venue');

  const occupancyData = [
    { name: 'Lecture', occupied: 80, total: 100 },
    { name: 'Sports', occupied: 80, total: 100 },
    { name: 'Library', occupied: 45, total: 100 },
    { name: 'Auditorium', occupied: 20, total: 100 },
    { name: 'Art', occupied: 50, total: 100 },
  ];

  const statsData = [
    {
      title: 'Registered Users',
      value: '145',
      subtitle: 'Across all departments',
      icon: Users,
      iconColor: '#03A9F4'
    },
    {
      title: 'Active Events',
      value: '78',
      subtitle: 'Currently running or upcoming',
      icon: Calendar,
      iconColor: '#333'
    },
    {
      title: 'Event Bookings',
      value: '3,120',
      subtitle: 'New Bookings this Month',
      icon: CalendarCheck,
      iconColor: '#03A9F4'
    },
    {
      title: 'Resource Utilization',
      value: '82%',
      subtitle: 'Average monthly utilization',
      icon: Settings,
      iconColor: '#333'
    }
  ];

  const revenueData = [10, 15, 25, 45, 20, 18, 40, 30, 25, 35, 50, 70, 85, 95, 100];

  const renderOccupancyBar = (occupied, total) => {
    const percentage = (occupied / total) * 100;
    return (
      <div className="occupancy-bar-container">
        <div
          className="occupancy-bar-filled"
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  return (
    <div className="admin-dashboard-page">
      {/* Header */}
      <header className="dashboard-header">
        <h1 className="header-title">Admin Dashboard</h1>
      </header>

      {/* Main Dashboard Content */}
      <div className="dashboard-content">
        {/* Occupancy Overview */}
        <div className="occupancy-card">
          <div className="card-header">
            <h3 className="card-title">Occupancy Overview</h3>
          </div>

          <div className="occupancy-list">
            {occupancyData.map((item, index) => (
              <div key={index} className="occupancy-row">
                <span className="occupancy-label">{item.name}</span>
                {renderOccupancyBar(item.occupied, item.total)}
                <span className="occupancy-value">
                  {Math.round((item.occupied / item.total) * 100)}%
                </span>
              </div>
            ))}
          </div>

          <p className="occupancy-caption">
            Visualizing event space occupancy vs. total capacity.
          </p>
        </div>

        {/* Revenue Summary */}
        <div className="revenue-card">
          <div className="revenue-header">
            <h3 className="revenue-title">Revenue Summary</h3>
            <div className="monthly-badge">
              <span className="monthly-text">Monthly</span>
            </div>
          </div>

          <div className="revenue-amount-container">
            <h2 className="revenue-amount">R27,000</h2>
            <div className="revenue-change">
              <TrendingUp size={16} className="revenue-icon" />
              <span className="revenue-change-text">+10.20% vs. last month</span>
            </div>
          </div>

          <div className="revenue-chart">
            <LineGraph data={revenueData} color="#000000" />
          </div>
        </div>

        {/* Statistics */}
        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-header">
                <span className="stat-title">{stat.title}</span>
                <stat.icon size={20} style={{ color: stat.iconColor }} />
              </div>
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-subtitle">{stat.subtitle}</p>
            </div>
          ))}
        </div>

        {/* ✅ Actions Section */}
        <div className="action-links">
          <button className="action-link" onClick={handleApproveClick}>
            <span className="action-icon">|||</span>
            <span>Admin Approval Queue</span>
          </button>

          <button className="action-link" onClick={handleExportClick}>
            <span className="action-icon">↑</span>
            <span>Analytics Export Options</span>
          </button>

          <button className="action-link" onClick={handleCalendarClick}>
            <Calendar size={16} className="action-icon" />
            <span>View Calendar</span>
          </button>

          <button className="action-link" onClick={handleAddVenueClick}>
            <Settings size={16} className="action-icon" />
            <span>Add Venue</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
