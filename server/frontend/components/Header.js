import React, {Component} from "react";
import {Navbar, Button, Form, Nav, FormControl, Modal, Col, Row, InputGroup} from "react-bootstrap";

function Auth(props){
    return(
        <Modal
              {...props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
        >
              <Modal.Header closeButton>
                    <Modal.Title as={"h3"}
                                style={{
                                    width: "100vh",
                                    textAlign: "center",
                                    paddingLeft: "40px",
                                }}>

                        Sign in | Sign up

                    </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                    <Row>
                        <Col lg={{ span: 5, offset: 1 }}
                             xl={{ span: 5, offset: 1 }}
                             md={{ span: 5, offset: 1 }}
                             sm={12}
                             xs={12}
                             style={{
                                 borderRight: "2px solid #212529",
                             }}>

                            <Form>
                                  <Form.Group controlId="formBasicEmail">
                                        <Form.Control type="email" placeholder="Email" />
                                  </Form.Group>

                                  <Form.Group controlId="formBasicPassword">
                                        <Form.Control type="password" placeholder="Password" />
                                  </Form.Group>
                                  <Form.Group controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Remember me" />
                                  </Form.Group>
                                  <Button variant="outline-info">
                                        Log in
                                  </Button>
                            </Form>

                        </Col>
                        <Col lg={5}
                             md={5}
                             xl={5}
                             sm={12}
                             xs={12}>

                              <Form>
                                  <Form.Group controlId="formBasicEmail">
                                        <Form.Control type="email" placeholder="Enter email" />
                                  </Form.Group>
                                  <Form.Group controlId="formBasicPassword">
                                        <Form.Control type="password" placeholder="Password" />
                                  </Form.Group>
                                  <Form.Group controlId="formBasicPassword">
                                        <Form.Control type="password" placeholder="Verify" />
                                  </Form.Group>
                                  <Button variant="outline-success">
                                        Auth
                                  </Button>
                            </Form>

                        </Col>
                    </Row>
              </Modal.Body>
        </Modal>
    );
}


export default class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
            login: this.props.status,
            onAuth: false,
        };

        this.offFncAuth = this.offFncAuth.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            login: nextProps.status,
        })
    }

    offFncAuth(){
        this.setState({onAuth: false});
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
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                          <Nav.Link href="#home">Top-100</Nav.Link>
                          <Nav.Link href="#features">Announced</Nav.Link>
                    </Nav>
                    <Form inline>
                          <FormControl type="text" placeholder="Search" className="mr-sm-2 col-xl-lg-4" />
                          <Button variant="outline-secondary" className="mr-2 xl-lg-2 xs-md-1">Search</Button>
                          {menu}
                          <button id="login" type="button" onClick={() => this.setState({onAuth: true})}>Auth</button>
                    </Form>
                </Navbar.Collapse>
              </Navbar>;

        return([content_block, Auth({show: this.state.onAuth, onHide: this.offFncAuth})]);
    }
}
