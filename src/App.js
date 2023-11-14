import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ProfilePicSection from './components/profile/ProfilePicSection'
import UserPage from './components/UserPage';
import { socketConnect } from 'socket.io-react';

function App(props) {

  function sendMessage() {
    props.socket.emit('message', 'Hello world!');
  }

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<UserPage />} />
      <Route exact path="/profile-pic-section" element={<ProfilePicSection />} />
      {/* <Route path="/user" element={<UserPage />} /> */}
    </Routes>
    </BrowserRouter>
    <button onClick={sendMessage}>
      Send!
    </button>
    </>
    
      
  );
}

export default socketConnect(App);
