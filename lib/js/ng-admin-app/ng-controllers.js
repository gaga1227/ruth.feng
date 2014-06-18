'use strict';

/* Controllers */
angular.module('adminApp.controllers', ['ngSanitize'])

/* ==========================================================================
   Category
   ========================================================================== */
.controller('CateController', ['$scope', '$rootScope',
function ($scope, $rootScope) {
	
	/* -------------------------------------------------------------------------- */	
	//data
	$rootScope.fb.$on('loaded', function(){
		window.fb = $rootScope.fb;
		$scope.featItem = $rootScope.fb.feat.pid;
		$scope.cate1Items = itemsToString($rootScope.fb.cates[0].item_keys);	
		$scope.cate2Items = itemsToString($rootScope.fb.cates[1].item_keys);	
	});
	
	/* -------------------------------------------------------------------------- */	
	//functions
	$scope.saveFeat = function(){
		//vars
		var item_feat = $.trim($scope.featItem);
		//validation
		if (!$rootScope.fb.items['item-' + item_feat]) {
			alert('Feature item id not found, please add the product item before assign it as feature item.');
			return false;
		}	
		//update fb
		$rootScope.fb.feat.pid = item_feat;
		//save to fb
		$rootScope.fb.$save();
	};

	$scope.saveCate = function(index){
		//vars
		var items_str = $scope['cate' + (index + 1) + 'Items'],
				items_obj_array = [];
		//format string
		items_str = items_str.replace(/ /g, '');
		items_str = items_str.replace(/,+$/, '');
		//assign back to scope
		$scope['cate' + (index + 1) + 'Items'] = items_str;
		//convert to obj array
		items_obj_array = stringToItems(items_str);
		//update fb
		$rootScope.fb.cates[index].item_keys = items_obj_array;
		//save to fb
		$rootScope.fb.$save();
	};
	
	/* -------------------------------------------------------------------------- */
	//private functions
	
	//convert items obj array to simple string
	function itemsToString(items_obj_array) {
		//return empty string on empty category
		if (!items_obj_array || !items_obj_array.length) {
			return 'No product in this category';
		}
		//convert fb obj to display string
		var items_str_array = Array.prototype.map.call(items_obj_array, function(item_obj){
			return item_obj.pid;
		});	
		return items_str_array.join(',');
	}
	
	//convert simple string to items obj array
	function stringToItems(items_str) {
		//return empty string on empty category
		if (!items_str || !$.trim(items_str)) return [];
		//vars
		var i, 
				items_obj_array = [],
				items_str_array = items_str.split(','),
				limit = items_str_array.length;				
		//convert item obj array to string
		for (i = 0; i < limit; i++) {
			items_obj_array[i] = { "pid": items_str_array[i] };
			if (i === (limit - 1)) {
				return items_obj_array;
			}
		}
	}

}])

/* ==========================================================================
   Item
   ========================================================================== */
.controller('ItemController', ['$scope', '$rootScope',
function ($scope, $rootScope) {

	/* -------------------------------------------------------------------------- */	
	//data
	$rootScope.fb.$on('loaded', function(){
		window.fb = $rootScope.fb;
		$scope.item = $rootScope.fb.items['item-' + $rootScope.itemID] || { "pid": $rootScope.itemID };
	});
	
	/* -------------------------------------------------------------------------- */	
	//functions
	$scope.saveItem = function(){
		//validation
		if (!$scope.item.title || !$scope.item.price || !$scope.item.desc || !$scope.item.img_thumb || !$scope.item.img_poster) {
			alert('Following items are compulsary: title, price, desc, img thumb, img poster');
			return false;
		}
		//format string
		if ($scope.item.gallery) {
			$scope.item.gallery = $scope.item.gallery.replace(/\r?\n|\r/g, '');
			$scope.item.gallery = $scope.item.gallery.replace(/ /g, '');
			$scope.item.gallery = $scope.item.gallery.replace(/,+$/, '');
		}
		//update fb
		$rootScope.fb.items['item-' + $rootScope.itemID] = $scope.item;
		//save to fb
		$rootScope.fb.$save();
	};
	
	/* -------------------------------------------------------------------------- */
	//private functions

}]);