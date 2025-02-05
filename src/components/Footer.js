import React from 'react';

function Footer() {
  const footerStyle = {
    position: 'fixed',
    bottom: '0',
    left: '0',
    width: '100%',
    backgroundColor: 'white',  
    color: '#333',  
    textAlign: 'center',
    padding: '10px 0',
    fontSize: '14px',
    borderTop: '2px solid #ccc', 
    boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',  
  };

  const footerTextStyle = {
    margin: '0',
  };

  return (
    <div style={footerStyle}>
      <p style={footerTextStyle}>Copyright &copy; 2025. All rights reserved.</p>
    </div>
  );
}

export default Footer;
