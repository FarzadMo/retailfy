import React from "react";
import"./style.css"

function Nav({ children }) {
  return (
    <nav className="navbar " id="nav">
      {children}
    </nav>
  );
}

export default Nav;
