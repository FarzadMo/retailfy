import React, { Component } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Nav from "../components/Nav";

class Detail extends Component {
  state = {
    oneAd: {}
  };

  componentDidMount() {
    this.loadOneAd();
  }

  loadOneAd = () => {
    API.getOneAdById(this.props.match.params.id)
      .then(res => this.setState({ oneAd: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    console.log(this.state.oneAd.id)
    console.log(this.state.oneAd.image)

    return (
      <>
        <Nav>
          <Link to="/">Close</Link>
        </Nav>

        <Container fluid>
          <Row>
            <Col size="md-6 sm-12">
              <h3> Title: {this.state.oneAd.title}</h3>
              <h3> Category: {this.state.oneAd.category}</h3>
              <h3> Location: {this.state.oneAd.location}</h3>
              <h3> Price: {this.state.oneAd.price}</h3>
              <h3> Contact Info: {this.state.oneAd.contactEmail}</h3>
              <p> Description: {this.state.oneAd.description}</p>
            </Col>
            <Col size="md-6 sm-12">
              <div>
                <img
                  alt={this.state.oneAd.category}
                  src={`./../uploads/${this.state.oneAd.image}`}
                  className="img-fluid"
                />
              </div>

            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Detail;
