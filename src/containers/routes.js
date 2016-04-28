import React from "react";
import {Router, Route} from "react-router";

import Demo from './Demo';
import Home from './Home';
import Detail from './Detail';

/**
 * The React Router routes for both the server and the client.
 */
module.exports = (
	<Router>
		<Route path="/" component={Demo}>
		</Route>
		<Route path="home" component={Home}>
		</Route>
		<Route path="detail/:id" component={Detail}></Route>
	</Router>
);
