import React from "react";
import "./style.css";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function SearchForm(props) {
    return (
        <form id="search">
            <div id="form-group">
        
                <input
                    value={props.search}
                    onChange={props.handleInputChange}
                    name="search"
                    className="form-control"
                    placeholder="Search Your Favorites "     
                    list="categories"
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
                <button type="submit" onClick={props.handleFormSubmit}>
                    Search
        </button>
       
       
            </div>
           
          
        </form>
    );
}

export default SearchForm;
