import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css"

const Navbarsite = () => {
    return (
        <Navbar color="dark" dark>
            <NavbarBrand href="/" className="nav">
                {/* <img alt="logo" src="" style={{ height: 40, width: 40 }} /> */}
                truWeather
            </NavbarBrand>
        </Navbar>
    )
}

export default Navbarsite;