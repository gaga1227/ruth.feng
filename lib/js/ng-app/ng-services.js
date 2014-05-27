'use strict';

/* Services */
angular.module('myApp.services', [])

/* ==========================================================================
   APP DATA
   ========================================================================== */

//appStaticFactory
.factory('AppStaticFactory', [function(){
	var data = {
		webServiceURL: 	'data/'
	};
	return data;
}])

/* ==========================================================================
   SECTIONS
   ========================================================================== */
.service('DataService', ['$http', 'AppStaticFactory',
	function($http, AppStaticFactory) {		
		this.getData = function(id) {
			return $http.get(AppStaticFactory.webServiceURL + id + '.json');
		};
	}
]);