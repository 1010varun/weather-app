import React from 'react';

const Footer = (props) => {
  return (
    <footer style={footerStyle} className={`${props.bottom} ${props.position}`}>
      <p> Made with ❤️ by &copy;1010varun</p>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: '#8250DF',
  color:'white',
  padding: '1rem',
  textAlign: 'center',
  width: '100%',
};

export default Footer;