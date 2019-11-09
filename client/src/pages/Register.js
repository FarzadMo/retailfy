import React, { Component } from "react";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import Nav from "../components/Nav";

// Redux

import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { userAuth } from '../actions/authAction';
import { userInformation } from '../actions/userAction';

class Register extends Component {
  state = {
    // Sign In State
    SignInEmail: "",
    SignInPassword: "",
    TheOneUser: [],

    //Sign Up State
    firstName: "",
    lastName: "",
    SignUpEmail: "",
    SignUpPassword: "",
    registered: "",

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
    console.log("password" + this.state.SignUpPassword)
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
        .then(res => this.setState({ TheOneUser: res.data }))
        .catch(err => console.log(err));
    }
    //reset form
    this.setState({ firstName: "", lastName: "", SignUpEmail: "", SignUpPassword: "" })
    //registered
    this.setState({ registered: "Registered successfully!" })
  };

  //Sign In section/onSubmit event--> validate a user
  handleFormSignIn = event => {
    event.preventDefault();
    console.log("signin" + this.state.SignInEmail)
    if (this.state.SignInEmail && this.state.SignInPassword) {
      API.getOneUserByEmail({
        email: this.state.SignInEmail,
        password: this.state.SignInPassword
      })
        .then(res => {
          console.log("userInfo" + JSON.stringify(res.data))
          this.setState({ authstate: true });
          this.setState({ userinfo: res.data });
          console.log(this.state.authstate);
          this.props.userAuth(this.state.authstate);  //call userAuth action-Redux
          this.props.userInformation(this.state.userinfo);  //call  action-Redux
          this.setRedirect();
        })
        .catch(err => console.log(err));
    }
    //  set the redirect state to true after saving the post into database

  };



  render() {
    return (
      <>
        {/* redirect to main page after submitting */}
        {this.renderRedirect()}
        <Nav>
          <Link to="/">Retailfy</Link>
        </Nav>

        <Container fluid>

          <Row>
            {/* Sign In Section */}
            <Col size="md-6 sm-12">
              <h4>Sign In</h4>
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

                <FormBtn
                  onClick={this.handleFormSignIn}>Sign In</FormBtn>
              </form>
            </Col>

            {/* Sign Up Section */}
            <Col size="md-6 sm-12">
              <Row>
                <Col size="sm-12">
                  <Input
                    value={this.state.firstName}
                    name="firstName"
                    onChange={this.handleInputChange}
                    placeholder="First Name"
                  />

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
                  <Input
                    value={this.state.SignUpEmail}
                    name="SignUpEmail"
                    onChange={this.handleInputChange}
                    placeholder="Email"
                  />

                  <Input
                    value={this.state.SignUpPassword}
                    name="SignUpPassword"
                    onChange={this.handleInputChange}
                    placeholder="Password"
                  />
                </Col>
              </Row>
              <Row>
                <p>{this.state.registered}</p>
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
        </Container>
      </>
    );
  }
}

// Register.proptypes={

// userAuth: PropTypes.func.isRequired,
// // auth: React.PropTypes.bool.isRequired

// }

// const mapStateToProps = state => ({
//   authstate: state.auth.authitem        // the resean We used auth is that in rootReducer we use auth: authReducer/ what do we want from our authReducer is authuser state
// })

//redux 
export default connect(null, { userAuth, userInformation })(Register);
