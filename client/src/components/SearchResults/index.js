import React from "react";
import { Link } from "react-router-dom"
import "./style.css";
import Radium from "radium";

///////////////media query/////////

var firstcolstyle={
  width: "250px",
   height: "340px",
    display: "inline-block",

    "@media(max-width:1125px)":{
      width:"220px",
      height:"280px",
      marginLeft:"20px"
    },
"@media(max-width:640px)":{
  width:"180px",
  height:"240px",
  marginLeft:"20px"
}
}
var secondcolstyle={
  width: "250px",
   height: "340px",
    display: "inline-block",
    "@media(max-width:1125px)":{
      width:"220px",
      height:"280px",
      marginLeft:"10px"
    },
"@media(max-width:640px)":{
  width:"180px",
  height:"240px",
  marginLeft:"10px"
}
}
////////////////////////

function SearchResults(props) {
  // split the original array into a collection of two item sets
  // when the length of array is odd, the last item doesnot get into splitresults so we display it seperatly
  // in a div - line 24
  var splitResults = [];
  var propResult = props.results;


  propResult.forEach((item, index) => {
    if (index % 2 & index > 0) {
      splitResults.unshift([propResult[index - 1], propResult[index]]);
    }
  });


  return (
    <div>
      <div>
        {(propResult.length % 2) ? (
          <div style={{ width: "50%", display: "inline-block" }}>

            <img
              alt={propResult[propResult.length - 1].category}
              src={`${propResult[propResult.length - 1].image}`}
              className="img-fluid"
              style={firstcolstyle}
            />
            <Link style={{ color: "black" }} to={"/detail/" + propResult[propResult.length - 1].id}>
              <p style={{ marginBottom: "0", fontSize: "12px", fontFamily: 'Open Sans', marginTop: "15px" }}> {propResult[propResult.length - 1].title}</p>
            </Link>

            <p style={{ fontSize: "12px", fontFamily: 'Open Sans' }}>{propResult[propResult.length - 1].price} CAD</p>

          </div>
        ) : (<div style={{ display: "none" }}></div>)}
      </div>
      {splitResults.map(result => (
        <div style={{ width: "100%", display: "block", marginBottom: "40px" }} >
          <div style={{ width: "50%", display: "inline-block" }} >
            {console.log(result[0].image)}
            <img
              alt={result[0].category}
              src={`${result[0].image}`}
              className="img-fluid"
              id="image"
              style={firstcolstyle}
            />
            <Link style={{ color: "black" }} to={"/detail/" + result[0].id}>
              <p style={{ marginBottom: "0", fontSize: "12px", fontFamily: 'Open Sans', marginTop: "15px" }}> {result[0].title}</p>
            </Link>
            <p style={{ marginBottom: "0", fontSize: "12px", fontFamily: 'Open Sans' }}>{result[0].price} CAD</p>

          </div>
          <div style={{ width: "50%", display: "inline-block" }}>
            {console.log(result[1].image)}
            <img
              alt={result[1].category}
              src={`${result[1].image}`}
              className="img-fluid"
              style={secondcolstyle}
            />
            <Link style={{ color: "black" }} to={"/detail/" + result[1].id}>
              <p style={{ marginBottom: "0", fontSize: "12px", fontFamily: 'Open Sans', marginTop: "15px" }}> {result[1].title}</p>
            </Link>

            <p style={{ fontSize: "12px", fontFamily: 'Open Sans' }}>{result[1].price} CAD</p>

          </div>
        </div>

      ))}


    </div>
  );
}

export default Radium(SearchResults);
