import React from 'react';
import dispatcher from './../dispatchers/Dispatcher';
import userStore from './../stores/UserStore';
import userActionConstants from './../constants/UserActionConstants';
import {browserHistory} from 'react-router';
import Public from './../components/Public';
import Login from './../components/Login';
import githubApi from "apis/github";

const fetchRepos = (uid)=>{
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

class Demo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: userStore.getState(),
			repos: null
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

		fetchRepos().then((repos)=>{
			this.setState({repos: repos});
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
				<Public repos={this.state.repos}></Public>
			</div>
		);
	}
}

export default Demo;

