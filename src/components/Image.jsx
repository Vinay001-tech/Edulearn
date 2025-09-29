import React from 'react';

const HeroSection = () => {
  const styles = {
    container: {
      position: 'relative',
      width: '100%',
      height: '400px',
      overflow: 'hidden',
      fontFamily: 'sans-serif'
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      opacity: 0.6, // Faded look
    },
    overlay: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      color: 'white',
    },
    heading: {
      fontSize: '2.5rem',
      marginBottom: '1rem',
    },
    subtext: {
      fontSize: '1.2rem',
      marginBottom: '1.5rem',
    },
    button: {
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      backgroundColor: '#ffffff',
      color: '#000',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#f0f0f0',
    }
  };

  return (
    <div style={styles.container}>
      <img
        src="Image.jsx" // Replace with your actual image path
        alt="Hero"
        style={styles.image}
      />
      <div style={styles.overlay}>
        <h1 style={styles.heading}>Your Headline</h1>
        <p style={styles.subtext}>This is a subheading or description.</p>
        <button
          style={styles.button}
          onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#ffffff'}
        >
          Click Me
        </button>
      </div>
    </div>
  );
};

export default HeroSection;