// UserPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './UserPage.css'; // Import the external CSS file

function UserPage() {
    const navigate = useNavigate();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/profile-pic-section')
  };

  return (
    <div className="container">
      <h1>User Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserPage;
