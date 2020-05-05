import React, {Component} from "react";
import {Row, Col, Button, ButtonGroup} from "react-bootstrap";
import Poster from "./Poster";
import Info from "./Info";

export default class Main extends Component{
    constructor(props) {
        super(props);
        this.state = {
            theWindowOfView: 0,

            data: this.props.data,
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            data: nextProps.data,
        })
    }

    render() {
        let app = null;


        switch(this.state.theWindowOfView){
            case 0:
                app =
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
                                <Button variant="outline-danger">Фильмы</Button>
                                <Button variant="success">Топ-100</Button>
                                <Button variant="outline-danger">Сериалы</Button>
                            </ButtonGroup>
                        </Row>
                    </Row>;
                break;
            case 1:

                break;

        }

        return(app);
    }
}
