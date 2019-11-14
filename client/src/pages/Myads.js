import React, { Component } from "react";
import API from "../utils/API";
import { Container, Row, Col } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Link } from "react-router-dom";
import "./style.css";

// redux
import { connect } from 'react-redux';
import { userAuth } from '../actions/authAction';

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
    render() {
        const isAuthenticated = this.props.authstate
        return (
            <div id="firstlookmyad">
                <nav >
                    <Link to="/"><img id="logo" src="/assets/images/logo.png" /></Link>
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

                </nav>
                <div className="container" id="myadcontainer" >
                    <Row>
                        <Col size="md-10 sm-12">
                            {this.state.results.length ? (
                                <List>
                                    {this.state.results.map(result => (
                                        <ListItem key={result.id}>

                                            <Row>

                                                <Col size="sm-8">
                                                    <p style={{ color: "black", fontFamily: "open sans" }}> <strong>Title:</strong> {result.title}</p>
                                                    <p style={{ color: "black", fontFamily: "open sans" }}> <strong>Category:</strong> {result.category}</p>
                                                    <p style={{ color: "black", fontFamily: "open sans" }}> <strong>Location:</strong> {result.location}</p>
                                                    <p style={{ color: "black", fontFamily: "open sans" }}> <strong>Price:</strong> {result.price}</p>
                                                    <p style={{ color: "black", fontFamily: "open sans" }}> <strong>Contact Info:</strong> {result.contactEmail}</p>

                                                </Col>

                                                <Col size="sm-4">
                                                    <button className="btn float-right ml-3" style={{ color: "black", backgroundColor: "#ffd51f" }} onClick={() => this.deleteBtn(result.id)}>Delete</button>


                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col size="sm-4" style={{border:"solid"}}>

                                                    <img alt={result.title} style={{ width: "100%", height: "100%" }} src={`./../uploads/${result.image}`}></img>
                                                </Col>
                                                <div className="col-sm-8" style={{border:"solid", borderColor: "#a8c9d7"}}>
                                                    <p >{result.description}</p>
                                                </div>
                                            </Row>
                                        </ListItem>

                                    ))}

                                </List>
                            )
                                : (isAuthenticated? (<ListItem>Nothing Posted</ListItem>):(<ListItem>Please sign in first</ListItem>))}
                                   

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

export default connect(mapStateToProps, { userAuth })(Myads);
