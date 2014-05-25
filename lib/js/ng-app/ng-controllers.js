'use strict';

/* Controllers */
angular.module('myApp.controllers', ['ngSanitize'])

/* ==========================================================================
   MAIN
   ========================================================================== */
.controller('HomeController', ['$scope', '$rootScope', '$window', '$location', '$routeParams',
function ($scope, $rootScope, $window, $location, $routeParams) {
	
	/* -------------------------------------------------------------------------- */
	//property
	
	//console.log('a', $routeParams);
	
}])

/* ==========================================================================
   CATEGORY
   ========================================================================== */
.controller('CateController', ['$scope', '$rootScope', '$window', '$location', '$routeParams',
function ($scope, $rootScope, $window, $location, $routeParams) {
	
	/* -------------------------------------------------------------------------- */
	//property
	
	console.log($routeParams);
	
}])

/* ==========================================================================
   ITEM
   ========================================================================== */
.controller('ItemController', ['$scope', '$rootScope', '$window', '$location', '$routeParams',
function ($scope, $rootScope, $window, $location, $routeParams) {
	
	/* -------------------------------------------------------------------------- */
	//property
	
	console.log($routeParams);
	
}]);

