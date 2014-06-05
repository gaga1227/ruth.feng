'use strict';

/* Controllers */
angular.module('adminApp.controllers', ['ngSanitize'])

/* ==========================================================================
   HOME
   ========================================================================== */
.controller('HomeController', ['$scope', '$rootScope', '$firebase',
function ($scope, $rootScope, $firebase) {
	
	/* -------------------------------------------------------------------------- */
	/* data test */	
	var appRef = new Firebase('https://amber-fire-4742.firebaseio.com/');
	$scope.app = $firebase(appRef);
	
	$rootScope.isLoading = true;
	
	$scope.app.$on('loaded', function(){
		$rootScope.isLoading = false;
	});
	
	
	
	/* -------------------------------------------------------------------------- */
	//private vars
	var itemsDisplayLimit = 4;
	
	/*
	feat = home.data.feat,
	cates = home.data.cates;
	*/
	
	/* -------------------------------------------------------------------------- */
	//data
	
	//loader
	//$rootScope.isLoading = true;
	
	//load all data


}]);