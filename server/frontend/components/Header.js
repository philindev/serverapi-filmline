import React, {Component} from "react";
import {Navbar, Button, Form, Nav, FormControl} from "react-bootstrap";

export default class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
            login: this.props.status,
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            login: nextProps.status,
        })
    }

    render() {
        let icon = <img src="./frontend/image/popcorn.png" alt="LineFilms" style={{
                                        height: "45px",
                                        cursor: "pointer"
                                    }}/>;
        let menu = <img src="./frontend/image/menu.png" alt="LineFilms" className="ml-1 mr-2" style={{
                                        height: "35px",
                                        cursor: "pointer"
                                    }}/>;

        let content_block =
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">{icon}</Navbar.Brand>
                <Nav className="mr-auto">
                      <Nav.Link href="#home">Top-100</Nav.Link>
                      <Nav.Link href="#features">Announced</Nav.Link>
                </Nav>
                <Form inline>
                      <FormControl type="text" placeholder="Search" className="mr-sm-2 col-xl-lg-4" />
                      <Button variant="outline-secondary" className="mr-2 xl-lg-2 xs-md-1">Search</Button>
                      {menu}
                      <button id="login">Auth</button>
                </Form>
              </Navbar>;

        return(content_block);
    }
}
