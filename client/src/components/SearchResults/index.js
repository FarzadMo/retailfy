import React from "react";
import { Link } from "react-router-dom"
import "./style.css";


function SearchResults(props) {
   // split the original array into a collection of two item sets
   var splitResults=[];
   var propResult=props.results;
   propResult.forEach((item, index) => {
  if (index % 2) {
    splitResults.push([propResult[index - 1], propResult[index]]);
  }
});
console.log("split1"+props.results)
console.log("split"+splitResults[0])
  return (
    <div>
      {splitResults.map(result => (
        <div style={{width:"100%", display: "block" , marginBottom: "40px"}} >
        <div style={{width:"50%", display: "inline-block"}} >
          {console.log(result[0].image)}
                <img
                  alt={result[0].category}
                  src={`uploads/${result[0].image}`}
                  className="img-fluid"
                  id="image"
                  style={{width:"250px", height:"340px", display: "inline-block"}}
                />
                <Link style={{color:"black"}} to={"/detail/" + result[0].id}>
                  <p style={{marginBottom:"0", fontSize: "12px",fontFamily: 'Open Sans',marginTop: "15px"}}> {result[0].title}</p>
                </Link>
                <p style={{marginBottom:"0", fontSize: "12px",fontFamily: 'Open Sans'}}>{result[0].price} CAD</p>
                {/* <p>Description: {result[0].description}</p> */}
        </div>
        <div style={{width:"50%", display: "inline-block"}}>
        {console.log(result[1].image)}
                <img
                  alt={result[1].category}
                  src={`uploads/${result[1].image}`}
                  className="img-fluid"
                  style={{width:"250px", height:"340px", display: "inline-block"}}
                />
                <Link style={{color:"black"}} to={"/detail/" + result[1].id}>
                  <p style={{marginBottom:"0", fontSize: "12px",fontFamily: 'Open Sans',marginTop: "15px"}}> {result[1].title}</p>
                </Link>

                <p style={{fontSize: "12px",fontFamily: 'Open Sans'}}>{result[1].price} CAD</p>
                {/* <p>Description: {result[1].description}</p> */}
        </div>
        </div>

         ))} 
    </div>
  );
}

export default SearchResults;
