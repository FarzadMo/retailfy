import React, { Component } from "react";
import API from "../utils/API";
import { Row, Col } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Link } from "react-router-dom";
import "./style.css";
import Radium from "radium"

// redux
import { connect } from 'react-redux';
import { userAuth } from '../actions/authAction';


///////////////media query///////////

var containerstyle = {
    '@media(max-width:780px)': {
        marginLeft: "0px",
        paddingTop: "20%"
    }
}
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


//////////////////////////////////////
class Myads extends Component {

    state = {
        results: []

    };

    componentDidMount() {

        this.loadSavedAd(this.props.user.userId);
    }

    loadSavedAd = (userid) => {
        API.getSavedAdByOneUser(userid).then(res => this.setState({ results: res.data })).catch(err => console.log(err))
    }

    deleteBtn = (id) => {

        API.deleteAd(id).then(res => this.loadSavedAd(this.props.user.userId)).catch(err => console.log(err))

    }
    handleLogOut = () => {

        API.logOut();
        this.props.userAuth(false)
    }
    render() {
        const isAuthenticated = this.props.authstate
        const urle = window.location.href;
        const mainpageurl = urle.split("myads")[0];

        return (
            <div id="firstlookmyad">
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
                <div id="myadcontainer" style={containerstyle} >
                    <Row>
                        <Col size="md-10 sm-12">
                            {this.state.results.length ? (
                                <List>
                                    {this.state.results.map(result => (
                                        <ListItem key={result.id}>

                                            <Row>

                                                <Col size="xs-6 sm-6 md-6 lg-8">
                                                    <p style={{ color: "black", fontFamily: "'Poppins', 'sans-serif'", fontSize: "14px" }}> <strong>Title:</strong> {result.title}</p>
                                                    <p style={{ color: "black", fontFamily: "'Poppins', 'sans-serif'", fontSize: "14px" }}> <strong>Category:</strong> {result.category}</p>
                                                    <p style={{ color: "black", fontFamily: "'Poppins', 'sans-serif'", fontSize: "14px" }}> <strong>Location:</strong> {result.location}</p>
                                                    <p style={{ color: "black", fontFamily: "'Poppins', 'sans-serif'", fontSize: "14px" }}> <strong>Price:</strong> {result.price}</p>
                                                    <p style={{ color: "black", fontFamily: "'Poppins', 'sans-serif'", fontSize: "14px" }}> <strong>Contact Info:</strong> {result.contactEmail}</p>

                                                </Col>

                                                <Col size="xs-6 sm-6 md-6 lg-4 ml-4">
                                                    <button className="btn float-right ml-3" style={{ color: "white", backgroundColor: "#8C3E3E", borderRadius: "20px", fontFamily: "'Poppins', 'sans-serif'" }} onClick={() => this.deleteBtn(result.id)}>Delete</button>
                                                    <Link to={`/editads/${result.id}`}><button className="btn float-right ml-3" style={{ color: "white", backgroundColor: "#8C3E3E", borderRadius: "20px", fontFamily: "'Poppins', 'sans-serif'" }} >Edit</button></Link>

                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col size="sm-6 md-4" style={{ border: "solid" }}>

                                                    <img alt={result.title} style={{ width: "50%", height: "100%" }} src={`${mainpageurl + result.image}`}></img>
                                                </Col>
                                                <div className="col-sm-6 col-md-8 pt-3" >
                                                    <p style={{ fontFamily: "'Poppins', 'sans-serif'", fontSize: "14px" }}>{result.description}</p>
                                                </div>
                                            </Row>
                                        </ListItem>

                                    ))}

                                </List>
                            )
                                : (isAuthenticated ? (<ListItem>Nothing Posted</ListItem>) : (<ListItem>Please sign in first</ListItem>))}


                        </Col>
                    </Row>
                </div>

            </div>
        )

    }

}

// we need to get new state (auth) from the store- we use mapstateToProps to get state from the store and map it to properties of the component which in this case is main.js
const mapStateToProps = state => ({
    authstate: state.auth.authitem,      // the resean We used auth is that in rootReducer we use auth: authReducer/ what do we want from our authReducer is authuser state
    user: state.user.user

})                                  // so we map authstate to auth property- we access to this state from the store through this.props.auth

export default connect(mapStateToProps, { userAuth })(Radium(Myads));
