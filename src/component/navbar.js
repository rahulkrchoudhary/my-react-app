import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navStyle = {
    backgroundColor: "darkslategray",
    color: "white",
    padding: "10px",
    
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    marginRight: "10px",
  
  };

  const activeLinkStyle = {
    color: "lightblue",
   
  };

  return (
    <nav style={navStyle}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <NavLink style={linkStyle} activeStyle={activeLinkStyle} to="/">
          fäm
        </NavLink>

        <div>
          <ul style={{ display: "flex", listStyle: "none", padding: 0 }}>
            <li>
              <NavLink
                style={linkStyle}
                activeStyle={activeLinkStyle}
                to="/report"
              >
                Report
              </NavLink>
            </li>
            {/* Add more list items with NavLink as needed */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
