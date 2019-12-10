import React, { Component } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import Radium from "radium";


//redux
import { connect } from 'react-redux';
import { userAuth } from '../actions/authAction';

///////////////media query-style///////////
 var navstyle={
  width:"100%"
 }

var navleftstyle={
position:"absolute",
width: "40%",
top:0,
right:"100px",

'@media (max-width:1015px)': {
  position:"absolute",
right:"50px"
},
'@media (max-width:640px)': {
  position:"absolute",
width: "50%",
height:"50%",
right:"30px"
}
}
var stylelogin = {
  right: "20%",
  width: "50%",
  position: "absolute",
  '@media (max-width:1015px)': {
    position:"absolute",
    right:"30%",

  },
  '@media (max-width:640px)': {
    position:"absolute",
    right:"40%",
    width:"70%"

  }
}
var styledropdown = {
  position: "absolute",
  '@media (max-width:1204px)': {
    position:"absolute",
    right:"10%",

  },
  '@media (max-width:920px)': {
    position:"absolute",
    right:"15%",

  },
  '@media (max-width:780px)': {
    position:"absolute",
    right:"20%",

  },
  '@media (max-width:640px)': {
    position:"absolute",
    right:"10%",
    width:"40%"

  }
}

var stylepostad = {
  right: "0%",
  width: "40%",
  position: "absolute",
  '@media (max-width:640px)': {
    position:"absolute",
    right:"0%",
    width:"30%"

  }
}
var style = {
  '@media (max-width:1120px)': {
    fontSize: "2.4rem"

  },
  '@media (max-width:780px)': {
    fontSize: "2rem"
  },
  '@media (max-width:640px)': {
    fontSize: "1.5rem"
  }
}

var backtextstyle = {
  '@media (max-width:780px)': {
    top: "30%",
    left: "57%",
    width: "40%"
  },
  '@media (max-width:640px)': {
    top: "25%",
    left: "60%",
    width: "25%"
  }
}

var backcolor = {
  '@media (max-width:780px)': {
    height: "70%",

  },
  '@media (max-width:640px)': {
    height: "70%",

  }
}
var logostyle = {
  '@media (max-width:640px)': {
    fontSize: "1.5rem",

  }
}

var loginstyle = {
  '@media (max-width:640px)': {

     fontSize: "0.8rem",

  }
}


var poststyle = {

  '@media (max-width:640px)': {
         fontSize: "0.8rem",

  }
}
var backanimation = {
  '@media (max-width:1120px)': {
    fontSize: "3rem"
  },

  '@media (max-width:780px)': {
    fontSize: "2.4rem"

  },
  '@media (max-width:640px)': {
    fontSize: "1.8rem"

  }
}
var resultstyle = {
  '@media (max-width:1125px)': {
    marginTop: "20px",
    marginLeft: "50px"

  },
  '@media (max-width:640px)': {
    marginTop: "0",
    marginLeft: "0"

  }
}
var firstlookstyle = {
  '@media (max-width:1125px)': {
   height:"93vh"

  },
  '@media (max-width:640px)': {
height:"85vh"
  }
}
/////////////////////////
class Main extends Component {
  state = {
    search: "",
    results: [],

  };

  componentDidMount() {
    this.loadAds();
  }

  loadAds = () => {
    API.getAllAds()
      .then(res => this.setState({ results: res.data }))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.search) {
      API.getAdsByCategory(this.state.search)
        .then(res => this.setState({ results: res.data }))
        .catch(err => console.log(err));
    }
    // reset form
    this.setState({ search: "" })
  };

  handleLogOut = () => {

    API.logOut();
    this.props.userAuth(false)
  }
  render() {

    const isAuthenticated = this.props.authstate
    return (
      <>
        <div id="firstlook" style={firstlookstyle}>
          <div id="backcolor-left" style={backcolor}></div>
          <div id="backcolor-right" style={backcolor}></div>
          <div id="back-text" style={backtextstyle}><p style={style}>Online Market for buying or selling clothing</p></div>
          <div id="back-animation"><p style={backanimation}>MEET THE NEW ADS</p></div>
          <nav  style={navstyle}>
            {/* <Link  to="/"><img id="logo" src="./assets/images/logo.png"/></Link> */}

            <Link to="/"><p id="logo" style={logostyle}>RETAILFY</p></Link>

             <div style={navleftstyle}>
             {isAuthenticated ? (
              <div className="dropdown" style={styledropdown} >
                <button className="dropbtn">{this.props.user.userName.charAt(0)}</button>
                <div className="dropdown-content">
                  <Link to={`/myads/:${this.props.user.userId}`}><p>My Ads</p></Link>
                  <p onClick={this.handleLogOut} >Log Out</p>

                </div>
              </div>

            ) : (
              <div style={stylelogin}> <Link id="login" to="/register" ><p style={loginstyle}>Log In/ Sign Up</p></Link></div>

              )}

            <div style={stylepostad}> <Link to="/adpost" ><p id="postAd" style={poststyle} >Post Ad</p></Link></div>

             </div>

          </nav>


          <div id="searchform">

            <SearchForm
              handleFormSubmit={this.handleFormSubmit}
              handleInputChange={this.handleInputChange}
              search={this.state.search}
              style={{ diplay: "inline-block" }}
            />

          </div>

        </div>
        <div id="results" style={resultstyle}>


          {this.state.results.length ? (<SearchResults results={this.state.results} />) : (<p id="nothingsaved">Nothing Posted For this category</p>)}


        </div>
      </>
    );
  }
}


// we need to get new state (auth) from the store- we use mapstateToProps to get state from the store and map it to properties of the component which in this case is main.js
const mapStateToProps = state => ({
  authstate: state.auth.authitem,       // the resean We used auth is that in rootReducer we use auth: authReducer/ what do we want from our authReducer is authuser state
  user: state.user.user
})                                  // so we map authstate to auth property- we access to this state from the store through this.props.auth

export default connect(mapStateToProps, { userAuth })(Radium(Main));


