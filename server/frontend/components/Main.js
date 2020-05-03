import React, {Component} from "react";
import {Row, Col, Button, ButtonGroup} from "react-bootstrap";
import Poster from "./Poster";
import Info from "./Info";

export default class Main extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: {
                posters: [
                    {url: "https://fantasticlub.ru/wp-content/uploads/2019/11/avatar-2-2.jpg"},
                    {url: "https://i.pinimg.com/736x/5a/82/d8/5a82d8b9aa2f8659bb53a6bb8bdd10d3--sally-fields-steven-spielberg.jpg"},
                    {url: "https://thumbs.dfs.ivi.ru/storage6/contents/8/a/99155115b538f2cb13984566f21932.jpg"},
                ],
            },
        };
    }


    render() {
        let app =
        <Row className="main">
            <Row className="main__poster">
                {this.state.data.posters.map((o, i) =>
                    {
                        if(i === 0)
                        {
                            return <Col lg={3} md={3} xl={3} sm={10} xs={10} key={i}>
                                        <Poster url={o.url}/>
                                   </Col>
                        } else {
                            return <Col lg={{offset: "1", span: "3"}} md={{offset: "1", span: "3"}} xl={{offset: "1", span: "3"}}
                                        sm={10} xs={10} key={i}>
                                            <Poster url={o.url}/>
                                   </Col>
                        }
                    })
                }
            </Row>
            <Row className="main__buttons">
                <ButtonGroup size="lg" className="mb-2" style={{width: "90%"}}>
                    <Button>Left</Button>
                    <Button>Middle</Button>
                    <Button>Right</Button>
                </ButtonGroup>
            </Row>
        </Row>;
        return(app);
    }
}
