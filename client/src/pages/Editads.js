import React, { Component } from "react";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Input, TextArea, FormBtn } from "../components/Form";
import Fileupload from "../components/Fileupload";
import "./style.css";

// redux
import { connect } from 'react-redux';
import { userAuth } from '../actions/authAction';

class Editads extends Component {
  state = {
    Title: "",
    Location: "",
    Description: "",
    Price: 0,
    Category: "",
    Contact: "",
    Image: "",
    emptyfield: "",
    redirect: false,
    ////////////// image///////
    file: "",
    filename: "",
    filePath: "",
    uploadedFile: {},
    ad: [],
    adid: 0

  };

  //////////////uploading image///////////
  componentDidMount() {
    const urle = window.location.href;
    const mainpageurl = urle.split("editads")[0];
    API.getOneAdById(parseInt(this.props.match.params.id))
      .then(res => this.setState({
        Title: res.data.title,
        Location: res.data.location,
        Description: res.data.description,
        Price: res.data.price,
        Category: res.data.category,
        Contact: res.data.contactEmail,
        Image: res.data.image,
        adid: parseInt(this.props.match.params.id),
        uploadedFile: { fileName: "yourfile", filePath: mainpageurl + res.data.image },
        filePath:res.data.image
      }))
      .catch(err => console.log(err));


  }

  onChange = e => {
    // event.target has files property which is an array of files, in our case we uplaod just one image so we want files[0]
    this.setState({ file: e.target.files[0] });

    // file[0] is an object and has propert of name which is the name of the file that has selected
    this.setState({ filename: e.target.files[0].name })
  }

  onSubmit = async e => {
    e.preventDefault();
    // formData is part of javascript- we store the image file in formData and we post it throgh API
    const formData = new FormData();
    formData.append('file', this.state.file);
    try {
      const res = await API.uploadImage(formData);
      console.log("result" + res)


      /////////uploadfile with fileupload////// the res coming back from the server includes file name and file path

      /////// this.setState({ uploadedFile: { fileName: res.data.fileName, filePath: res.data.filePath } })
      const urle = window.location.href;
      const mainpageurl = urle.split("editads")[0];
      this.setState({
        filePath: res.data.filePath
      })
      this.setState({ uploadedFile: { fileName: this.state.filename, filePath: mainpageurl+this.state.filePath } })

    }
    catch (err) {
      if (err.response.status === 500) {
        console.log('there was a problem with the server')
      } else {
        console.log(err.response.data.msg);
      }
    }

  }

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

    if (this.props.authstate) {
      if (
        this.state.Title &&
        this.state.Location &&
        this.state.Description &&
        this.state.Price &&
        this.state.Contact
      ) {

        API.editAd(this.state.adid, {
          title: this.state.Title,
          location: this.state.Location,
          description: this.state.Description,
          image: this.state.filePath,
          price: this.state.Price,
          category: this.state.Category,
          contactEmail: this.state.Contact
        })
          .then(res => {
            this.setState({ emptyfield: "Edited Successfully!" });
            // reset form
            this.setState({ Title: "", Location: "", Description: "", image: "", Category: "", Price: "", Contact: "", file: "", filename: "" })
          })
          .catch(err => this.setState({ emptyfield: err.response.data }));
      }
      else {
        this.setState({ emptyfield: "Please fill in all fields" })
      }
    }
    else {
      this.setState({ emptyfield: "Please sign in first" })
    }

  };

  handleLogOut = () => {

    API.logOut();
    this.props.userAuth(false)
  }


  render() {

    const isAuthenticated = this.props.authstate

    return (
      <div id="firstlookAd">
        {/* redirect to main page after submitting */}
        {this.renderRedirect()}
        <nav >
          <Link to="/"><p id="logo">RETAILFY</p></Link>
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

          <form>
            <Row>
              <Col size="md-5 sm-12">
                <Input
                  value={this.state.Title}
                  name="Title"
                  onChange={this.handleInputChange}
                  placeholder="Title"
                  style={{
                    fontFamily: "'Poppins', 'sans-serif'"
                  }}
                />
                <Input
                  value={this.state.Category}
                  name="Category"
                  onChange={this.handleInputChange}
                  placeholder="Category"
                  list="categories"
                  style={{
                    fontFamily: "'Poppins', 'sans-serif'"
                  }}
                />
                <datalist id="categories" style={{
                  fontFamily: "'Poppins', 'sans-serif'"
                }}>
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

                {/* upload the image */}
                <Fileupload imagesrc={this.state.image} onSubmit={this.onSubmit} onChange={this.onChange} uploadedFile={this.state.uploadedFile} filename={this.state.filename} />


                <Input
                  value={this.state.Location}
                  name="Location"
                  onChange={this.handleInputChange}
                  placeholder="Location"
                  style={{
                    fontFamily: "'Poppins', 'sans-serif'"
                  }}
                />
                <Input
                  value={this.state.Contact}
                  name="Contact"
                  onChange={this.handleInputChange}
                  placeholder="Contact"
                  style={{
                    fontFamily: "'Poppins', 'sans-serif'"
                  }}

                />
                <Input
                  value={this.state.Price}
                  name="Price"
                  onChange={this.handleInputChange}
                  placeholder="Price"
                  style={{
                    fontFamily: "'Poppins', 'sans-serif'"
                  }}
                />
              </Col>

              <Col size="md-5 sm-12">
                <Row>
                  <Col size="sm-12">
                    <TextArea
                      value={this.state.Description}
                      name="Description"
                      onChange={this.handleInputChange}
                      placeholder="Description"
                      style={{
                        fontFamily: "'Poppins', 'sans-serif'"
                      }}
                    ></TextArea>
                  </Col>
                </Row>
                <Row>
                  <Col size="sm-12">
                    {/* show all the errors in the following div */}
                    <div style={{ color: "white" }}>{this.state.emptyfield}</div>
                    <FormBtn
                      // disabled={!(this.state.Title && this.state.Location && this.state.Description && this.state.image && this.state.Price && this.state.Contact
                      //   )}
                      onClick={this.handleFormSubmit} >
                      Submit
                  </FormBtn>
                  </Col>
                </Row>
              </Col>
            </Row>
          </form>
        </Container>
      </div>
    );
  }
}


// we need to get new state (auth) from the store- we use mapstateToProps to get state from the store and map it to properties of the component which in this case is main.js
const mapStateToProps = state => ({
  authstate: state.auth.authitem,      // the resean We used auth is that in rootReducer we use auth: authReducer/ what do we want from our authReducer is authuser state
  user: state.user.user

})                                  // so we map authstate to auth property- we access to this state from the store through this.props.auth

export default connect(mapStateToProps, { userAuth })(Editads);
