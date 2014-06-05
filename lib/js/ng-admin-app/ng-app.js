'use strict';
/* ==========================================================================
   APP
   ========================================================================== */
angular.module('adminApp', [
	//official modules
	//'ngTouch',
	'ngRoute',
	'ngAnimate',
	'ngResource',
	//lib modules
	'firebase',
	//custom app modules
	'adminApp.filters',
	'adminApp.services',
	'adminApp.directives',
	'adminApp.controllers'
])

/* ==========================================================================
   RUN
   ========================================================================== */
.run(['$rootScope', '$route', '$filter', function($rootScope, $route, $filter) {
	
	/* -------------------------------------------------------------------------- */
	//properties
	
	//speed
	$rootScope.speed = 300;
	
	//for repeating DOM elem for num times
	$rootScope.getTimes = function(n) {
		return new Array(n);
	};
	
	/* -------------------------------------------------------------------------- */
	//events
	
	//routeChangeStart
	$rootScope.$on('$routeChangeStart', function(e, curr, prev) {
		//getting route data
		if (curr.$$route) {
			console.log('e:$routeChangeStart', curr.$$route.originalPath, curr.pathParams);
			
			//loader
			$rootScope.isLoading = true;
			
			//set global property
			$rootScope.sectID = $filter('cleanPath')(curr.$$route.originalPath);
			//$rootScope.cateID = curr.params.cateID;
			//$rootScope.itemID = curr.params.itemID;
		}
	});

	//routeChangeSuccess
	$rootScope.$on('$routeChangeSuccess', function(e, curr, prev) { 
		if (curr.$$route) {
			console.log('e:$routeChangeSuccess', curr.$$route.originalPath, curr.pathParams);
			
			//loader
			$rootScope.isLoading = false;
		}
	});

	//routeChangeError
	$rootScope.$on('$routeChangeError', function(e, curr, prev, reject) { 		
		if (curr.$$route) {
			console.log('e:$routeChangeError', curr.$$route.originalPath, curr.pathParams, reject);
			
			//loader
			$rootScope.isLoading = false;
		}
	});
	
}])

/* ==========================================================================
   CONFIG
   ========================================================================== */
.config(['$routeProvider', function($routeProvider) {	

	/* -------------------------------------------------------------------------- */
	//routes

	//home
	$routeProvider.when('/home', {
		controller: 'HomeController',
		templateUrl: 'partial/home.html'
	});
	
	//default
	$routeProvider.otherwise({
		redirectTo: '/home'
	});
	
}]);