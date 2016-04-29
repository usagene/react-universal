import React from 'react';
import {Link} from 'react-router';

class Detail extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			id: ""
		};

		console.log('Home instantiated');
	}

	componentWillMount(){
		const id = this.props.params.id;
		if(id){
			this.setState({id: id});
		}
	}

	render(){
		return (
			<div>
				<div>This is the detail page for {this.state.id}!</div>
				<div><Link to="/">Go back home</Link></div>
			</div>
		);
	}
}

export default Detail;

