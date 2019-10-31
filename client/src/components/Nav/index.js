import React from "react";

function Nav({ children }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      {children}
    </nav>
  );
}

export default Nav;
