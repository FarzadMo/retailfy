import React, { Component } from "react";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Col, Row} from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import Radium from "radium";

// Redux

import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { userAuth } from '../actions/authAction';
import { userInformation } from '../actions/userAction';

/////////////media query///////////
var logostyle ={
  '@media (max-width:860px)':{
    fontSize: "1.5rem",
    position: "absolute",
    left: "3%",
    top: "4%",
    marginBottom:"30%"
  
  }
}
var containerstyle ={
  paddingLeft: "1.5%",
  paddingTop: "10%",
  paddingBottom: "10%",

  '@media (max-width:640px)':{
    paddingTop: "25%",

  
  }
}

////////////////////
class Register extends Component {
  state = {
    // Sign In State
    SignInEmail: "",
    SignInPassword: "",

    //Sign Up State
    firstName: "",
    lastName: "",
    SignUpEmail: "",
    SignUpPassword: "",
    registered: "",
    emptyfield: "",
    emptyfieldsignin:"",

    //page redirection
    redirect: false,
    authstate: false,
    userinfo: {}
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  //Sign Up section/onSubmit event--> post a new user
  handleFormUserSubmit = event => {
    event.preventDefault();
    if (
      this.state.firstName &&
      this.state.lastName &&
      this.state.SignUpEmail &&
      this.state.SignUpPassword
    ) {
      API.postNewUser({
        firstname: this.state.firstName,
        lastname: this.state.lastName,
        email: this.state.SignUpEmail,
        password: this.state.SignUpPassword
      })
        .then(res =>  this.setState({ emptyfield: "Registered successfully!" }))
        .catch(err => this.setState({ emptyfield: err.response.data }));
    }
    else {
      this.setState({ emptyfield: "Please fill in all fields" })
    }

    //reset form
    this.setState({ firstName: "", lastName: "", SignUpEmail: "", SignUpPassword: "" })
 
   
  };

  //Sign In section/onSubmit event--> validate a user
  handleFormSignIn = event => {
    event.preventDefault();
   
    if (this.state.SignInEmail && this.state.SignInPassword) {
      API.getOneUserByEmail({
        email: this.state.SignInEmail,
        password: this.state.SignInPassword
      })
        .then(res => {
          this.setState({ authstate: true });
          this.setState({ userinfo: res.data });
          this.props.userAuth(this.state.authstate);  //call userAuth action-Redux
          this.props.userInformation(this.state.userinfo);  //call  action-Redux
          this.setRedirect();
        })
        .catch(err => this.setState({emptyfieldsignin: err.response.data}));
    }
    else{
      this.setState({ emptyfieldsignin: "Please fill in all fields" })
    }
 

  };



  render() {
    return (
      <div id="firstlookregister">
        {/* redirect to main page after submitting */}
        {this.renderRedirect()}
        <nav >
        <Link  to="/"><p id="logo" style={logostyle}>RETAILFY</p></Link>

        </nav>

        <div className="container" style={containerstyle}>

          <Row>
            {/* Sign In Section */}
            <Col size="md-5 sm-12">
              <h4 className="mb-4" style={{ fontFamily: "open sans" }}>Sign In</h4>
              <form>
                <Input
                  value={this.state.SignInEmail}
                  name="SignInEmail"
                  onChange={this.handleInputChange}
                  placeholder="Email"
                />
                <Input
                  value={this.state.SignInPassword}
                  name="SignInPassword"
                  onChange={this.handleInputChange}
                  placeholder="Password"
                />
                {/* show all the errors in the following div */}
                <div  className="ml-3" style={{ color: "#3D820A" ,fontFamily: "'Poppins', 'sans-serif'"}}>{this.state.emptyfieldsignin}</div>
                <FormBtn
                  onClick={this.handleFormSignIn}>Sign In</FormBtn>
              </form>
            </Col>
            <Col size="md-1 sm-12">
            </Col>

            {/* Sign Up Section */}
            <Col size="md-5 sm-12 ">
              <Row>
                <Col size="sm-12">
                  <h4 className="mb-4" style={{  fontFamily: "'Poppins', 'sans-serif'"}}>Sign Up</h4>
                  <label style={{  fontFamily: "'Poppins', 'sans-serif'", fontSize:"14px"}} htmlFor="firstName">First name</label>
                  <Input
                    value={this.state.firstName}
                    name="firstName"
                    onChange={this.handleInputChange}
                    placeholder="First Name"
                  />
                  <label style={{  fontFamily: "'Poppins', 'sans-serif'",fontSize:"14px"}} htmlFor="LastName">Last name</label>
                  <Input
                    value={this.state.lastName}
                    name="lastName"
                    onChange={this.handleInputChange}
                    placeholder="Last Name"
                  />
                </Col>
              </Row>

              <Row>
                <Col size="sm-12">
                  <label style={{  fontFamily: "'Poppins', 'sans-serif'" ,fontSize:"14px" }} htmlFor="SignUpEmail">Email</label>
                  <Input
                    value={this.state.SignUpEmail}
                    name="SignUpEmail"
                    onChange={this.handleInputChange}
                    placeholder="Email"
                  />
                  <label style={{ fontFamily: "'Poppins', 'sans-serif'",fontSize:"14px"}} htmlFor="SignUpPassword">Password</label>
                  <Input
                    value={this.state.SignUpPassword}
                    name="SignUpPassword"
                    onChange={this.handleInputChange}
                    placeholder="Password"
                  />
                </Col>
              </Row>
              <Row>
                {/* show all the errors in the following div */}
                <div  className="ml-3" style={{ color: "#3D820A" ,fontFamily: "'Poppins', 'sans-serif'"}}>{this.state.emptyfield}</div>
                
              </Row>
              <Row>
                <Col size="sm-12">
                  <FormBtn onClick={this.handleFormUserSubmit}>
                    Submit
                  </FormBtn>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}



//redux 
export default connect(null, { userAuth, userInformation })(Radium(Register));
