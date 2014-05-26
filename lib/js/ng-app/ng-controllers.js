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
	
	//console.log($routeParams);
	
}])

/* ==========================================================================
   ITEM
   ========================================================================== */
.controller('ItemController', ['$scope', '$rootScope', '$window', '$location', '$routeParams', 'item', 
function ($scope, $rootScope, $window, $location, $routeParams, item) {
	
	/* -------------------------------------------------------------------------- */
	//data
	
	//item model
	$scope.item = item.data;
	$scope.item.rating = ($scope.item.rating > 5) ? 5 : $scope.item.rating;
	
	/* -------------------------------------------------------------------------- */
	//functions
	
	//for repeating DOM elem for num times
	$scope.getTimes = function(n) {
		return new Array(n);   
	};
	
}]);

