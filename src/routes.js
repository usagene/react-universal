import React from "react";
import {Router, Route, browserHistory, IndexRoute} from "react-router";

import Demo from './containers/Demo';
import Home from './containers/Home';
import Detail from './containers/Detail';

/**
 * The React Router routes for both the server and the client.
 */
export default (
	<Router history={browserHistory} >
		<Route path="/" component={Demo} ></Route>
		<Route path="/home" component={Home}></Route>
		<Route path="/detail/:id" component={Detail}></Route>
	</Router>
);
