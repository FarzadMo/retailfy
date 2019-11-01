import React from "react";
import { Link } from "react-router-dom"
import "./style.css";

function SearchResults(props) {
  return (
    <ul className="list-group search-results">
      {props.results.map(result => (
        <li key={result} className="list-group-item">
          <img
            alt={result.category}
            src="https://1001freedownloads.s3.amazonaws.com/vector/thumb/63319/Placeholder.png"
            className="img-fluid"
          />
          <Link to={"/detail/" + result.id}>
            <h3> Title: {result.title}</h3>
          </Link>

          <h3>Price: {result.price}</h3>
          <p>Description: {result.description}</p>
        </li>
      ))}
    </ul>
  );
}

export default SearchResults;
