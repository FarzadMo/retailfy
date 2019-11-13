import React, { Component } from "react";
import API from "../utils/API";
import { Container, Row, Col } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
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
        console.log("userId" + userid)
        API.getSavedAdByOneUser(userid).then(res => this.setState({ results: res.data })).catch(err => console.log(err))
    }

    deleteBtn = (id) => {
        console.log(API.deleteAd(id))
        API.deleteAd(id).then(res => this.loadSavedAd()).catch(err => console.log(err))

    }
    render() {
        const isAuthenticated = this.props.authstate
        return (
            <div if="firstlookmyad">
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
                <Container>
                    <Row>
                        <Col size="sm-12">
                            {this.state.results.length ? (
                                <List>
                                    {this.state.results.map(result => (
                                        <ListItem key={result.id}>

                                            <Row>

                                                <Col size="sm-8">
                                                    <h3>{result.title}</h3>
                                                    <h3> Category: {result.category}</h3>
                                                    <h3> Location: {result.location}</h3>
                                                    <h3> Price: {result.price}</h3>
                                                    <h3> Contact Info: {result.contactEmail}</h3>



                                                </Col>

                                                <Col size="sm-4">
                                                    <button className="btn float-right ml-3" style={{ color: "black", backgroundColor: "#f4cd23" }} onClick={() => this.deleteBtn(result.id)}>Delete</button>
                                                    {/* <button className="btn float-right" style={{ color: "black", backgroundColor: "#f4cd23" }}> <a style={{ color: "black" }} href={result.link}>View</a></button> */}

                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col size="sm-4">

                                                    <img alt={result.title} style={{ width: "100px", height: "150px", marginTop: "30px" }} src={`./../uploads/${result.image}`}></img>
                                                </Col>
                                                <Col size="sm-8">
                                                    <p>{result.description}</p>
                                                </Col>
                                            </Row>
                                        </ListItem>

                                    ))}

                                </List>
                            )
                                : (
                                    <ListItem>Nothing Posted</ListItem>)}

                        </Col>
                    </Row>
                </Container>

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
