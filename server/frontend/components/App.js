import React, {Component} from "react";

export default class App  extends Component{
	constructor(props){
		super(props);
		this.state = {
			films: null,
		};

		this.GetFilms = this.GetFilms.bind(this);
	}

	componentDidMount() {
		this.GetFilms();
	}

	GetFilms(){
		const main = this;
		fetch('/maintain_films')
			  .then((response) => {
					if (response.status !== 200) {
						return Promise.reject(new Error(response.statusText))
					}
			    	return Promise.resolve(response)
			  })
			  .then((response) => {
			    	return response.json()
			  })
			  .then((data) => {
					main.setState({films: data});
			  })
			  .catch((error) => {
			    	console.log('error: ', error);
			  })
	}

	render() {
		return(
			<h2>All works!</h2>
		);
	}
};
