import React, {Component} from "react";
import {Row, Col} from "react-bootstrap";
import Info from "./Info";

export default class Main extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({data: nextProps.data})
    }

    render() {
        let app = null;
        return(app);
    }
}
