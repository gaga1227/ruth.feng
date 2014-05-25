'use strict';

/* Services */
angular.module('myApp.services', [])

/* ==========================================================================
   APP DATA
   ========================================================================== */

//appStaticFactory
.factory('AppStaticFactory', [function(){
	var data = {
		webServiceURL: 	'http://frenzy.fraynework.com.au/msaeduau/_lib/gcl/webservice/_lib/publicService.cfc',
		strShowAll: 	'Show All'
	};
	return data;
}])

/* ==========================================================================
   SECTIONS
   ========================================================================== */
.service('SectionService', ['$http', 'AppStaticFactory',
	function($http, AppStaticFactory) {		
		//static sections data
		this.getSections = function() {
			return $http.get(AppStaticFactory.webServiceURL + '?method=getSections');
		};
		
		//themes (static)
		this.getThemes = function(sec) {
			var theme = 'org';
			if (sec === 'events') {
				theme = 'blu'	
			} else if (sec === 'programmes') {
				theme = 'ppl'
			} else if (sec === 'publications') {
				theme = 'grn'
			} else if (sec === 'news') {
				theme = 'red'
			}
			return theme;
		};
	}
])

/* ==========================================================================
   ARTICLE
   ========================================================================== */
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

/* ==========================================================================
   PAGE
   ========================================================================== */
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