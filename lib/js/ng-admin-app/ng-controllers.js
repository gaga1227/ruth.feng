'use strict';

/* Controllers */
angular.module('adminApp.controllers', ['ngSanitize'])

/* ==========================================================================
   Category
   ========================================================================== */
.controller('CateController', ['$scope', '$rootScope', '$firebase',
function ($scope, $rootScope, $firebase) {
	
	/* -------------------------------------------------------------------------- */
	//private vars
	
	//data
	$rootScope.fb.$on('loaded', function(){
		window.fb = $rootScope.fb;
		$scope.featItem = $rootScope.fb.feat.pid;
		$scope.cate1Items = itemsToString($rootScope.fb.cates[0].item_keys);	
		$scope.cate2Items = itemsToString($rootScope.fb.cates[1].item_keys);	
	});
	
	$scope.save = function(){
		$rootScope.fb.cates[2].item_keys = stringToItems( $scope.cate4Items );
		console.log('save');
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
		return items_str_array.join(', ');
	}
	
	//convert simple string to items obj array
	function stringToItems(items_str) {
		//return empty string on empty category
		if (!items_str || !$.trim(items_str)) return [];
		
		//vars
		var i, 
				items_obj_array = [],
				items_str_array = items_str.split(', '),
				limit = items_str_array.length;
				
		//convert item obj array to string
		for (i = 0; i < limit; i++) {
			items_obj_array[i] = { "pid": items_str_array[i] };
			if (i == limit - 1) {
				return items_obj_array;
			}
		}
	}

}]);