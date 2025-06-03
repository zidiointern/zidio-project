// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  // Fetch user profile with token
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          logout();
          return;
        }

        const res = await axios.get('http://localhost:8080/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(res.data);
      } catch (error) {
        console.error('Failed to fetch profile. Redirecting to login.', error);
        logout();
      }
    };

    fetchProfile();
  }, []);

  if (!userData) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</p>;
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem' }}>
      <h2>Dashboard</h2>
      <p>Welcome, <strong>{userData.name}</strong>!</p>
      <p>Email: {userData.email}</p>
      <p>Role: {userData.role || 'USER'}</p>

      <button onClick={logout} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
