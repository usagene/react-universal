import React from 'react';

class Registration extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			userName: '',
			password: ''
		};

		if (__CLIENT__) {
			console.log("Registration client instantiation");
		}else if(__SERVER__){
			console.log("Registration server instantiation");
		}
	}

	regsiter(){
		this.props.onRegister(this.state);
	}

	componentWillMount(){
		if (__CLIENT__) {
			console.log("Registration client mount");
		}else if(__SERVER__){
			console.log("Registration server mount");
		}
	}

	updateUserName(e){
		this.setState({userName: e.target.value});
	}

	render(){
		return (
			<div className="panel-body" >
				<div>
					<label htmlFor="txtUserName">User Name:</label><input type="text" onChange={this.updateUserName.bind(this)} name="txtUserName"/>
				</div>
				<div><label htmlFor="txtPassword">Password</label><input type="text" name="txtPassword"/></div>
				<button onClick={this.regsiter.bind(this)}>Register</button>
			</div>
		);
	}
}

export default Registration;

