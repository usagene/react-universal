import dispatcher from './../dispatchers/Dispatcher';
import githubApi from "./../apis/github";
import userActionConstants from './../constants/UserActionConstants';

class UserActions{
	getUserRepos(uid){
		let owner = uid || 'usagene';

		return githubApi.browse(
			["users", owner, "repos"],
			{ }
		).then(json => {
			dispatcher.dispatch({
				type: userActionConstants.GetAllRepo,
				action: json
			});

			return json;
		}).catch(error => {
			throw error;
		});
	}
}
