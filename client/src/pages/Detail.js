import React, { Component } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Detail from "../components/Detail";
import Nav from "../components/Nav";

class Detail extends Component {
  state = {
    results: []
  };

  componentDidMount() {
    this.loadOneAd();
  }

  loadOneAd = () => {
    API.getOneAdById()
      .then(res => this.setState({ results: res }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <>
        <Nav>
          <Link to="/">Close</Link>
        </Nav>

        <Container fluid>
          <Row>
            <Col size="md-6 sm-12">
              <Detail results={this.state.results}></Detail>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Detail;
