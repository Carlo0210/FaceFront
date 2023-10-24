import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserInformation from "./pages/UserInfomation";
import EventInformation from "./pages/EventInformation";
import EventMonitorings from "./pages/EventMonitoting";
import Reports from "./pages/Reports";
import RegistrationForm  from "./pages/RegistrationForm";
import EventForm  from "./pages/EventForm";
import AttendeeForm  from "./pages/AttendeeForm";
import { useSelector } from "react-redux";
import FaceScanner from './pages/faceRecognition';
import AttendeeInfo from './pages/AttendeeInformation';
import AttendeeInfo2 from './pages/AttendeesInformation';
import FaceScanner2 from './pages/FaceScanner';

function App() {
    const user = useSelector((state) => state.user);

    // Helper function to render Login page only if user is not logged in
    const RenderLoginIfNotLoggedIn = () => {
        return !user ? <Login /> : <Navigate to="/" />;
    };

    


    return (
        <BrowserRouter>
            <div className="app">
                {user ? null : <Navigation />}
                <Routes>
                    <Route path="/registerAttendees" element={<FaceScanner />} />
                </Routes>
                <div className="Main-Content">
                    {user ? <Sidebar /> : null}
                    <main className="content">
                        {user ? <Topbar /> : null}
                        <div className="inner-content">
                            <Routes>
                                <Route path="/" element={user ? null :<Home />} />
                                <Route path="/login" element={<RenderLoginIfNotLoggedIn />} />
                                <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
                                <Route path="/UserInformation" element={user ? <UserInformation /> : <Navigate to="/login" />} />
                                <Route path="/EventInformation" element={user ? <EventInformation /> : <Navigate to="/login" />} />
                                <Route path="/EventMonitoring" element={user ? <EventMonitorings /> : <Navigate to="/login" />} />
                                <Route path="/Reports" element={user ? <Reports /> : <Navigate to="/login" />} />
                                <Route path="/event" element={user ? <EventForm /> : <Navigate to="/login" />} />
                                <Route path="/AttendeeInformation" element={user ? <AttendeeInfo /> : <Navigate to="/login" />} />
                                <Route path="/UserMonitor" element={user ? <AttendeeInfo2 /> : <Navigate to="/login" />} />
                                <Route path="/FaceScanner" element={user ? <FaceScanner2 /> : <Navigate to="/login" />} />
  
                                <Route path="/register" element={user ? <RegistrationForm /> : <Navigate to="/login" />} />
                            </Routes>
                        </div>
                    </main>
                </div>
            </div>
        </BrowserRouter>
    );
}


export default App;
