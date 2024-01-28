import React from "react";
import daynight from './day-and-night.png'


const Navbar = (props) => {
  return (
    
    <nav className={`navbar`} id="navbar" style={{ backgroundColor: "#8250DF" }}>
      <div className="container">
        <span
          className=" ms-5 mb-0 h3 text-center"
          style={{ color: "white", fontFamily: "Dancing Script, cursive" }}
        >
          tru Weather
        </span>
        <div className="form-check form-switch">
          {/* <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" /> */}
          <img src={daynight} onClick={props.toggleMode} className="mx-2" style={{ width: '40px', cursor: 'pointer' ,  filter: 'drop-shadow(rgb(34, 34, 34) 1px 2px 4px)' }} alt="" />
          {/* <label className="form-check-label" htmlFor="flexSwitchCheckDefault" style={{ color: 'white' }} id="toggle-label" >Enable Dark Mode</label> */}

        </div>
      </div>

    </nav>
  );
};

export default Navbar;