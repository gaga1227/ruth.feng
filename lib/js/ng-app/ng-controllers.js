'use strict';

/* Controllers */
angular.module('myApp.controllers', ['ngSanitize'])

/* ==========================================================================
   HOME
   ========================================================================== */
.controller('HomeController', ['$scope', '$rootScope',
function ($scope, $rootScope) {
	//loader
	$rootScope.isLoading = true;
	
	//remote item model
	$rootScope.fb.$on('loaded', function(){	
		//get feat item
		$scope.feat = $rootScope.fb.items['item-' + $rootScope.fb.feat.pid];
		//setup cates contaienr
		$scope.cates = [];
		//private vars
		var cates = $rootScope.fb.cates,
				itemsDisplayLimit = 4;
		//loop through all cates and prep data
		$.each(cates, prepCategory);
		//prep and organise items data in a cate
		function prepCategory(idx, val) {
			//set cate model
			$scope.cates[idx] = {
				"cid": cates[idx].cid,
				"title": cates[idx].title,
				"items": [],
				"noProduct": !cates[idx].item_keys.length
			};
			//prep items data array
			var i, limit;
			//limit items in each cate to display
			limit = Math.min(itemsDisplayLimit, cates[idx].item_keys.length);
			//gather all item within cate
			for (i = 0; i < limit; i++) {
				$scope.cates[idx].items.push($rootScope.fb.items['item-' + cates[idx].item_keys[i].pid]);
			}
		}
		//loader
		$rootScope.isLoading = false;
	});
}])

/* ==========================================================================
   CATEGORY
   ========================================================================== */
.controller('CateController', ['$scope', '$rootScope',
function ($scope, $rootScope) {
	//loader
	$rootScope.isLoading = true;

	//remote item model
	$rootScope.fb.$on('loaded', function(){	
		//private vars
		var cate = $rootScope.fb.cates[$rootScope.cateID - 1];
		//setup items contaienr
		$scope.cate = { items: [] };
		$scope.noProduct = !cate.item_keys.length;
		//gather all item within cate
		for (var i = 0; i < cate.item_keys.length; i++) {
			$scope.cate.items.push($rootScope.fb.items['item-' + cate.item_keys[i].pid]);
		}
		//loader
		$rootScope.isLoading = false;
	});		
}])

/* ==========================================================================
   ITEM
   ========================================================================== */
.controller('ItemController', ['$scope', '$rootScope', 
function ($scope, $rootScope) {	
	//loader
	$rootScope.isLoading = true;
	
	//remote item model
	$rootScope.fb.$on('loaded', function(){
		//get data
		$scope.item = $rootScope.fb.items['item-' + $rootScope.itemID];
		//loader
		$rootScope.isLoading = false;
	});
}]);

