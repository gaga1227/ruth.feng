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
