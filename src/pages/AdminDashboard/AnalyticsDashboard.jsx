import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';

import { TrendingUp, Users, Calendar, CalendarCheck, Settings } from 'lucide-react';

// LineGraph component (same as before)
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
    const svg = d3.select(svgRef.current).attr('width', width).attr('height', height);
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
    const min = Math.min(...data);
    const max = Math.max(...data);

    const yScale = d3.scaleLinear().domain([min, max]).range([innerHeight, 0]);
    const xScale = d3.scaleLinear().domain([0, data.length - 1]).range([0, innerWidth]);

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
    <div ref={containerRef} style={{ width: '100%' }}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

const AnalyticsDashboard = () => {
  const occupancyData = [
    { name: 'Lecture', occupied: 80, total: 100 },
    { name: 'Sports', occupied: 80, total: 100 },
    { name: 'Library', occupied: 45, total: 100 },
    { name: 'Auditorium', occupied: 20, total: 100 },
    { name: 'Art', occupied: 50, total: 100 },
  ];

  const statsData = [
    { title: 'Registered Users', value: '145', subtitle: 'Across all departments', icon: Users, iconColor: '#03A9F4' },
    { title: 'Active Events', value: '78', subtitle: 'Currently running or upcoming', icon: Calendar, iconColor: '#333' },
    { title: 'Event Bookings', value: '3,120', subtitle: 'New Bookings this Month', icon: CalendarCheck, iconColor: '#03A9F4' },
    { title: 'Resource Utilization', value: '82%', subtitle: 'Average monthly utilization', icon: Settings, iconColor: '#333' }
  ];

  const revenueData = [10, 15, 25, 45, 20, 18, 40, 30, 25, 35, 50, 70, 85, 95, 100];

  const renderOccupancyBar = (occupied, total) => {
    const percentage = (occupied / total) * 100;
    return (
      <div style={{ flex: 1, height: '10px', background: '#e0e0e0', borderRadius: '5px', overflow: 'hidden', margin: '0 0.5rem' }}>
        <div style={{ width: `${percentage}%`, height: '100%', background: '#03a9f4' }} />
      </div>
    );
  };

  const cardStyle = { background: '#fff', padding: '1rem', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' };

  return (
    <div style={{ padding: '1rem', overflowY: 'auto' }}>
      {/* Occupancy */}
      <div style={{ ...cardStyle, marginBottom: '1rem' }}>
        <h3>Occupancy Overview</h3>
        {occupancyData.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', margin: '0.5rem 0' }}>
            <span style={{ width: '100px' }}>{item.name}</span>
            {renderOccupancyBar(item.occupied, item.total)}
            <span>{item.occupied}/{item.total}</span>
          </div>
        ))}
      </div>

      {/* Revenue */}
      <div style={{ ...cardStyle, marginBottom: '1rem' }}>
        <h3>Revenue Summary</h3>
        <h2 style={{ margin: '0.5rem 0' }}>R27,000</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <TrendingUp size={16} />
          <span>+10.20% vs. last month</span>
        </div>
        <LineGraph data={revenueData} color="#03a9f4" />
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {statsData.map((stat, i) => (
          <div key={i} style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{stat.title}</span>
              <stat.icon size={20} color={stat.iconColor} />
            </div>
            <h3 style={{ margin: '0.5rem 0' }}>{stat.value}</h3>
            <p style={{ margin: 0 }}>{stat.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
