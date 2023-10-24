import React from "react";
import { Row, Col } from "react-bootstrap";
import "./Home.css";

function Home() {
    return (
        <Row>
            <Col md={1}>  </Col>
            <Col md={5} className="d-flex flex-direction-column align-items-center justify-content-center">
                <div>
                    <h1>Web-Based Face Recognition System for Monitoring Event Attendance at TSU-CCS AVR</h1>
                    <p>This system utilizes web technology and face recognition to monitor event attendance at the TSU-CCS AVR (Audio-Visual Room). It allows for easy and efficient tracking of participants using their facial features.</p>
                </div>
            </Col>
            <Col md={5} className="home__bg justify-content-center"></Col>
        </Row>
    );
}

export default Home;
