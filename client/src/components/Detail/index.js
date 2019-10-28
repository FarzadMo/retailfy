import React from "react";
import "./style.css";

function Detail(props) {
  return (
    <ul className="list-group search-results">
      {props.results.map(result => (
        <li key={result} className="list-group-item">
          <h3> Title: {result.title}</h3>
          <h3> Category: {result.category}</h3>
          <h3> Location: {result.location}</h3>
          <h3> Price: {result.price}</h3>
          <h3> Contact Info: {result.contactEmail}</h3>
          <p> Description: {result.description}</p>
          <img
            alt={result.category}
            src="https://1001freedownloads.s3.amazonaws.com/vector/thumb/63319/Placeholder.png"
            //src = {result.image}
            className="img-fluid"
          />
        </li>
      ))}
    </ul>
  );
}

export default Detail;
