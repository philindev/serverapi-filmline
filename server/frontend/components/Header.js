import React, {Component} from "react";

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
        return(<h1>Header</h1>);
    }
}
