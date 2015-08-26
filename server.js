(function() {
	var app, express;

	express = require('express');
	var routes = require('./app/routes/getdata');
	var test = require('./app/routes/test');

	app = express();

	//Serve Angular App Static
	app.use("/",express["static"](__dirname + '/public'));

	//Routes for Data Request
	if(process.env.NODE_ENV=='test'){
		console.log('Routes defined for test')
		app.get('/getdata', test.getdata);
	}
	else{
		app.get('/getdata', routes.getdata);
	}

	app.listen("4000");

	console.log('Server started at http://localhost:4000');

}).call(this);