import React, { Component } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";

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
 const urle=window.location.href;
 const mainpageurl = urle.split("detail")[0];
 const imageurl=mainpageurl+this.state.oneAd.image;

    return (
      <>
      {console.log(this.state.oneAd.image)}
        <nav style={{
          float: "right",
          "margin-right": "20px",
          "margin-top": "20px",
          "font-size": "25px",
          "color": "#6eb7d9"
        }}>
          <Link to="/" s>X</Link>
        </nav>

        <div className="container" id="containerdetail"  >
          <Row>
            <Col size="md-6 sm-12">
              <p> <strong>  Title: </strong>{this.state.oneAd.title}</p>
              <p>  <strong> Category: </strong> {this.state.oneAd.category}</p>
              <p>  <strong>  Location: </strong> {this.state.oneAd.location}</p>
              <p>  <strong>  Price:  </strong>{this.state.oneAd.price}</p>
              <p>  <strong> Contact Info:</strong> {this.state.oneAd.contactEmail}</p>
              <p>  <strong> Description:</strong> {this.state.oneAd.description}</p>
            </Col>
            <Col size="md-6 sm-12">
              <div>
                <img
                  alt={this.state.oneAd.category}
                  src={`${imageurl}`}
                  className="img-fluid"
                />
              </div>

            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Detail;
