import React from "react";

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  return (
    <div className="form-group ">
      <label style={{ fontFamily: "open sans" }} htmlFor={props.name}>{props.name}</label>
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
    <button {...props} style={{ float: "right", marginBottom: 10, backgroundColor: "#c10a26", color: "white", fontFamily: "open sans" }} className="btn">
      {props.children}
    </button>
  );
}
