import React from "react";
import {Link, NavLink} from "react-router-dom";
import logo from "../assets/icons8-spiderman-24.png";


function Header () {
    return (
        <header> 
        <Link to="/" className="logo"> 
        <img src= {logo} alt="Collision Comics"/> Collision Comics
        </Link> 

        <nav> 
            <NavLink to= "/">Home </NavLink>
            <NavLink to= "/comics">Comics </NavLink>
            <NavLink to= "/about">About </NavLink>

        </nav>
        
    </header>
    );
}

export default Header;