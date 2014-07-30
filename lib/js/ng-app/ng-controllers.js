'use strict';

/* Controllers */
angular.module('myApp.controllers', ['ngSanitize'])

/* ==========================================================================
   HOME
   ========================================================================== */
.controller('HomeController', ['$scope', '$rootScope', '$q', 'DataService', 'home',
function ($scope, $rootScope, $q, DataService, home) {
	
	/* -------------------------------------------------------------------------- */
	//private vars
	var feat = home.data.feat,
			cates = home.data.cates,
			itemsDisplayLimit = 4;
	
	/* -------------------------------------------------------------------------- */
	//data - feat item
	
	//loader
	$rootScope.isLoading = true;
	
	//load feat item data
	DataService.getData('item-' + feat.pid).then(function(response) {
		//success
		$scope.feat = response.data;
		//loader
		$rootScope.isLoading = false;
		return response;
	}, function(response) {
		//error
		$rootScope.error = true;
		$rootScope.errorMsg = (response.status == '404') ? App.msg.nocontent_error : App.msg.connection_error;
		//loader
		$rootScope.isLoading = false;
		return response;
	});	
	
	/* -------------------------------------------------------------------------- */
	//data - items in cates
	$scope.cates = [];
	
	//loop through all cates
	$.each(cates, prepCategory);
	
	//prep and load items data in a cate
	function prepCategory(idx, val) {
		//set cate model
		$scope.cates[idx] = {
				"cid": cates[idx].cid,
				"title": cates[idx].title,
				"items": [],
				"noProduct": !cates[idx].item_keys.length
		};
		
		//loader
		$rootScope.isLoading = true;
		
		//prep items data promises array
		var itemPromises = [], i, limit;
		
		//limit items in each cate to display
		limit = Math.min(itemsDisplayLimit, cates[idx].item_keys.length);
		
		//gather all item promises within cate
		for (i = 0; i < limit; i++) {
			itemPromises.push( DataService.getData('item-' + cates[idx].item_keys[i].pid) );
		}
		
		//combine all items promises
		$q.all(itemPromises).then(function(response) {
			//success
			for (var i = 0; i < response.length; i++) {
				$scope.cates[idx].items.push(response[i].data);
			}
			//loader
			$rootScope.isLoading = false;
			return response;
		}, function(response) {
			//error
			$rootScope.error = true;
			$rootScope.errorMsg = (response.status == '404') ? App.msg.nocontent_error : App.msg.connection_error;
			//loader
			$rootScope.isLoading = false;
			return response;
		});
	}

}])

/* ==========================================================================
   CATEGORY
   ========================================================================== */
.controller('CateController', ['$scope', '$rootScope', '$q', 'DataService', 'cate',
function ($scope, $rootScope, $q, DataService, cate) {
	
	/* -------------------------------------------------------------------------- */
	//data
	
	//cate model
	$scope.cate = cate.data;
	$scope.cate.items = [];
	$scope.noProduct = !cate.data.item_keys.length;
	
	//loader
	$rootScope.isLoading = true;
	
	//prep items data promises array
	var itemPromises = [], i;
	
	//gather all item promises within cate
	for (i = 0; i < cate.data.item_keys.length; i++) {
		itemPromises.push( DataService.getData('item-' + cate.data.item_keys[i].pid) );
	}
	
	//combine all items promises
	$q.all(itemPromises).then(function(response) {
		//success
		for (var i = 0; i < response.length; i++) {
			$scope.cate.items.push(response[i].data);
		}
		//loader
		$rootScope.isLoading = false;
		return response;
	}, function(response) {
		//error
		$rootScope.error = true;
		$rootScope.errorMsg = (response.status == '404') ? App.msg.nocontent_error : App.msg.connection_error;
		//loader
		$rootScope.isLoading = false;
		return response;
	});	
		
}])

/* ==========================================================================
   ITEM
   ========================================================================== */
.controller('ItemController', ['$rootScope', '$scope',
function ($rootScope, $scope) {
	
	/* -------------------------------------------------------------------------- */
	//data
	
	//loader
	$rootScope.isLoading = true;
	
	//remote item model
	$rootScope.fb.$on('loaded', function(){
		//loader
		$rootScope.isLoading = false;
		$scope.item = $rootScope.fb.items['item-' + $rootScope.itemID];
	});
	
}]);

