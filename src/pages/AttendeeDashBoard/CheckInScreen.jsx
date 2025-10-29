import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/pages/CheckInScreen.scss";

export default function CheckInScreen() {
    const location = useLocation();
    const { ticketData } = location.state || {};
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Use passed ticket data or fallback to mock response
        const timer = setTimeout(() => {
            const ticketInfo = ticketData || {
                eventName: "TUT Campus Connect Hackathon 2025",
                qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?data=TUT2025&size=150x150",
                status: "Checked In",
                lastSynced: "2025-10-15 09:45",
            };
            setTicket(ticketInfo);
            setLoading(false);
        }, 1500); // simulate 1.5s delay

        return () => clearTimeout(timer);
    }, [ticketData]);

    if (loading) {
        return (
            <div className="center">
                <div className="spinner"></div>
                <p className="loading-text">Loading Ticket...</p>
            </div>
        );
    }

    if (!ticket) {
        return (
            <div className="center">
                <p className="error-text">No ticket found</p>
            </div>
        );
    }

    return (
        <div className="container">
            {/* Header */}
            <header className="header">
                <h1 className="header-title">QR Code</h1>
            </header>

            {/* Ticket Card */}
            <div className="card">
                <h2 className="title">Your Event Ticket</h2>
                <p className="subtitle">{ticket.eventName}</p>

                {/* QR Code */}
                <div className="qr-container">
                    <img src={ticket.qrCodeUrl} alt="QR Code" className="qr-code" />
                </div>

                {/* Status Row */}
                <div className="status-row">
                    <svg className="icon" viewBox="0 0 512 512" fill="currentColor">
                        <path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm0 384c-97 0-176-79-176-176S159 80 256 80s176 79 176 176-79 176-176 176z"/>
                        <path d="M256 128c-70.7 0-128 57.3-128 128s57.3 128 128 128 128-57.3 128-128-57.3-128-128-128zm0 224c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96z"/>
                    </svg>
                    <span className="status-text">{ticket.status}</span>
                    <div className="status-badge">
                        <span className="status-badge-text">{ticket.status}</span>
                    </div>
                </div>

                {/* Button */}
                <button className="button">
                    <span className="button-text">View Event Details</span>
                </button>
            </div>

            {/* Sync Info */}
            <div className="sync-container">
                <svg className="icon" viewBox="0 0 512 512" fill="currentColor">
                    <path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm0 384c-97 0-176-79-176-176S159 80 256 80s176 79 176 176-79 176-176 176z"/>
                    <path d="M368 254L244 130c-6-6-16-6-22 0s-6 16 0 22l95 95H140c-8.8 0-16 7.2-16 16s7.2 16 16 16h177l-95 95c-6 6-6 16 0 22s16 6 22 0l124-124c6-6 6-16 0-22z"/>
                </svg>
                <span className="sync-text">Last synced: {ticket.lastSynced}</span>
            </div>
            
        </div>
    );
}