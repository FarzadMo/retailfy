import React, { Component } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import SearchForm from "../components/SearchForm";
import Nav from "../components/Nav";


class Books extends Component {
    state = {
        search: "",
        results: []
    };

    componentDidMount() {
        this.loadAds();
    }

    loadAds = () => {
        API.getAllAds()
            .then(res =>
                this.setState({ results: res })
            )
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
                .then(res => this.setState({ results: res }))
                .catch(err => console.log(err));
        }
    };

    render() {
        return (
            <Nav>
                <Link to="/">Retailfy</Link>
                <Link to="/register" >Log In/ Sign Up</Link>
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
                        <SearchResults results={this.state.results} />

                    </Col>
                </Row>


                <Row>

                </Row>
                {this.state.books.length ? (
                    <List>
                        {this.state.books.map(book => (
                            <ListItem key={book._id}>
                                <Link to={"/books/view/" + book._id}>
                                    <strong>
                                        {book.title} by {book.author}
                                    </strong>
                                </Link>
                                <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                            </ListItem>
                        ))}
                    </List>
                ) : (
                        <h3>No Results to Display</h3>
                    )}
                    </Col>
                </Row >
            </Container >
        );
    }
}

export default Books;
