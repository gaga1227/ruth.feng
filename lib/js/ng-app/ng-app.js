'use strict';
/* ==========================================================================
   APP
   ========================================================================== */
angular.module('myApp', [
	//official modules
	//'ngTouch',
	'ngRoute',
	'ngAnimate',
	'ngResource',
	//lib modules
	'pasvaz.bindonce',
	'firebase',
	//custom app modules
	'myApp.filters',
	'myApp.services',
	'myApp.directives',
	'myApp.controllers'
])

/* ==========================================================================
   RUN
   ========================================================================== */
.run(['$rootScope', '$route', '$filter', '$firebase', function($rootScope, $route, $filter, $firebase) {
	
	/* -------------------------------------------------------------------------- */
	//properties
	
	//speed
	$rootScope.speed = 300;
	
	//for repeating DOM elem for num times
	$rootScope.getTimes = function(n) {
		return new Array(n);
	};
	
	/* -------------------------------------------------------------------------- */
	//remote data ref
	
	//get data from firebase
	var appRef = new Firebase('https://amber-fire-4742.firebaseio.com/');
	$rootScope.fb = $firebase(appRef);
	$rootScope.fb.$on('loaded', function(){
		window.fb = $rootScope.fb;
	});
	
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
			$rootScope.cateID = curr.params.cateID;
			$rootScope.itemID = curr.params.itemID;
		}
	});

	//routeChangeSuccess
	$rootScope.$on('$routeChangeSuccess', function(e, curr, prev) { 
		if (curr.$$route) {
			console.log('e:$routeChangeSuccess', curr.$$route.originalPath, curr.pathParams);
			
			//loader
			$rootScope.isLoading = false;
			
			//scroll to page top
			$.scrollTo( $('body'), $rootScope.speed, {axis:'y'} );
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

	//cate
	$routeProvider.when('/category/:cateID', {
		controller: 'CateController',
		templateUrl: 'partial/cate.html'
	});
	$routeProvider.when('/category', {
		redirectTo: '/category/1'
	});

	//item
	$routeProvider.when('/item/:itemID', {
		controller: 'ItemController',
		templateUrl: 'partial/item.html'
	});
	
	//default
	$routeProvider.otherwise({
		redirectTo: '/home'
	});
	
}]);