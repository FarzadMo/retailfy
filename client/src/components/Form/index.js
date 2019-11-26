import React from "react";

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  return (
    <div className="form-group ">

      <input className="form-control" {...props} />
    </div>
  );
}

export function TextArea(props) {
  return (

    <div className="form-group">
      <textarea className="form-control" rows="20" {...props} />
    </div>
  );
}

export function FormBtn(props) {
  return (
    <button {...props} style={{ float: "right", fontFamily: "'Poppins', 'sans-serif'", marginBottom: 10, backgroundColor: "#3D820A", color: "white", borderRadius:"25px" }} className="btn">
      {props.children}
    </button>
  );
}
