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
		connection_error:'我靠！ 网络数据请求错误，请返回首页再重试！',
		nocontent_error:'哎呀！ 您所请求的数据不存在，请返回首页！'
	}
};



