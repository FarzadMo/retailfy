import React, { Component } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import Nav from "../components/Nav";

//redux
import { connect } from 'react-redux';
import { userAuth } from '../actions/authAction';
// import PropTypes from 'prop-types';

class Main extends Component {
  state = {
    search: "",
    results: []
  };

  componentDidMount() {
    this.loadAds();
  }

  loadAds = () => {
    API.getAllAds()
      .then(res => this.setState({ results: res }))
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

    const isAuthenticated= this.props.authstate
    return (
      <>
        <Nav>
          <Link to="/">Retailfy</Link>
          {isAuthenticated ? (<button onClick={this.handleLogOut}>Log Out</button>) : (
            <Link to="/register">Log In/ Sign Up</Link>
          )}
          {/* <Link to="/register">Log In/ Sign Up</Link> */}
          {/* <button onClick={this.handleLogOut}>Log Out</button> */}
          <Link to="/adpost">Post Ad</Link>
        </Nav>
        <Container fluid>
          <Row>
            <Col size="sm-12">
              <SearchForm
                handleFormSubmit={this.handleFormSubmit}
                handleInputChange={this.handleInputChange}
                search={this.state.search}
              />
            </Col>
          </Row>

          <Row>
            {this.state.results.length ? (
              <SearchResults results={this.state.results} />
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Row>
        </Container>
      </>
    );
  }
}

// Main.proptypes = {

//   authstate: PropTypes.bool.isRequired

// }
// we need to get new state (auth) from the store- we use mapstateToProps to get state from the store and map it to properties of the component which in this case is main.js
const mapStateToProps = state => ({
  authstate: state.auth.authitem        // the resean We used auth is that in rootReducer we use auth: authReducer/ what do we want from our authReducer is authuser state
})                                  // so we map authstate to auth property- we access to this state from the store through this.props.auth

export default connect(mapStateToProps, { userAuth })(Main);
