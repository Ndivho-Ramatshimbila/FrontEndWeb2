import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { TrendingUp, BarChart3 } from 'lucide-react';
import '../../styles/pages/_analyticsdashboard.scss';

// Line Graph Component
const LineGraph = ({ data, color = '#9614d0' }) => {
  const svgRef = useRef();
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = width * 0.3; // Aspect ratio
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

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const min = Math.min(...data);
    const max = Math.max(...data);
    const yScale = d3.scaleLinear()
      .domain([min, max])
      .range([innerHeight, 0]);

    const xScale = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, innerWidth]);

    // Line generator
    const line = d3.line()
      .x((d, i) => xScale(i))
      .y(d => yScale(d))
      .curve(d3.curveMonotoneX);

    // Draw line
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
  const occupancyData = [
    { name: 'Lecture', occupied: 80, total: 100 },
    { name: 'Sports', occupied: 80, total: 100 },
    { name: 'Library', occupied: 45, total: 100 },
    { name: 'Auditorium', occupied: 20, total: 100 },
    { name: 'Art', occupied: 50, total: 100 },
  ];

  const revenueSummary = {
    amount: 'R27,000',
    change: '+10.20%',
    trend: 'vs. last month'
  };

  const revenueData = [1, 12, 10, 20, 60, 10, 50, 56, 20, 20, 30, 40, 60, 80, 100];

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
    <div className="analytics-dashboard">
      {/* Revenue Summary Card */}
      <div className="revenue-card">
        <div className="revenue-header">
          <h3 className="revenue-title">Revenue Summary</h3>
          <div className="monthly-badge">
            <span className="monthly-text">Monthly</span>
          </div>
        </div>
        
        <div className="revenue-amount-container">
          <h2 className="revenue-amount">{revenueSummary.amount}</h2>
          <div className="revenue-change">
            <TrendingUp size={16} className="revenue-icon" />
            <span className="revenue-change-text">
              {revenueSummary.change} {revenueSummary.trend}
            </span>
          </div>
        </div>

        <div className="revenue-chart">
          <LineGraph data={revenueData} color="#9614d0" />
        </div>
      </div>

      {/* Occupancy Overview Card */}
      <div className="occupancy-card">
        <div className="card-header">
          <h3 className="card-title">Occupancy Overview</h3>
          <button 
            className="view-details-btn"
            onClick={() => window.location.href = '/event-details'}
          >
            <BarChart3 size={16} />
            <span>View Details</span>
          </button>
        </div>

        <div className="occupancy-list">
          {occupancyData.map((item, index) => (
            <div key={index} className="occupancy-row">
              <span className="occupancy-label">{item.name}</span>
              {renderOccupancyBar(item.occupied, item.total)}
              <span className="occupancy-value">
                {item.occupied}/{item.total}
              </span>
            </div>
          ))}
        </div>

        <p className="occupancy-caption">
          Visualizing event space occupancy vs. total capacity.
        </p>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;