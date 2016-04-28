import React from 'react';

class Login extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			userName: '',
			password: ''
		};

		if (__CLIENT__) {
			console.log("Login client instantiation");
		}else if(__SERVER__){
			console.log("Login server instantiation");
		}
	}

	signIn(){
		this.props.onSignIn(this.state);
	}

	componentWillMount(){
		if (__CLIENT__) {
			console.log("Login client mount");
		}else if(__SERVER__){
			console.log("Login server mount");
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
				<button onClick={this.signIn.bind(this)}>Sign In</button>
			</div>
		);
	}
}

export default Login;

