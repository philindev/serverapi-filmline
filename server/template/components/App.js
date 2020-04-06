import React, {Component} from "react";

export default class App  extends Component{
	constructor(props){
		super(props);
		this.state = {};

		this.GetFilms = this.GetFilms.bind(this);
	}

	async GetFilms(){
		let data = await fetch("/get_films");
		console.log(data);
	}

	render() {
		return super.render();
	}
};
