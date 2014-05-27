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
	//custom app modules
	'myApp.filters',
	'myApp.services',
	'myApp.directives',
	'myApp.controllers'
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
			
			//scroll to page top
			$.scrollTo( $('body'), $rootScope.speed, {axis:'y'} );
		}
	});

	//routeChangeError
	$rootScope.$on('$routeChangeError', function(e, curr, prev, reject) { 		
		if (curr.$$route) {
			console.log('e:$routeChangeError', curr.$$route.originalPath, curr.pathParams, reject);
		}
	});
	
}])

/* ==========================================================================
   CONFIG
   ========================================================================== */
.config(['$routeProvider', function($routeProvider) {	

	/* -------------------------------------------------------------------------- */
	//resolve functions
	var Resolve = {
		home: function(DataService, $location, $rootScope) {
			//reset error;
			$rootScope.error = false;
			$rootScope.errorMsg = '';
			//get data
			var promise = DataService.getData('home');
			promise.then(function(response) {
				//success
				return response.data;
			}, function(response) {
				//error
				$rootScope.error = true;
				$rootScope.errorMsg = (response.status == '404') ? App.msg.nocontent_error : App.msg.connection_error;
				return response;
			});
			return promise;
		},
		cate: function(DataService, $location, $rootScope) {
			//reset error;
			$rootScope.error = false;
			$rootScope.errorMsg = '';
			//get data
			var promise = DataService.getData('cate-' + $rootScope.cateID);
			promise.then(function(response) {
				//success
				return response.data;
			}, function(response) {
				//error
				$rootScope.error = true;
				$rootScope.errorMsg = (response.status == '404') ? App.msg.nocontent_error : App.msg.connection_error;
				return response;
			});
			return promise;
		},
		item: function(DataService, $location, $rootScope) {
			//reset error;
			$rootScope.error = false;
			$rootScope.errorMsg = '';
			//get data
			var promise = DataService.getData('item-' + $rootScope.itemID);
			promise.then(function(response) {
				//success
				return response.data;
			}, function(response) {
				//error
				$rootScope.error = true;
				$rootScope.errorMsg = (response.status == '404') ? App.msg.nocontent_error : App.msg.connection_error;
				return response;
			});
			return promise;
		}
	};

	/* -------------------------------------------------------------------------- */
	//routes

	//home
	$routeProvider.when('/home', {
		controller: 'HomeController',
		templateUrl: 'partial/home.html',
		resolve: {
			home: Resolve.home
		}
	});

	//cate
	$routeProvider.when('/category/:cateID', {
		controller: 'CateController',
		templateUrl: 'partial/cate.html',
		resolve: {
			cate: Resolve.cate
		}
	});
	$routeProvider.when('/category', {
		redirectTo: '/category/1'
	});

	//item
	$routeProvider.when('/item/:itemID', {
		controller: 'ItemController',
		templateUrl: 'partial/item.html',
		resolve: {
			item: Resolve.item
		}
	});
	
	//default
	$routeProvider.otherwise({
		redirectTo: '/home'
	});
	
}]);