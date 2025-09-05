import React from 'react';

const NotFound = () => {
  const styles = {
    container: {
      textAlign: 'center',
      padding: '100px 20px',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #f0f0f0, #c0c0c0)',
      height: '100vh',
      color: '#333',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: '6rem',
      marginBottom: '20px',
    },
    message: {
      fontSize: '1.5rem',
      marginBottom: '40px',
      lineHeight: '1.5',
    },
    button: {
      padding: '15px 30px',
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#fff',
      backgroundColor: '#555',
      border: 'none',
      borderRadius: '30px',
      cursor: 'pointer',
      transition: '0.3s',
    },
  };

  const goHome = () => {
    window.location.href = '/';
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>404</div>
      <div style={styles.message}>
        Whoops! This page went to find a straw 🍹<br />
        
        Don’t worry, the mocktails are still waiting for you!
      </div>
      <button
        style={styles.button}
        onClick={goHome}
        onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
        onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
      >
        Take me back to home!
      </button>
    </div>
  );
};

export default NotFound;
