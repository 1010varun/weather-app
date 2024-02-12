import React, { useState } from "react";
import day from './day.png'
import night from './night.png'

const Navbar = (props) => {
  const [nightMode ,setNightMode] = useState(true);
  return (
    
    <nav className={`navbar`} id="navbar" style={{ backgroundColor: "#8250DF" }}>
      <div className="container">
        <span
          className=" ms-5 mb-0 h3 text-center"
          style={{ color: "white", fontFamily: "Dancing Script, cursive" }}
        >
          tru Weather
        </span>
        <div className="form-check form-switch" onClick={() => setNightMode(!nightMode)}>
          {/* <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" /> */}
          {
            nightMode ? <img src={day} onClick={props.toggleMode} className="mx-2" style={{ width: '30px', cursor: 'pointer' }} alt="" /> :
            <img src={night} onClick={props.toggleMode} className="mx-2 bg-white p-2 rounded-sm" style={{ width: '40px', cursor: 'pointer' }} alt="" />
          }
          {/* <label className="form-check-label" htmlFor="flexSwitchCheckDefault" style={{ color: 'white' }} id="toggle-label" >Enable Dark Mode</label> */}

        </div>
      </div>

    </nav>
  );
};

export default Navbar;