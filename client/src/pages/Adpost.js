import React, { Component } from "react";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Input, TextArea, FormBtn } from "../components/Form";
import Nav from "../components/Nav";

class Adpost extends Component {
  state = {
    title: "",
    location: "",
    description: "",
    //    image:""
    price: 0,
    category: "",
    contactInfo: "",
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

  handleFormSubmit = event => {
    event.preventDefault();
    if (
      this.state.title &&
      this.state.location &&
      this.state.description &&
      this.state.price &&
      this.state.contactInfo
    ) {
      API.saveAd({
        title: this.state.title,
        location: this.state.location,
        description: this.state.description,
        // image: this.state.image,
        price: this.state.price,
        category: this.state.category,
        contactEmail: this.state.contactInfo
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
          <Link to="/">Sign Out</Link>
        </Nav>
        <Container fluid>
          <form>
            <Row>
              <Col size="md-6 sm-12">
                <Input
                  value={this.state.title}
                  name="Title"
                  Onchange={this.handleInputChange}
                  placeholder="Title"
                ></Input>
                <Input
                  value={this.state.category}
                  name="Category"
                  Onchange={this.handleInputChange}
                  placeholder="Category"
                  list="categories"
                ></Input>
                <datalist id="categories">
                  <option value="Coats" />
                  <option value="Jackets" />
                  <option value="Blazers" />
                  <option value="Suits" />
                  <option value="Dresses" />
                  <option value="T-shirts" />
                  <option value="Pants" />
                  <option value="Jeans" />
                  <option value="Skirt/Shorts" />
                  <option value="Shoes" />
                  <option value="Bags" />
                  <option value="Accessories" />
                </datalist>
                {/*//////////////// form for image /////////////////////*/}




                <Input
                  value={this.state.location}
                  name="Location"
                  Onchange={this.handleInputChange}
                  placeholder="Location"
                ></Input>
                <Input
                  value={this.state.contactInfo}
                  name="Contact Info"
                  Onchange={this.handleInputChange}
                  placeholder="Contact Info"
                ></Input>
                <Input
                  value={this.state.title}
                  name="Price"
                  Onchange={this.handleInputChange}
                  placeholder="Price"
                ></Input>
              </Col>

              <Col size="md-6 sm-12">
                <Row>
                  <Col size="sm-12">
                    <TextArea
                      value={this.state.description}
                      name="Description"
                      Onchange={this.handleInputChange}
                      placeholder="Description"
                    ></TextArea>
                  </Col>
                </Row>
                <Row>
                  <Col size="sm-12">
                    <FormBtn
                      disabled={!(this.state.title && this.state.location && this.state.description && this.state.image && this.state.price && this.state.contactInfo)}
                      onClick={() => this.handleFormSubmit}>
                      Submit
                    </FormBtn>
                  </Col>
                </Row>
              </Col>
            </Row>
          </form>
        </Container>
      </>
    );
  }
}

export default Adpost;
