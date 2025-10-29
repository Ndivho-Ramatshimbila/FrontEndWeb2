import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import VenueCardGallery from '../../components/VenueCardGallery';
import TermsCheckbox from '../../components/TermsCheckbox';
import "../../styles/pages/_createevent.scss";
import { useNavigate, useLocation } from 'react-router-dom';

export default function ModifyForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formData, setFormData] = useState({
    eventTitle: '',
    venueType: '',
    venue: '',
    campus: '',
    typeOfFunction: '',
    typeOfGuests: [],
    purposeOfFunction: '',
    numberOfGuestsExpected: '',
    dateOfCommencement: '',
    endingDate: '',
    timeOfCommencement: '',
    timeToLockup: '',
    useOfLiquor: '',
    kitchenFacilities: '',
    cleaningServices: '',
    steelTable: 10,
    examTables: 10,
    plasticChairs: 10,
    parkingPlaces: 10,
    laptop: '',
    sound: '',
    screen: '',
    videoConferencing: '',
    dataProjector: '',
    internetConnection: '',
    microphone: '',
    wifi: '',
    remarks: '',
    brandingImage: [],
    proofOfPayment: null,
  });

  const handleVenueSelect = (venue) => {
    setSelectedVenue(venue);
    // Auto-fill the venue name field when a venue is selected
    setFormData(prev => ({
      ...prev,
      venue: venue.name
    }));
  };

  useEffect(() => {
    if (location.state && location.state.eventData) {
      const data = location.state.eventData;

      setFormData(prev => ({
        ...prev,
        eventTitle: data.title || '',
        venueType: data.venueType || '',
        venue: data.venue || '',
        campus: data.campus || '',
        typeOfFunction: data.typeOfFunction || '',
        typeOfGuests: data.typeOfGuests || [],
        purposeOfFunction: data.purposeOfFunction || '',
        numberOfGuestsExpected: data.numberOfGuestsExpected || '',
        dateOfCommencement: data.dateOfCommencement || '',
        endingDate: data.endingDate || '',
        timeOfCommencement: data.timeOfCommencement || '',
        timeToLockup: data.timeToLockup || '',
        useOfLiquor: data.useOfLiquor || '',
        kitchenFacilities: data.kitchenFacilities || '',
        cleaningServices: data.cleaningServices || '',
        steelTable: data.steelTable || 10,
        examTables: data.examTables || 10,
        plasticChairs: data.plasticChairs || 10,
        parkingPlaces: data.parkingPlaces || 10,
        laptop: data.laptop || '',
        sound: data.sound || '',
        screen: data.screen || '',
        videoConferencing: data.videoConferencing || '',
        dataProjector: data.dataProjector || '',
        internetConnection: data.internetConnection || '',
        microphone: data.microphone || '',
        wifi: data.wifi || '',
        remarks: data.remarks || '',
        brandingImage: data.brandingImage || [],
        proofOfPayment: data.proofOfPayment || null,
      }));
    }
  }, [location.state]);


  const [errors, setErrors] = useState({});
  const [brandingPreviews, setBrandingPreviews] = useState([]);
  const [paymentPreview, setPaymentPreview] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const toastTimerRef = React.useRef(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked 
          ? [...(prev[name] || []), value] 
          : (prev[name] || []).filter(item => item !== value)
      }));
    } else if (type === 'radio') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length) {
      setFormData(prev => ({
        ...prev,
        brandingImage: [...(prev.brandingImage || []), ...files]
      }));

      const newPreviews = files.map(f => ({
        file: f,
        url: URL.createObjectURL(f)
      }));

      setBrandingPreviews(prev => ([...prev, ...newPreviews]));
    }
  };

  const handlePaymentUpload = (e) => {
    const file = e.target.files?.[0];
    
    if (file) {
      const isPdf = file.type === 'application/pdf';
      setFormData(prev => ({
        ...prev,
        proofOfPayment: file
      }));

      setPaymentPreview({
        file: file,
        url: isPdf ? null : URL.createObjectURL(file),
        type: isPdf ? 'pdf' : 'image',
        name: file.name
      });
    }
  };

  useEffect(() => {
    return () => {
      brandingPreviews.forEach(p => {
        try {
          URL.revokeObjectURL(p.url);
        } catch (e) {
          console.error('Error revoking URL:', e);
        }
      });
      if (paymentPreview && paymentPreview.url) {
        try {
          URL.revokeObjectURL(paymentPreview.url);
        } catch (e) {
          console.error('Error revoking URL:', e);
        }
      }
    };
  }, [brandingPreviews, paymentPreview]);

  const removeImage = (index) => {
    setFormData(prev => {
      const next = [...(prev.brandingImage || [])];
      next.splice(index, 1);
      return { ...prev, brandingImage: next };
    });

    setBrandingPreviews(prev => {
      const next = [...prev];
      const removed = next.splice(index, 1)[0];
      if (removed && removed.url) {
        try {
          URL.revokeObjectURL(removed.url);
        } catch (e) {
          console.error('Error revoking URL:', e);
        }
      }
      return next;
    });
  };

  const removePayment = () => {
    if (paymentPreview && paymentPreview.url) {
      try {
        URL.revokeObjectURL(paymentPreview.url);
      } catch (e) {
        console.error('Error revoking URL:', e);
      }
    }
    setPaymentPreview(null);
    setFormData(prev => ({
      ...prev,
      proofOfPayment: null
    }));
  };

  const handleNumberChange = (name, delta) => {
    setFormData(prev => ({
      ...prev,
      [name]: Math.max(0, prev[name] + delta)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.eventTitle.trim()) {
      newErrors.eventTitle = 'Event title is required';
    }

    if (!formData.venueType) {
      newErrors.venueType = 'Please select a venue type';
    }

    if (!formData.venue.trim()) {
      newErrors.venue = 'Venue name is required';
    }

    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
      newErrors.emailAddress = 'Please enter a valid email address';
    }

    if (!formData.cell.trim()) {
      newErrors.cell = 'Cell number is required';
    }

    if (!formData.typeOfFunction) {
      newErrors.typeOfFunction = 'Please select a type of function';
    }

    if (formData.typeOfGuests.length === 0) {
      newErrors.typeOfGuests = 'Please select at least one guest type';
    }

    if (!formData.numberOfGuestsExpected || formData.numberOfGuestsExpected <= 0) {
      newErrors.numberOfGuestsExpected = 'Please enter the expected number of guests';
    }

    if (!formData.dateOfCommencement) {
      newErrors.dateOfCommencement = 'Commencement date is required';
    }

    if (!formData.endingDate) {
      newErrors.endingDate = 'Ending date is required';
    }

    const audiovisualServices = ['laptop', 'sound', 'screen', 'videoConferencing', 
                                  'dataProjector', 'internetConnection', 'microphone', 'wifi'];
    const hasAudiovisual = audiovisualServices.some(service => formData[service] === 'Yes');
    
    if (!hasAudiovisual) {
      newErrors.audiovisual = 'Please select at least one audiovisual service';
    }

    if (!termsAccepted) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);

    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showToastMessage('Please enter all required fields in the form before submitting');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const submissionData = {
      ...formData,
      selectedVenue: selectedVenue,
      termsAccepted: termsAccepted,
      submittedAt: new Date().toISOString()
    };

    console.log('Form submitted successfully:', submissionData);
    showToastMessage('Event booking request submitted successfully!');
  };

  return (
    <div className="create-event-page">
      <div className="create-event-container">
        <div className="create-event-wrapper">
          <div className="create-event-header">
            <button
              className="back-button"
              type="button"
              aria-label="Go back to dashboard"
              onClick={() => {
                window.location.href = '/dashboard';
              }}
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="create-event-title">Modify Event</h1>
          </div>


          <div className="create-event-form-wrapper">
            <div className="create-event-form">
              
              {/* BASIC INFORMATION */}
              <section className="form-section">
                <h2 className="section-title">Basic Information</h2>
                <div className="form-grid grid-3">
                  <div className="form-group">
                    <label className="form-label">Event Title *</label>
                    <input
                      type="text"
                      name="eventTitle"
                      value={formData.eventTitle}
                      onChange={handleInputChange}
                      placeholder="Enter Event Title"
                      className={`form-input ${errors.eventTitle ? 'error' : ''}`}
                    />
                    {errors.eventTitle && <p className="error-message">{errors.eventTitle}</p>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Venue Type *</label>
                    <select
                      name="venueType"
                      value={formData.venueType}
                      onChange={handleInputChange}
                      className={`form-input ${errors.venueType ? 'error' : ''}`}
                    >
                      <option value="">Select Venue Type</option>
                      <option value="indoor">Indoor</option>
                      <option value="outdoor">Outdoor</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                    {errors.venueType && <p className="error-message">{errors.venueType}</p>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Venue *</label>
                    <input
                      type="text"
                      name="venue"
                      value={formData.venue}
                      onChange={handleInputChange}
                      placeholder="Venue Name"
                      className={`form-input ${errors.venue ? 'error' : ''}`}
                    />
                    {errors.venue && <p className="error-message">{errors.venue}</p>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Campus</label>
                    <input
                      type="text"
                      name="campus"
                      value={formData.campus}
                      onChange={handleInputChange}
                      placeholder="Campus name"
                      className="form-input"
                    />
                  </div>


                </div>
              </section>

              {/* EVENT DETAILS */}
              <section className="form-section">
                <h2 className="section-title">Event Details</h2>
                
                <div className="form-grid grid-2">
                  <div>
                    <label className="form-label">Type of Function *</label>
                    <div className="radio-group">
                      {['Official', 'External', 'Academic related', 'Student', 'Private'].map(type => (
                        <label key={type} className="radio-label">
                          <input
                            type="radio"
                            name="typeOfFunction"
                            value={type}
                            checked={formData.typeOfFunction === type}
                            onChange={handleInputChange}
                          />
                          <span>{type}</span>
                        </label>
                      ))}
                    </div>
                    {errors.typeOfFunction && <p className="error-message">{errors.typeOfFunction}</p>}
                  </div>

                  <div>
                    <label className="form-label">Type of Guests *</label>
                    <div className="checkbox-group">
                      {['VIP', 'Special Protocol required', 'Media', 'Staff only', 'Student only'].map(type => (
                        <label key={type} className="checkbox-label">
                          <input
                            type="checkbox"
                            name="typeOfGuests"
                            value={type}
                            checked={formData.typeOfGuests.includes(type)}
                            onChange={handleInputChange}
                          />
                          <span>{type}</span>
                        </label>
                      ))}
                    </div>
                    {errors.typeOfGuests && <p className="error-message">{errors.typeOfGuests}</p>}
                  </div>
                </div>

               <div className="form-grid grid-2">
                   {/*<div className="form-group">
                    <label className="form-label">Nature of Function</label>
                    <input
                      type="text"
                      name="natureOfFunction"
                      value={formData.natureOfFunction}
                      onChange={handleInputChange}
                      placeholder="Nature of function"
                      className="form-input"
                    />
                  </div>
                  */}

                  <div className="form-group">
                    <label className="form-label">Purpose of Function</label>
                    <input
                      type="text"
                      name="purposeOfFunction"
                      value={formData.purposeOfFunction}
                      onChange={handleInputChange}
                      placeholder="Purpose of function"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Number of Guests Expected *</label>
                    <input
                      type="number"
                      name="numberOfGuestsExpected"
                      value={formData.numberOfGuestsExpected}
                      onChange={handleInputChange}
                      placeholder="Number of expected guests"
                      className={`form-input ${errors.numberOfGuestsExpected ? 'error' : ''}`}
                      min="1"
                    />
                    {errors.numberOfGuestsExpected && <p className="error-message">{errors.numberOfGuestsExpected}</p>}
                  </div>
                </div>

                <VenueCardGallery
                  selectedVenue={selectedVenue}
                  setSelectedVenue={handleVenueSelect}
                  minCapacity={parseInt(formData.numberOfGuestsExpected) || 0}
                />

              </section>

              {/* BRANDING */}
              <section className="form-section branding-section">
                <h2 className="section-title">Branding</h2>
                <div className="branding-upload-area">
                  <p className="upload-text">Drop Image here</p>
                  <p className="upload-format">Supported format: PNG, JPG</p>
                  
                  <div className="branding-buttons">
                    <label className="btn btn-upload">
                      Upload images
                      <input
                        type="file"
                        name="brandingImage"
                        onChange={handleImageUpload}
                        accept="image/png,image/jpeg"
                        multiple
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>

                  {brandingPreviews && brandingPreviews.length > 0 && (
                    <div className="uploaded-grid">
                      {brandingPreviews.map((p, i) => (
                        <div key={i} className="preview-item">
                          <img src={p.url} alt={`preview-${i}`} />
                          <button
                            type="button"
                            className="remove-preview"
                            onClick={() => removeImage(i)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {errors.brandingImage && <p className="error-message">{errors.brandingImage}</p>}
                </div>
              </section>

              {/* PROOF OF PAYMENT 
              <section className="form-section payment-section">
                <h2 className="section-title">Proof of Payment</h2>
                <div className="payment-upload-area">
                  <p className="upload-text">Upload proof of payment</p>
                  <p className="upload-format">Supported format: PNG, JPG, PDF</p>
                  
                  <div className="payment-buttons">
                    <label className="btn btn-upload">
                      Upload proof
                      <input
                        type="file"
                        name="proofOfPayment"
                        onChange={handlePaymentUpload}
                        accept="image/png,image/jpeg,application/pdf"
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>

                  {paymentPreview && (
                    <div className="uploaded-grid">
                      <div className="preview-item">
                        {paymentPreview.type === 'pdf' ? (
                          <div className="pdf-preview">
                            <span>📄 {paymentPreview.name}</span>
                          </div>
                        ) : (
                          <img src={paymentPreview.url} alt="payment-proof" />
                        )}
                        <button
                          type="button"
                          className="remove-preview"
                          onClick={removePayment}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )}

                  {errors.proofOfPayment && <p className="error-message">{errors.proofOfPayment}</p>}
                </div>
              </section>
              */}

              {/* PROGRAM SCHEDULE */}
              <section className="form-section">
                <h2 className="section-title">Program Schedule</h2>
                <div className="form-grid grid-3">
                  <div className="form-group">
                    <label className="form-label">Date of Commencement *</label>
                    <input
                      type="date"
                      name="dateOfCommencement"
                      value={formData.dateOfCommencement}
                      onChange={handleInputChange}
                      className={`form-input ${errors.dateOfCommencement ? 'error' : ''}`}
                    />
                    {errors.dateOfCommencement && <p className="error-message">{errors.dateOfCommencement}</p>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Ending Date *</label>
                    <input
                      type="date"
                      name="endingDate"
                      value={formData.endingDate}
                      onChange={handleInputChange}
                      className={`form-input ${errors.endingDate ? 'error' : ''}`}
                    />
                    {errors.endingDate && <p className="error-message">{errors.endingDate}</p>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Time of Commencement</label>
                    <input
                      type="time"
                      name="timeOfCommencement"
                      value={formData.timeOfCommencement}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Time to Lockup</label>
                    <input
                      type="time"
                      name="timeToLockup"
                      value={formData.timeToLockup}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                </div>
              </section>

              {/* SERVICES REQUIRED */}
              <section className="form-section">
                <h2 className="section-title">Services Required</h2>
                
                <div className="form-grid grid-1">
                  <div>
                    <label className="form-label">Use of Liquor</label>
                    <div className="radio-inline">
                      <label className="radio-label-inline">
                        <input
                          type="radio"
                          name="useOfLiquor"
                          value="Yes"
                          checked={formData.useOfLiquor === 'Yes'}
                          onChange={handleInputChange}
                        />
                        <span>Yes</span>
                      </label>
                      <label className="radio-label-inline">
                        <input
                          type="radio"
                          name="useOfLiquor"
                          value="No"
                          checked={formData.useOfLiquor === 'No'}
                          onChange={handleInputChange}
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Kitchen Facilities</label>
                    <div className="radio-inline">
                      <label className="radio-label-inline">
                        <input
                          type="radio"
                          name="kitchenFacilities"
                          value="Yes"
                          checked={formData.kitchenFacilities === 'Yes'}
                          onChange={handleInputChange}
                        />
                        <span>Yes</span>
                      </label>
                      <label className="radio-label-inline">
                        <input
                          type="radio"
                          name="kitchenFacilities"
                          value="No"
                          checked={formData.kitchenFacilities === 'No'}
                          onChange={handleInputChange}
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Cleaning Services</label>
                    <div className="radio-inline">
                      <label className="radio-label-inline">
                        <input
                          type="radio"
                          name="cleaningServices"
                          value="Yes"
                          checked={formData.cleaningServices === 'Yes'}
                          onChange={handleInputChange}
                        />
                        <span>Yes</span>
                      </label>
                      <label className="radio-label-inline">
                        <input
                          type="radio"
                          name="cleaningServices"
                          value="No"
                          checked={formData.cleaningServices === 'No'}
                          onChange={handleInputChange}
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-grid grid-4">
                  {[
                    { label: 'Steel Table', name: 'steelTable' },
                    { label: 'Exam Tables', name: 'examTables' },
                    { label: 'No. of Plastic Chairs', name: 'plasticChairs' },
                    { label: 'No. of Parking Places', name: 'parkingPlaces' }
                  ].map(item => (
                    <div key={item.name} className="form-group">
                      <label className="form-label">{item.label}</label>
                      <div className="number-input">
                        <button
                          type="button"
                          onClick={() => handleNumberChange(item.name, -1)}
                          className="number-btn"
                        >
                          −
                        </button>
                        <span className="number-display">{formData[item.name]}</span>
                        <button
                          type="button"
                          onClick={() => handleNumberChange(item.name, 1)}
                          className="number-btn"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* AUDIOVISUAL SERVICES */}
              <section className="form-section">
                <h2 className="section-title">Audiovisual Services</h2>
                {errors.audiovisual && <p className="error-message">{errors.audiovisual}</p>}
                
                <div className="form-grid grid-1">
                  {[
                    { label: 'Laptop', name: 'laptop' },
                    { label: 'Data Projector', name: 'dataProjector' },
                    { label: 'Sound', name: 'sound' },
                    { label: 'Internet Connection', name: 'internetConnection' },
                    { label: 'Screen', name: 'screen' },
                    { label: 'Microphone', name: 'microphone' },
                    { label: 'Video Conferencing', name: 'videoConferencing' },
                    { label: 'Wi-fi', name: 'wifi' }
                  ].map(service => (
                    <div key={service.name}>
                      <label className="form-label">{service.label}</label>
                      <div className="radio-inline">
                        <label className="radio-label-inline">
                          <input
                            type="radio"
                            name={service.name}
                            value="Yes"
                            checked={formData[service.name] === 'Yes'}
                            onChange={handleInputChange}
                          />
                          <span>Yes</span>
                        </label>
                        <label className="radio-label-inline">
                          <input
                            type="radio"
                            name={service.name}
                            value="No"
                            checked={formData[service.name] === 'No'}
                            onChange={handleInputChange}
                          />
                          <span>No</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ADDITIONAL INFORMATION */}
              <section className="form-section">
                <h2 className="section-title">Additional Information</h2>
                <div className="form-group">
                  <label className="form-label">Remarks</label>
                  <textarea
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleInputChange}
                    placeholder="Any additional arrangements or special requirements..."
                    rows="5"
                    className="form-textarea"
                  />
                </div>
              </section>

              {/* TERMS AND CONDITIONS */}
              <section className="form-section">
                <TermsCheckbox 
                  onDecision={(accepted) => {
                    setTermsAccepted(accepted);
                    if (errors.terms) {
                      setErrors(prev => ({ ...prev, terms: '' }));
                    }
                  }}
                />
                {errors.terms && <p className="error-message">{errors.terms}</p>}
              </section>

              {/* SUBMIT BUTTON */}
              <div className="form-footer">
              <button
               type="button"
             onClick={() => navigate('/confirm-modified-details', { state: { modifiedData: formData } })} // <-- navigate to ConfirmEventDetails page with modified data
             className="btn btn-primary"
             >
               Modify Request
             </button>
               </div>
              
            </div>

            {/* TOAST NOTIFICATION */}
            {showToast && (
              <div className="bottom-toast" role="status" aria-live="polite">
                <div className="bottom-toast-inner">
                  <span className="toast-message">{toastMessage}</span>
                  <button
                    type="button"
                    className="toast-close"
                    aria-label="Dismiss notification"
                    onClick={() => {
                      setShowToast(false);
                      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
                    }}
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}