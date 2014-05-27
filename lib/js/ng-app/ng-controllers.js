'use strict';

/* Controllers */
angular.module('myApp.controllers', ['ngSanitize'])

/* ==========================================================================
   HOME
   ========================================================================== */
.controller('HomeController', ['$scope', '$rootScope', '$window', '$location', '$routeParams',
function ($scope, $rootScope, $window, $location, $routeParams) {
	
	/* -------------------------------------------------------------------------- */
	//data
	
}])

/* ==========================================================================
   CATEGORY
   ========================================================================== */
.controller('CateController', ['$scope', '$rootScope', '$window', '$location', '$routeParams', '$q', 'DataService', 'cate',
function ($scope, $rootScope, $window, $location, $routeParams, $q, DataService, cate) {
	
	/* -------------------------------------------------------------------------- */
	//data
	
	//cate model
	$scope.cate = cate.data;
	$scope.cate.items = [];
		
	//prep items data promises array
	var itemPromises = [], i;
	for (i = 0; i < cate.data.item_keys.length; i++) {
		itemPromises.push( DataService.getData('item-' + cate.data.item_keys[i].pid) );
	}
	
	//combine all items promises
	$q.all(itemPromises).then(function(response) {
		//success
		for (var i = 0; i < response.length; i++) {
			$scope.cate.items.push(response[i].data);
		}
		return response;
	}, function(response) {
		//error
		$rootScope.error = true;
		$rootScope.errorMsg = (response.status == '404') ? App.msg.nocontent_error : App.msg.connection_error;
		return response;
	});	
		
}])

/* ==========================================================================
   ITEM
   ========================================================================== */
.controller('ItemController', ['$scope', 'item', 
function ($scope, item) {
	
	/* -------------------------------------------------------------------------- */
	//data
	
	//item model
	$scope.item = item.data;
	$scope.item.rating = ($scope.item.rating > 5) ? 5 : $scope.item.rating;
	
}]);

