(function() {
	var app, express;

	express = require('express');
	var routes = require('./app/routes/getdata');

	app = express();

	//Serve Angular App Static
	app.use("/",express["static"](__dirname + '/public'));

	//Routes for Data Request
	app.get('/getdata', routes.getdata);

	app.listen("8080");

	console.log('Server started at http://localhost:8080');

}).call(this);