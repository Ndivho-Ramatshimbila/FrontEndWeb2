import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import '../../styles/pages/_analyticsexport.scss';

const AnalyticsExportScreen = () => {
    const [exportFormat, setExportFormat] = useState("PDF");
    const [selectedDays, setSelectedDays] = useState(30);
    const [reportType, setReportType] = useState("overall"); // "overall" or "specific"
    const [selectedEvent, setSelectedEvent] = useState("");

    const dayOptions = [
        { label: "Last 7 Days", value: 7 },
        { label: "Last 14 Days", value: 14 },
        { label: "Last 30 Days", value: 30 },
        { label: "Last 60 Days", value: 60 },
        { label: "Last 90 Days", value: 90 },
    ];

    // This will later be replaced by data fetched from backend
    const eventOptions = [
        { label: "Tech Innovation Hackathon", value: "hackathon" },
        { label: "Community Outreach", value: "community" },
        { label: "TUT Developers Meetup", value: "meetup" },
        { label: "AI Research Conference", value: "ai-conference" },
    ];

    const handleGenerateReport = () => {
        if (reportType === "specific" && !selectedEvent) {
            alert("Please select an event to generate its report.");
            return;
        }
        const reportInfo = {
            reportType,
            exportFormat,
            selectedDays,
            selectedEvent: reportType === "specific" ? selectedEvent : "All Events",
        };
        console.log("Generating report with data:", reportInfo);
        alert(`Generating ${reportInfo.exportFormat} report for ${reportInfo.selectedEvent}`);
    };

    return (
        <div className="analytics-export-container">
            <div className="analytics-export-content">
                <h1 className="export-header">Analytics & Exports</h1>

                {/* Report Type Selection */}
                <div className="export-card">
                    <h3 className="section-title">Select Report Type</h3>
                    <div className="button-row">
                        <button
                            className={`format-button ${reportType === "overall" ? "selected" : ""}`}
                            onClick={() => setReportType("overall")}
                        >
                            Overall Events
                        </button>

                        <button
                            className={`format-button ${reportType === "specific" ? "selected" : ""}`}
                            onClick={() => setReportType("specific")}
                        >
                            Specific Event
                        </button>
                    </div>

                    {/* Event Picker (only visible when 'Specific Event' is chosen) */}
                    {reportType === "specific" && (
                        <div className="date-container">
                            <Calendar size={20} color="#555" />
                            <select
                                value={selectedEvent}
                                className="picker"
                                onChange={(e) => setSelectedEvent(e.target.value)}
                            >
                                <option value="">Select an Event</option>
                                {eventOptions.map((event) => (
                                    <option key={event.value} value={event.value}>
                                        {event.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {/* Export Report Section */}
                <div className="export-card">
                    <h3 className="section-title">Export Format</h3>
                    <div className="button-row">
                        <button
                            className={`format-button ${exportFormat === "PDF" ? "selected" : ""}`}
                            onClick={() => setExportFormat("PDF")}
                        >
                            PDF
                        </button>

                        <button
                            className={`format-button ${exportFormat === "Excel" ? "selected" : ""}`}
                            onClick={() => setExportFormat("Excel")}
                        >
                            Excel
                        </button>
                    </div>

                    {/* Date Range */}
                    <div className="date-container">
                        <Calendar size={20} color="#555" />
                        <select
                            value={selectedDays}
                            className="picker"
                            onChange={(e) => setSelectedDays(Number(e.target.value))}
                        >
                            {dayOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Generate Report Button */}
                <button className="generate-button" onClick={handleGenerateReport}>
                    Generate Report
                </button>
            </div>
        </div>
    );
};

export default AnalyticsExportScreen;