(function () {
  'use strict';

  // create the angular app
  angular.module('myApp', [
    'ngResource',
    'myApp.controllers',
    'myApp.directives',
    'myApp.services'
    ]);

  // setup dependency injection
  angular.module('myApp.controllers', []);
  angular.module('myApp.services', []);
  angular.module('myApp.directives', []);


}());