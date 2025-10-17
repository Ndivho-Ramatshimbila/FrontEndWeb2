import React, { useState } from 'react';
import { Award } from 'lucide-react';
import "../../styles/pages/_organizereventrating.scss";

export default function OrganizerEventRating() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const eventName = "TUT Tech innovation Summit";

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert('Please select a rating before submitting');
      return;
    }

    const ratingData = {
      eventName,
      rating,
      feedback,
      submittedAt: new Date().toISOString()
    };

    console.log('Rating submitted:', ratingData);
    setSubmitted(true);
    
    // Redirect after submission
    setTimeout(() => {
      window.location.href = '/my-events';
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="organizer-rating-page">
        <div className="rating-container">
          <div className="rating-content">
            <div className="badge-earned-section">
              <div className="badge-header">
                <div className="badge-icon-large">
                  <Award size={48} />
                </div>
              </div>
              <h2 className="badge-title">Innovation explorer: You have earned a badge for attending and rating an innovation event!</h2>
              <div className="badge-icon-display">
                <div className="badge-circle">
                  <Award size={32} />
                </div>
              </div>
            </div>

            <div className="divider"></div>

            <div className="feedback-section">
              <h3 className="feedback-title">Additional Feedback(Optional)</h3>
              <textarea
                className="feedback-textarea"
                placeholder="Share your experience, What you liked, or how we can improve..."
                value={feedback}
                disabled
                rows="6"
              />
            </div>

            <button 
              type="button"
              className="submit-button"
              onClick={() => window.location.href = '/my-events'}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="organizer-rating-page">
      <div className="rating-container">
        <div className="rating-content">
          <h1 className="page-title">Rate Event</h1>

          <div className="rating-section">
            <h2 className="event-question">How was {eventName}?</h2>
            <p className="rating-subtitle">Your feedback help us improve future events.</p>

            {/* Star Rating */}
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star ${star <= (hoverRating || rating) ? 'active' : ''}`}
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  aria-label={`Rate ${star} stars`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Badge Earned Section - Shows after rating */}
          {rating > 0 && (
            <>
              <div className="badge-earned-section">
                <h3 className="badge-title">Badge Earned!</h3>
                <div className="badge-display">
                  <div className="badge-icon">
                    <Award size={24} />
                  </div>
                  <p className="badge-text">
                    Innovation explorer: You have earned a badge for attending and rating an innovation event!
                  </p>
                  <div className="badge-icon-large">
                    <Award size={32} />
                  </div>
                </div>
              </div>

              <div className="divider"></div>
            </>
          )}

          <form onSubmit={handleSubmit}>
            <div className="feedback-section">
              <h3 className="feedback-title">Additional Feedback(Optional)</h3>
              <textarea
                className="feedback-textarea"
                placeholder="Share your experience, What you liked, or how we can improve..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows="6"
              />
            </div>

            <button 
              type="submit"
              className="submit-button"
              disabled={rating === 0}
            >
              Submit Rating
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}