(function () {
	'use strict';

	angular.module('myApp.services').factory('Getdata', ['$resource',
		function($resource) {
			return $resource('/getdata/');
		}
	]);	

}());
