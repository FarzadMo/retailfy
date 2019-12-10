import React from "react";
import "./style.css";
import Radium from "radium";

////////////media query/////////////

var formgroupstyle={
  '@media (max-width:780px)':{
    width: "50%",
    marginLeft:"5%",
    height:"35%"
  },
    '@media (max-width:640px)':{
      width: "50%",
      marginLeft:"5%",
      height:"30%"
    }
  }
  var inputstyle={
    '@media (max-width:640px)':{
      fontSize: "0.6rem",
    
    }
  }

////////////////////////////////////
// Using the datalist element we can create autofill suggestions based on the props.breeds array
function SearchForm(props) {
    return (
        <form id="search">
            <div id="form-group" style={ formgroupstyle}>
        
                <input
                    value={props.search}
                    onChange={props.handleInputChange}
                    name="search"
                    className="form-control"
                    placeholder="Search Your Favorites "     
                    list="categories"
                    style={inputstyle}
                />
                <datalist id="categories">

                    <option value="Coats" />
                    <option value="Jackets" />
                    <option value="Blazers" />
                    <option value="Suits" />
                    <option value="Dresses" />
                    <option value="T-shirts" />
                    <option value="Pants" />
                    <option value="Jeans" />
                    <option value="Skirt/Shorts" />
                    <option value="Shoes" />
                    <option value="Bags" />
                    <option value="Accessories" />

                </datalist>
                <button type="submit" onClick={props.handleFormSubmit} style={inputstyle}>
                    Search
        </button>
       
       
            </div>
           
          
        </form>
    );
}

export default Radium(SearchForm);
