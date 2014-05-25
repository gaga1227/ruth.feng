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
	/* vars */
	
	/* -------------------------------------------------------------------------- */
	/* functions */
	
	/* -------------------------------------------------------------------------- */
	/* properties */
	
	/* -------------------------------------------------------------------------- */
	/* events */
	
	//routeChangeStart
	$rootScope.$on('$routeChangeStart', function(e, curr, prev) {
		//getting route data
		if (curr.$$route) {
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
			sections: function(SectionService, $location) {
				var promise = SectionService.getSections();
				promise.then(function(response) {
					return response.data;
				}, function(response) {
					App.utils.popMsg(App.data.msg.connection_error);
					return response;
				});
				return promise;
			},
			page: function(PageFactory, $rootScope, $location) {
				var promise = PageFactory.getPage($rootScope.pageID);
				promise.then(function(data) {
					return data;
				}, function(data) {
					App.utils.popMsg(App.data.msg.connection_error);
					return data;
				});
				return promise;
			}
		};
	
	/* -------------------------------------------------------------------------- */
	//routes
	
	//list
	$routeProvider.when('/events', {
		templateUrl: 'partials/lists.html',
		controller:  'ListsController',
		resolve: {
			sections: Resolve.sections,
			groups: Resolve.list
		},
		depth:2
	});
	
	//article
	$routeProvider.when('/events/article/:articleID', {
		templateUrl: 'partials/article.html', 
		controller:  'ArticleController',
		resolve: {
			article: Resolve.article
		},
		depth:4
	});
	
	//default
	/*
	$routeProvider.otherwise({
		redirectTo:  '/home'
	});
	*/
}]);