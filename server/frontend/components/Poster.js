import React, {Component} from "react";

export default class Poster extends Component{
    constructor(props) {
        super(props);
        this.state = {
            img: this.props.url,
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            img: nextProps.url,
        });
    }

    render(){
        let post = <img src={this.state.img} alt="Poster" height="402px"/>;

        return(post)
    }
}