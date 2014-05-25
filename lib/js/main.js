/* ------------------------------------------------------------------------------ */
/* init */
/* ------------------------------------------------------------------------------ */
function init(){
	initBtnScroll();
	//template specific functions
	if ($('body#home').length) {
		initHome();
	} else {

	}
}
function initHome(){

}
/* DOM Ready */
$(document).ready(function(){
	console.log('DOM Ready');
	Platform.addDOMClass();
	init();
});

/* ------------------------------------------------------------------------------ */
/* static data */
/* ------------------------------------------------------------------------------ */
var App = {
	msg: {
		connection_error:'网络联结错误，请重新刷新网页。',
		content_unavailable:'网络数据错误，请返回首页。',
	}
};



