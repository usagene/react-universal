import React from 'react';
import dispatcher from './../dispatchers/Dispatcher';
import userStore from './../stores/UserStore';
import userActionConstants from './../constants/UserActionConstants';
import {browserHistory} from 'react-router';
import Public from './../components/Public';
import Login from './../components/Login';
import githubApi from "apis/github";

class Demo extends React.Component {
	constructor(props) {
		super(props);

		if (__SERVER__) {
			console.log("Demo Server init");
			console.log(props);
		}

		this.state = {
			user: userStore.getState()
		};
	}

	componentWillMount() {
		const name = 'Guest';
		this.setState({name: `${name}!`});

		if (__SERVER__) {
			console.log("Hello server");
		}

		if (__CLIENT__) {
			console.log("Hello client");
		}
	}

	componentDidMount(){
		userStore.addListener(()=>{
			let state =  userStore.getState();
			if(state.isSignedIn){
				browserHistory.push('/home');
			}
		});
	}

	signIn(action){
		dispatcher.dispatch({
			type: userActionConstants.SignIn,
			action: action
		});
	}

	render() {
		return (
			<div>
				<Login user={this.state.user} onSignIn={this.signIn}></Login>
				<Public repos={this.props.repos}></Public>
			</div>
		);
	}
}

Demo.fetchData = (uid)=>{
	let owner = uid || 'usagene';

	return githubApi.browse(
		["users", owner, "repos"],
		{ }
	).then(json => {
		return json;
	}).catch(error => {
		throw error;
	});
};

export default Demo;

