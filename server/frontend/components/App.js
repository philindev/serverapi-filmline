import React, {Component} from "react";
import {Container} from "react-bootstrap";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Foot";

export default class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			data: null,
			login: null,

			error: null,
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
			    	main.setState({error: "Error"});
			  })
	}

	render() {
		let app =
			<Container>
				<Header status={this.state.login} />
				<Main data={this.state.data}/>
				<div className="wrapper">
					<Footer />
				</div>
			</Container>;

		return(app);
	}
};
