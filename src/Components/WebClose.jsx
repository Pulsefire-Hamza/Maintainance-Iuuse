import React from 'react';

const WebClose = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>🚧 Website Under Maintenance 🚧</h1>
        <p style={styles.message}>We're working on some exciting updates! We apologize for any inconvenience.</p>
        <p style={styles.note}>Thank you for your patience. We'll be back online shortly!</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f6f9', // Light grayish-blue background
    textAlign: 'center',
    animation: 'fadeIn 1.5s ease-out',
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent background for content box
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '3rem',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  message: {
    fontSize: '1.5rem',
    color: '#555',
    marginBottom: '15px',
    fontFamily: 'Arial, sans-serif',
  },
  note: {
    fontSize: '1.2rem',
    color: '#777',
    marginTop: '20px',
    fontFamily: 'Arial, sans-serif',
  },
};

export default WebClose;
