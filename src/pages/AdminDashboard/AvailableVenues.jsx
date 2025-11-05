import React, { useState, useEffect } from "react";
import "../../styles/pages/_availablevenues.scss";
import { MdAddCircle, MdImage, MdDelete, MdEdit } from "react-icons/md";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function AvailableVenues() {
  const [venues, setVenues] = useState([]);
  const [venueData, setVenueData] = useState({
    name: "",
    location: "",
    price: "",
    capacity: "",
    images: [],
    type: "", // Added venue type
  });
  const [editIndex, setEditIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Load saved venues from localStorage on mount
  useEffect(() => {
    const storedVenues = localStorage.getItem("venues");
    if (storedVenues) {
      setVenues(JSON.parse(storedVenues));
    }
  }, []);

  const openModal = () => {
    setVenueData({ name: "", location: "", price: "", capacity: "", images: [], type: "" });
    setEditIndex(null);
    setModalVisible(true);
  };

  const handlePickImage = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setVenueData({ ...venueData, images: [...venueData.images, ...urls] });
  };

  const handleDeleteImage = (index) => {
    setVenueData({
      ...venueData,
      images: venueData.images.filter((_, i) => i !== index),
    });
  };

  // Save or update venue
  const handleSave = () => {
    if (!venueData.name || !venueData.location || !venueData.price || !venueData.capacity || !venueData.type) {
      alert("Please fill in all fields.");
      return;
    }

    let updatedVenues;
    if (editIndex !== null) {
      updatedVenues = [...venues];
      updatedVenues[editIndex] = venueData;
    } else {
      updatedVenues = [...venues, venueData];
    }

    setVenues(updatedVenues);
    localStorage.setItem("venues", JSON.stringify(updatedVenues));

    setVenueData({ name: "", location: "", price: "", capacity: "", images: [], type: "" });
    setEditIndex(null);
    setModalVisible(false);
  };

  // Edit venue
  const handleEdit = (index) => {
    setVenueData(venues[index]);
    setEditIndex(index);
    setModalVisible(true);
  };

  // Delete venue
  const handleDelete = (index) => {
    const updated = venues.filter((_, i) => i !== index);
    setVenues(updated);
    localStorage.setItem("venues", JSON.stringify(updated));
  };

  return (
    <div className="available-venues-container">
      <h2 className="header">Available Venues</h2>

      <button className="add-button" onClick={openModal}>
        <MdAddCircle size={20} style={{ marginRight: 5 }} />
        Add Venue
      </button>

      {venues.length === 0 && <p className="empty-text">No venues available</p>}

      <div className="venues-list">
        {venues.map((item, index) => (
          <div className="venue-card" key={index}>
            {item.images.length > 0 ? (
              <Carousel showThumbs={false} infiniteLoop useKeyboardArrows>
                {item.images.map((img, i) => (
                  <img key={i} src={img} alt="venue" className="carousel-image" />
                ))}
              </Carousel>
            ) : (
              <div className="placeholder">
                <MdImage size={40} color="#0077B6" />
              </div>
            )}

            <h3>{item.name}</h3>
            <p>Location: {item.location}</p>
            <p>Price: R{item.price}</p>
            <p>Capacity: {item.capacity}</p>
            <p>Type: {item.type}</p> {/* Display venue type */}

            <div className="actions">
              <button onClick={() => handleEdit(index)}>
                <MdEdit /> Edit
              </button>
              <button onClick={() => handleDelete(index)}>
                <MdDelete /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editIndex !== null ? "Edit Venue" : "Add Venue"}</h3>

            <input type="file" multiple accept="image/*" onChange={handlePickImage} />

            <div className="image-preview">
              {venueData.images.map((img, i) => (
                <div key={i} className="image-container">
                  <img src={img} alt="preview" />
                  <button onClick={() => handleDeleteImage(i)}>X</button>
                </div>
              ))}
            </div>

            <input
              type="text"
              placeholder="Venue Name"
              value={venueData.name}
              onChange={(e) => setVenueData({ ...venueData, name: e.target.value })}
            />

            <select
              value={venueData.location}
              onChange={(e) => setVenueData({ ...venueData, location: e.target.value })}
            >
              <option value="" disabled>Select Location</option>
              <option value="Polokwane">Polokwane</option>
              <option value="Emalahleni">Emalahleni</option>
            </select>

            <select
              value={venueData.type}
              onChange={(e) => setVenueData({ ...venueData, type: e.target.value })}
            >
              <option value="" disabled>Select Venue Type</option>
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Hybrid">Hybrid</option>
            </select>

            <input
              type="number"
              placeholder="Price"
              value={venueData.price}
              onChange={(e) => setVenueData({ ...venueData, price: e.target.value })}
            />
            <input
              type="number"
              placeholder="Capacity"
              value={venueData.capacity}
              onChange={(e) => setVenueData({ ...venueData, capacity: e.target.value })}
            />

            <div className="modal-actions">
              <button onClick={handleSave}>{editIndex !== null ? "Update" : "Save"}</button>
              <button onClick={() => setModalVisible(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
