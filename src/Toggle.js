import React, { useState } from 'react';
import { FaToggleOff } from "react-icons/fa6";
import { FaToggleOn } from "react-icons/fa6";
const Toggle = ({ onToggle }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    onToggle(!isDarkMode);
  };

  return (
    <div className="toggle-container" style={{marginLeft:'1220px'}}>
      {isDarkMode ? (
        <button onClick={handleToggle} className="toggle-button"> <FaToggleOn size={30} />  
        </button>
      ) : (
        <button onClick={handleToggle} className="toggle-button" style={{}}><FaToggleOff size={20}/>
        </button>
      )}
    </div>
  );
};

export default Toggle;
