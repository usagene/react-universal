import React from 'react';
import {Link} from 'react-router';
import dispatcher from './../dispatchers/Dispatcher';
import userStore from './../stores/UserStore';
import userActionConstants from './../constants/UserActionConstants';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: ''
		};
		console.log('Home instantiated');
	}

	componentDidMount(){
		userStore.addListener(()=>{
			this.state = userStore.getState();
		});
	}

	componentWillMount() {
		let signedInUser = userStore.getState();
		if(signedInUser && signedInUser.isSignedIn){
			this.setState({
				firstName: signedInUser.firstName,
				lastName: signedInUser.lastName
			});
		}
	}

	_onChangeFirstName(e){
		this.setState({
			firstName: e.target.value
		});
	}

	_onChangeLastName(e){
		this.setState({
			lastName: e.target.value
		});
	}

	_onSubmit() {
		dispatcher.dispatch({
			type: userActionConstants.UpdateName,
			action: {
				firstName: this.state.firstName,
				lastName: this.state.lastName
			}
		});
	}

	render() {
		return (
			<div>
				<div>This is the home page for {this.state.firstName}!</div>
				<div><label htmlFor="firstName">First Name</label><input type="text" name="firstName" value={this.state.firstName} onChange={this._onChangeFirstName.bind(this)} /></div>
				<div><label htmlFor="lastName">Last Name</label><input type="text" name="lastName" value={this.state.lastName} onChange={this._onChangeLastName.bind(this)} /></div>
				<div>
					<button onClick={this._onSubmit.bind(this)}>Submit Changes</button>
				</div>
				<div><Link to="/">Go back home</Link></div>
			</div>
		);
	}
}

export default Home;

