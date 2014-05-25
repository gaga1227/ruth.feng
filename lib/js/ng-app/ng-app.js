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
	
	//routeChangeStart
	$rootScope.$on('$routeChangeStart', function(e, curr, prev) {
		//getting route data
		if (curr.$$route) {
			$rootScope.cateID = curr.params.cateID;
			$rootScope.itemID = curr.params.itemID;
			console.log('e:$routeChangeStart', curr.$$route.originalPath, curr.pathParams);
		}
	});

	//routeChangeSuccess
	$rootScope.$on('$routeChangeSuccess', function(e, curr, prev) { 
		if (curr.$$route) {
			console.log('e:$routeChangeSuccess', curr.$$route.originalPath, curr.pathParams);
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
		home: function(SectionService, $location) {
			var promise = SectionService.getSections('home');
			promise.then(function(response) {
				return response.data;
			}, function(response) {
				alert(App.msg.connection_error);
				return response;
			});
			return promise;
		},
		cate: function(SectionService, $location, $rootScope) {
			var promise = SectionService.getSections('cate-' + $rootScope.cateID);
			promise.then(function(response) {
				return response.data;
			}, function(response) {
				alert(App.msg.connection_error);
				return response;
			});
			return promise;
		},
		item: function(SectionService, $location, $rootScope) {
			var promise = SectionService.getSections('item-' + $rootScope.itemID);
			promise.then(function(response) {
				return response.data;
			}, function(response) {
				alert(App.msg.connection_error);
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
	$routeProvider.when('/item', {
		redirectTo: '/item/1'
	});
	
	//default
	$routeProvider.otherwise({
		redirectTo: '/home'
	});
	
}]);