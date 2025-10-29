import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
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

    // Mock data for reports
    const reportData = [
        { eventName: "Tech Innovation Hackathon", attendees: 150, bookings: 120, revenue: 15000, date: "2025-10-15" },
        { eventName: "Community Outreach", attendees: 80, bookings: 70, revenue: 5000, date: "2025-10-20" },
        { eventName: "TUT Developers Meetup", attendees: 60, bookings: 55, revenue: 3000, date: "2025-10-25" },
        { eventName: "AI Research Conference", attendees: 200, bookings: 180, revenue: 25000, date: "2025-11-01" },
    ];

    const generateCSV = () => {
        try {
            let csvContent = "EVENT ANALYTICS REPORT\n";
            csvContent += `Report Period: Last ${selectedDays} Days\n`;
            csvContent += `Report Type: ${reportType === "overall" ? "All Events" : selectedEvent}\n\n`;

            csvContent += "SUMMARY STATISTICS\n";
            const totalAttendees = reportData.reduce((sum, r) => sum + r.attendees, 0);
            const totalBookings = reportData.reduce((sum, r) => sum + r.bookings, 0);
            const totalRevenue = reportData.reduce((sum, r) => sum + r.revenue, 0);
            csvContent += `Total Attendees,${totalAttendees}\n`;
            csvContent += `Total Bookings,${totalBookings}\n`;
            csvContent += `Total Revenue,R${totalRevenue}\n`;
            csvContent += `Total Events,${reportData.length}\n\n`;

            csvContent += "EVENT DETAILS\n";
            csvContent += "Event Name,Attendees,Bookings,Revenue,Date\n";

            const rows = reportData
                .map(
                    (r) => `${r.eventName},${r.attendees},${r.bookings},R${r.revenue},${r.date}`
                )
                .join("\n");

            csvContent += rows;

            // Web download
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `report_${Date.now()}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error generating CSV:", error);
            alert("Failed to generate CSV");
        }
    };

    const generatePDF = async () => {
        try {
            const pdfDoc = await PDFDocument.create();
            let page = pdfDoc.addPage([600, 800]);
            const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
            const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

            let yPosition = 750;

            page.drawText("Event Analytics Report", {
                x: 50,
                y: yPosition,
                size: 24,
                font: boldFont,
                color: rgb(0, 0, 0),
            });

            yPosition -= 30;
            page.drawText(`Report Period: Last ${selectedDays} Days`, {
                x: 50,
                y: yPosition,
                size: 12,
                font: font,
                color: rgb(0.3, 0.3, 0.3),
            });

            yPosition -= 20;
            page.drawText(`Report Type: ${reportType === "overall" ? "All Events" : selectedEvent}`, {
                x: 50,
                y: yPosition,
                size: 12,
                font: font,
                color: rgb(0.3, 0.3, 0.3),
            });

            yPosition -= 40;
            page.drawText("Summary Statistics", {
                x: 50,
                y: yPosition,
                size: 16,
                font: boldFont,
            });

            const totalAttendees = reportData.reduce((sum, r) => sum + r.attendees, 0);
            const totalBookings = reportData.reduce((sum, r) => sum + r.bookings, 0);
            const totalRevenue = reportData.reduce((sum, r) => sum + r.revenue, 0);

            yPosition -= 25;
            page.drawText(`Total Attendees: ${totalAttendees}`, {
                x: 70,
                y: yPosition,
                size: 12,
                font: font,
            });

            yPosition -= 20;
            page.drawText(`Total Bookings: ${totalBookings}`, {
                x: 70,
                y: yPosition,
                size: 12,
                font: font,
            });

            yPosition -= 20;
            page.drawText(`Total Revenue: R${totalRevenue}`, {
                x: 70,
                y: yPosition,
                size: 12,
                font: font,
            });

            yPosition -= 20;
            page.drawText(`Total Events: ${reportData.length}`, {
                x: 70,
                y: yPosition,
                size: 12,
                font: font,
            });

            yPosition -= 40;
            page.drawText("Event Details", {
                x: 50,
                y: yPosition,
                size: 16,
                font: boldFont,
            });

            yPosition -= 10;
            page.drawText("Detailed breakdown by event", {
                x: 50,
                y: yPosition,
                size: 10,
                font: font,
                color: rgb(0.4, 0.4, 0.4),
            });

            yPosition -= 30;
            const headers = ["Event Name", "Attendees", "Bookings", "Revenue", "Date"];
            const positions = [50, 200, 280, 350, 450];

            headers.forEach((header, i) => {
                page.drawText(header, { x: positions[i], y: yPosition, size: 10, font: boldFont });
            });

            yPosition -= 5;
            page.drawLine({
                start: { x: 50, y: yPosition },
                end: { x: 550, y: yPosition },
                thickness: 1,
                color: rgb(0.8, 0.8, 0.8),
            });

            yPosition -= 20;
            reportData.forEach((record) => {
                page.drawText(record.eventName, { x: 50, y: yPosition, size: 10, font: boldFont });
                page.drawText(record.attendees.toString(), { x: 220, y: yPosition, size: 10, font });
                page.drawText(record.bookings.toString(), { x: 300, y: yPosition, size: 10, font });
                page.drawText(`R${record.revenue}`, { x: 370, y: yPosition, size: 10, font });
                page.drawText(record.date, { x: 470, y: yPosition, size: 10, font });
                yPosition -= 25;

                if (yPosition < 50) {
                    page = pdfDoc.addPage([600, 800]);
                    yPosition = 750;
                }
            });

            const pdfBytes = await pdfDoc.save();

            // Web download
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `report_${Date.now()}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF: " + error.message);
        }
    };

    const handleGenerateReport = async () => {
        if (reportType === "specific" && !selectedEvent) {
            alert("Please select an event to generate its report.");
            return;
        }

        if (exportFormat === "PDF") {
            await generatePDF();
        } else if (exportFormat === "Excel") {
            generateCSV();
        }
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
