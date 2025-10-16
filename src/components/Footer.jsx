import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import '../styles/abstracts/Footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Contact + Social Media */}
        <div className="footer-section">
          <h3 className="footer-heading">Contact Us</h3>
          <ul className="footer-contact">
            <li><Mail className="icon" /> eventsupport@university.ac.za</li>
            <li><Phone className="icon" /> +27 12 345 6789</li>
            <li><MapPin className="icon" /> Polokwane Campus, South Africa</li>
            <li><MapPin className="icon" /> Emalahleni Campus, South Africa</li>
          </ul>

          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><Facebook className="social-icon" /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram className="social-icon" /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><Twitter className="social-icon" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"><Linkedin className="social-icon" /></a>
          </div>
        </div>

        {/* Attendee Links */}
        <div className="footer-section">
          <h3 className="footer-heading">For Attendees</h3>
          <ul className="footer-links">
            <li><a href="/attendee-dashboard">Attendee Dashboard</a></li>
            <li><a href="/upcoming-events">Upcoming Events</a></li>
            <li><a href="/my-tickets">My Tickets</a></li>
            <li><a href="/feedback">Submit Feedback</a></li>
          </ul>
        </div>

        {/* Organizer Links */}
        <div className="footer-section">
          <h3 className="footer-heading">For Organizers</h3>
          <ul className="footer-links">
            <li><a href="/create-event">Create Event</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© Copyright Event Handler System. All Rights Reserved.</p>
        <p>Designed by TUT ICEP TEAM 2025</p>
      </div>
    </footer>
  );
}
