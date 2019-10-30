import React, { Component } from "react";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import Nav from "../components/Nav";

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

    //page redirection
    redirect: false
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
        .then(res => this.setState({ TheOneUser: res.data }))
        .catch(err => console.log(err));
    }
    //We shoudl decide on HOW to implement this
  };

  //Sign In section/onSubmit event--> validate a user
  handleFormSignIn = event => {
    event.preventDefault();
    if (this.state.SignInEmail && this.state.SignInPassword) {
      API.getOneUserByEmail({
        email: this.state.SignInEmail,
        password: this.state.SignInPassword
      })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
    //  set the redirect state to true after saving the post into database
    this.setRedirect();
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
                Onchange={this.handleInputChange}
                placeholder="Email"
              ></Input>
              <Input
                value={this.state.SignInPassword}
                name="SignInPassword"
                Onchange={this.handleInputChange}
                placeholder="Password"
              ></Input>

              <FormBtn onClick={() => this.handleFormSignIn}>Sign In</FormBtn>
              </form>
            </Col>

            {/* Sign Up Section */}
            <Col size="md-6 sm-12">
              <Row>
                <Col size="sm-12">
                  <Input
                    value={this.state.firstName}
                    name="firstName"
                    Onchange={this.handleInputChange}
                    placeholder="First Name"
                  ></Input>

                  <Input
                    value={this.state.lastName}
                    name="lastName"
                    Onchange={this.handleInputChange}
                    placeholder="Last Name"
                  ></Input>
                </Col>
              </Row>

              <Row>
                <Col size="sm-12">
                  <Input
                    value={this.state.SignUpEmail}
                    name="SignUpEmail"
                    Onchange={this.handleInputChange}
                    placeholder="Email"
                  ></Input>

                  <Input
                    value={this.state.SignUpPassword}
                    name="SignUpPassword"
                    Onchange={this.handleInputChange}
                    placeholder="Password"
                  ></Input>
                </Col>
              </Row>

              <Row>
                <Col size="sm-12">
                  <FormBtn onClick={() => this.handleFormUserSubmit}>
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

export default Register;
