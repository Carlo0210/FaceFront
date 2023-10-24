import React, { useState, useEffect } from 'react';
import axios from 'axios';
import botImg from '../assets/bot.jpeg';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import './RegistrationForm.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RegisterForm = () => {
  const users = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    userType: '',
    name: '',
    email: '',
    password: '',
    activationDate: '',
    expirationDate: '',
    picture: '',
    userCreatedId: users._id,
  });

  // Image upload states
  const [image, setImage] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState();

  function validateImg(e) {
    const file = e.target.files[0];
    if (file.size >= 2097152) {
      return alert('Max file size is 2mb');
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function uploadImage() {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'jmkohxmf');
    try {
      setUploadingImg(true);
      let res = await fetch('https://api.cloudinary.com/v1_1/aspiree14/image/upload', {
        method: 'post',
        body: data,
      });
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url;
    } catch (error) {
      setUploadingImg(false);
      console.log(error);
      throw new Error('Failed to upload image');
    }
  }

  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // Check if the logged-in user is an admin and set the user type accordingly
    if (user.userType === 'Admin') {
      setFormData({
        ...formData,
        userType: 'Event Organizer',
        activationDate: '',
        expirationDate: '',
      });
    }
    if (user.userType === 'Event Organizer') {
      setFormData({
        ...formData,
        userType: 'Event Monitoring',
        activationDate: '',
        expirationDate: '',
      });
    }
  }, [user.userType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!image) return alert('Please upload your profile picture');

      // Uploading the image and getting the URL
      const imageUrl = await uploadImage();

      // Set the picture URL to formData
      formData.picture = imageUrl;

      // Save the user data to MongoDB using your back-end API
      const response = await axios.post('https://faceback.onrender.com/users', formData);
      console.log(response.data.message);

      // Show loading here before navigation
      setUploadingImg(true);
      setTimeout(() => {
        setUploadingImg(false);
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Failed to register:', error.response?.data?.error || error.message);
      // You can show an error message here
      setError(error.message);
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
    <Container>
      <Row>
        <div className="d-flex align-items-center justify-content-center flex-direction-column">
          <Form style={{ width: "100%", maxWidth: 1000 }} onSubmit={handleSubmit}>
            <div>
              <h1 className="text-center">Create an account</h1>
              <div className="signup-profile-pic__container">
                <img src={imagePreview || botImg} className="signup-profile-pic" alt="" />
                <label htmlFor="image-upload" className="image-upload-label">
                  <i className="fas fa-plus-circle add-picture-icon"></i>
                </label>
                <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg} />
              </div>
            </div>
            {error && <p className="alert alert-danger">{error.data}</p>}
            <Row>
              <Col md={6} className="mb-3" controlId="formUserType">
                <Form.Label>User Type:</Form.Label>
                <Form.Select name="userType" value={formData.userType} onChange={handleChange} required disabled>
                  <option value="">Select User Type</option>
                  <option value="Admin">Admin</option>
                  <option value="Event Organizer">Event Organizer</option>
                  <option value="Event Monitoring">Event Monitoring</option>
                </Form.Select>
              </Col>
              <Col md={6} className="mb-3" controlId="formBasicName">
                <Form.Label>Name:</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
              </Col>
              <Col md={6} className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>
            <Row className="hidden-row">
              <Col md={6} className="mb-3" controlId="formBasicEmail">
                <Form.Label>createdBy:</Form.Label>
                <Form.Control type="text" name="createdBy" value={formData.userCreatedId} onChange={handleChange} required />
              </Col>
            </Row>
            {formData.userType !== 'Admin' && (
              <>
                <Row>
                  <Col md={6} className="mb-3" controlId="formBasicActivationDate">
                    <Form.Label>Activation Date:</Form.Label>
                    <Form.Control
                      type="date"
                      name="activationDate"
                      value={formData.activationDate}
                      onChange={handleChange}
                      required
                      min={getCurrentDate()} // Set a minimum date
                    />
                  </Col>
                  <Col md={6} className="mb-3" controlId="formBasicExpirationDate">
                    <Form.Label>Expiration Date:</Form.Label>
                    <Form.Control
                      type="date"
                      name="expirationDate"
                      value={formData.expirationDate}
                      onChange={handleChange}
                      required
                      min={getCurrentDate()} // Set a minimum date
                    />
                  </Col>
                </Row>
              </>
            )}
            {/* Show loading text when uploadingImg is true */}
            <div className="mb-3 justify-content-end">
              <button variant="primary" type="submit" className="custom-button" style={{ borderRadius: "35px", fontWeight: "bold", backgroundColor: "green", color: "white" }}>
                {uploadingImg ? <p>Saving...</p> : "Save"}
              </button>
            </div>
          </Form>
        </div>
      </Row>
    </Container>
  );
};

export default RegisterForm;
  