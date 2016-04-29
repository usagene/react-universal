import babelPolyfill from "babel-polyfill";
import koa from "koa";
import koaProxy from "koa-proxy";
import koaStatic from "koa-static";
import React from "react";
import ReactDOM from "react-dom/server";
import * as ReactRouter from "react-router";

import githubApi from "apis/github";
import routesContainer from "./routes";
import favicon from "favicon.ico";

const bootstrapComponent = function (renderProps) {
	return new Promise((resolve, reject)=> {
		let component = renderProps.components.find((c)=> {
			return !!c;
		});

		if (component && component.fetchData) {
			component.fetchData().then((data)=> {
				resolve(React.createElement(component, {repos: data}));
			});
		} else if (component) {
			resolve(React.createElement(component));
		}
	});
};

try {
	const app = koa();
	const hostname = process.env.HOSTNAME || "localhost";
	const port = process.env.PORT || 4000;

	let routes = routesContainer;

	app.use(koaStatic("static"));

	app.use(koaProxy({
		host: githubApi.url,
		match: /^\/api\/github\//i,
		map: (path) => path.replace(/^\/api\/github\//i, "/")
	}));

	app.use(function *(next) {
		yield ((callback) => {
			const webserver = __PRODUCTION__ ? "" : `//${this.hostname}:${this.port}`;
			const location = this.path;

			ReactRouter.match({routes, location}, (error, redirectLocation, renderProps) => {
				if (redirectLocation) {
					this.redirect(redirectLocation.pathname + redirectLocation.search, "/");
					return;
				}

				if (error || !renderProps) {
					callback(error);
					return;
				}

				bootstrapComponent(renderProps).then((element)=> {
					let reactString = ReactDOM.renderToString(element);
					let template = (
						`<!doctype html>
						<html lang="en-us">
							<head>
								<meta charset="utf-8" />
								<title>React universal PoC</title>
								<link rel="shortcut icon" href="${favicon}" />
							</head>
							<body>
								<div id="react-root">${reactString}</div>
								<script src="${webserver}/dist/client.js"></script>
								<script></script>
							</body>
						</html>`
					);

					this.type = "text/html";
					this.body = template;

					callback(null);
				});
			});
		});
	});

	app.listen(port, () => {
		console.info("==> ✅  Server is listening");
		console.info("==> 🌎  Go to http://%s:%s", hostname, port);
	});

	if (__DEV__) {
		if (module.hot) {
			console.log("[HMR] Waiting for server-side updates");

			module.hot.accept("routes", () => {
				routes = require("routes");
			});

			module.hot.addStatusHandler((status) => {
				if (status === "abort") {
					setTimeout(() => process.exit(0), 0);
				}
			});
		}
	}
}
catch (error) {
	console.error(error.stack || error);

	throw error;
}
