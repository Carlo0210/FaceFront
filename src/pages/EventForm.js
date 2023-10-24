import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap'; // Import Row and Col from Bootstrap
import './EventForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faInfoCircle, faUser } from '@fortawesome/free-solid-svg-icons';


const EventForm = () => {
  const user = useSelector((state) => state.user);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState(user.name);
  const [createdId, setCreatedId] = useState(user._id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://faceback.onrender.com/events', {
        title,
        date,
        description,
        createdBy,
        createdId,
      });
      alert('Event created successfully!');
      // Clear form inputs
      setTitle('');
      setDate('');
      setDescription('');
      setCreatedBy('');
      setCreatedId('');
    } catch (error) {
      console.error(error);
      alert('Failed to create event.');
    }
  };


    // Define a function to get the current date in the format 'yyyy-MM-dd'
    const getCurrentDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };


  return (
    <div className='Eventcontainer'>
      <h2 className='text-center'>Create event</h2>
      <form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <h5><FontAwesomeIcon icon={faInfoCircle} className="fa-icon" /> Title</h5>
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Col>
        <Col md={6}>
          <h5><FontAwesomeIcon icon={faCalendar} className="fa-icon" /> Date</h5>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={getCurrentDate()} // Set a minimum date
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <h5><FontAwesomeIcon icon={faInfoCircle} className="fa-icon" /> Description</h5>
          <textarea
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Col>
      </Row>
      <Row className="hidden-row">
        <Col>
          <h5><FontAwesomeIcon icon={faUser} className="fa-icon" /> Created By:</h5>
          <input
            type="text"
            className="form-control"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
            disabled 
          />
        </Col>
      </Row>
      <Row className="hidden-row">
        <Col>
          <h5><FontAwesomeIcon icon={faUser} className="fa-icon" /> Created By:</h5>
          <input
            type="text"
            className="form-control"
            value={createdId}
            onChange={(e) => setCreatedId(e.target.value)}
            disabled 
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <div className="button-container">
            <button type="submit" className="btn btn-primary" style={{borderRadius: "35px",  fontWeight: "bold", backgroundColor: "green", color: "white" }}>
              Save
            </button>
          </div>
        </Col>
      </Row>
      </form>
    </div>
  );
};

export default EventForm;
