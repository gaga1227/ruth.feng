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
.service('SectionService', ['$http', 'AppStaticFactory',
	function($http, AppStaticFactory) {		
		this.getSections = function(sec) {
			return $http.get(AppStaticFactory.webServiceURL + sec + '.json');
		};
	}
]);

/* ==========================================================================
   ARTICLE
   ========================================================================== */
/*
.factory('ArticleFactory', [ '$resource', 'AppStaticFactory',
	function($resource, AppStaticFactory) {
		//get article from remote
		return $resource(AppStaticFactory.webServiceURL + '?method=:method&id=:id',
			{ 
				//paramDefaults 
			},
			{
				//override actions methods:
				query_events_article: 		{ method:'GET', params:{method:'getEventsByID', id:'@id'}, isArray:true },
				query_programmes_article:	{ method:'GET', params:{method:'getProgramsByID', id:'@id'}, isArray:true },
				query_news_article:			{ method:'GET', params:{method:'getNewsByID', id:'@id'}, isArray:true },
				query_notifications_article:{ method:'GET', params:{method:'getNotificationsByID', id:'@id'}, isArray:true },
				query_pages_article:		{ method:'GET', params:{method:'getPagesByID', id:'@id'}, isArray:true }
			}
		);
	}
])
*/

/* ==========================================================================
   PAGE
   ========================================================================== */
/*
.factory('PageFactory', [ '$http', 'AppStaticFactory',
	function($http, AppStaticFactory) {
		//get page from remote
		return {
			getPage: function(id) {
				return $http.get(AppStaticFactory.webServiceURL + '?method=getPagesByID&id=' + id);
			},
			getLocalPage: function(id) {
				return $http.get('data/pages/' + id + '.html');
			}
		};
	}
]);
*/