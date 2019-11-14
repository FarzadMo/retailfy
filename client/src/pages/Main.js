import React, { Component } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";



//redux
import { connect } from 'react-redux';
import { userAuth } from '../actions/authAction';


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
      <div id="firstlook">
        <nav >
          <Link  to="/"><img id="logo" src="./assets/images/logo.png"/></Link>
          {isAuthenticated ? (
            <div class="dropdown">
              <button class="dropbtn">{this.props.user.userName.charAt(0)}</button>
              <div class="dropdown-content">
                <Link to={`/myads/:${this.props.user.userId}`}><p>My Ads</p></Link>
                <p onClick={this.handleLogOut} >Log Out</p>

              </div>
            </div>

          ) : (
              <Link id="login" to="/register">Log In/ Sign Up</Link>
            )}


          <Link id="postAd" to="/adpost">Post Ad</Link>
        </nav>
       
        
          <div id="searchform">
            
              <SearchForm
                handleFormSubmit={this.handleFormSubmit}
                handleInputChange={this.handleInputChange}
                search={this.state.search}
               style={{diplay:"inline-block"}}
              />
               
          </div>
          <div id="backimage">
              <img src={"./assets/images/back2.jpg"}/>
              </div>
       
         </div>
          <div id="results" >
          
          
            {this.state.results.length ? (<SearchResults  results={this.state.results} />) :(<p id="nothingsaved">Nothing Posted For this category</p>) }
              
          
          </div>
      </>
    );
  }
}

// Main.proptypes = {

//   authstate: PropTypes.bool.isRequired

// }
// we need to get new state (auth) from the store- we use mapstateToProps to get state from the store and map it to properties of the component which in this case is main.js
const mapStateToProps = state => ({
  authstate: state.auth.authitem,       // the resean We used auth is that in rootReducer we use auth: authReducer/ what do we want from our authReducer is authuser state
  user: state.user.user
})                                  // so we map authstate to auth property- we access to this state from the store through this.props.auth

export default connect(mapStateToProps, { userAuth })(Main);


