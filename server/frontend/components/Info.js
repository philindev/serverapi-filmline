import React, {Component} from "react";
import {Card, Button} from "react-bootstrap";

export default class Info extends Component{
    constructor(props) {
        super(props);
        this.state = {
            picture: this.props.picture,
            title: this.props.title,
            description: this.props.description,
        };
    }

    render() {
        let card = <Card style={{ width: '18rem' }}>
                          <Card.Img variant="top" src={this.state.picture} />
                          <Card.Body>
                                <Card.Title>{this.state.title}</Card.Title>
                                <Card.Text>
                                    {this.state.description}
                                </Card.Text>
                                <Button variant="outline-primary">Просмотреть</Button>
                          </Card.Body>
                    </Card>;

        return(card);
    }
};
