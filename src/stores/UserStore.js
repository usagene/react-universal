import {ReduceStore} from 'flux/utils';
import dispatcher from './../dispatchers/Dispatcher';
import userActionConstants from './../constants/UserActionConstants';

let allUsers = [
	{userName: 'demo', password:'111', firstName: 'John', lastName: 'Dole'},
	{userName:'gene', password: '123456', firstName: 'Gene', lastName: 'React'}
];
class UserStore extends ReduceStore {
	getInitialState(){
		return {isSignedIn: false};
	}

	reduce(state, action){
		switch (action.type){
			case userActionConstants.SignIn:
				let matchedUser = allUsers.find(u=>{return u.userName === action.action.userName});
				if(matchedUser){
					return Object.assign({}, state, {isSignedIn: true, firstName: matchedUser.firstName, lastName: matchedUser.lastName});
				}else{
					return Object.assign({}, state, {isSignedIn: false, firstName: null, lastName: null});
				}
			default:
				return state;
		}
	}
}

export default new UserStore(dispatcher);
