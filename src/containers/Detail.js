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

	componentWillUpdate(){
		console.log('Detail will be updated');
	}

	onClick(){
		alert('Button clicked');
	}

	render(){
		return (
			<div>
				<div>This is the detail page for!</div>
				<div><button onClick={this.onClick.bind(this)}>Alert</button>  <Link to="/">Back to Home</Link></div>
			</div>
		);
	}
}

export default Detail;

