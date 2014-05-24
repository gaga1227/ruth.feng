/* ------------------------------------------------------------------------------ */
/* webfonts */
/* ------------------------------------------------------------------------------ */
WebFontConfig = { 
	google: 			{ families: [ 'PT+Serif:400,700,400italic,700italic:latin',
															'Roboto:400,100,300,500,700,900,100italic,300italic,400italic,500italic,700italic,900italic:latin' ] },
	loading: 			function() { console.log('[WF] loading'); 	WebFontUtils.onWFLoading(); },
	active: 			function() { console.log('[WF] active'); 		WebFontUtils.onWFActive(); 	 WebFontUtils.onWFComplete(); },
	inactive: 		function() { console.log('[WF] inactive');	WebFontUtils.onWFInactive(); WebFontUtils.onWFComplete(); },
	fontloading:	function( familyName, fvd ) { console.log( '[WF] ' + familyName, fvd, 'loading' ); },
	fontactive: 	function( familyName, fvd ) { console.log( '[WF] ' + familyName, fvd, 'active' ); },
	fontinactive: function( familyName, fvd ) { console.log( '[WF] ' + familyName, fvd, 'inactive' ); },
	timeout: 			5000
};
WebFontUtils = {
	onWFLoading: 	function() {
									//show loader	
								},
	onWFComplete: function() {
									//hide loader
								},
	onWFActive: 	function() {},
	onWFInactive: function() {}
}
/* ------------------------------------------------------------------------------ */
/* initHomeBanner */
/* ------------------------------------------------------------------------------ */
function initHomeBanner() {		
	//exit
	if (!$('#banner.hasSlideshow').length) return false;
	
	//vars
	var $slideshow = $('#banner.hasSlideshow'),
			$slides = $slideshow.find('.slide'),
			$info = $slideshow.find('.info'),
			$ttl = $info.find('.title'),
			$detail = $info.find('.detail'),
			$btn = $info.find('.btnMore'),
			$btnPrev = $slideshow.find('.btnPrev'),
			$btnNext = $slideshow.find('.btnNext'),
			$pagination = $slideshow.find('.pager'),
		
			//slideshow
			homeSlideshowObj = {},
			speed = 600,
			autoplay = ($slideshow.attr('data-autoplay')=='1') ? true : false,
		
			//functions
			updateTitle = function(nextSlide){					
				//vars
				var $nextSlide = $(nextSlide),
						target = ($nextSlide.attr('target') && $nextSlide.attr('target').length) ? $nextSlide.attr('target') : '_self';
				
				//update info on elems
				$ttl.fadeOut(speed/6, function(){
					$ttl.text($.trim($nextSlide.attr('data-title')));
					$ttl.fadeIn(speed, function(){});
				});
				$detail.fadeOut(speed/6, function(){
					$detail.text($.trim($nextSlide.attr('data-detail')));
					$detail.fadeIn(speed, function(){});
				});
				$btn.fadeOut(speed/6, function(){
					$btn.attr({
						'href':		$.trim($nextSlide.attr('data-href')),
						'target': target
					});
					$btn.fadeIn(speed, function(){});
				});
			};
				
	//onChange handler
	homeSlideshowObj.onChange = function(currSlide, nextSlide, opts, forwardFlag){
		updateTitle(nextSlide);				
	};
	
	//init slideshow
	homeSlideshowObj.Cycle = $slideshow.cycle({
		fx:     						'fade', 
		speed:  						speed, 
		timeout: 						speed * 10,
		nowrap:							0,
		prev:   						$btnPrev, 
		next:   						$btnNext,
		height:							'auto',
		pager:							$pagination,
		slideExpr:					$slides,
		before:							homeSlideshowObj.onChange,
		pagerAnchorBuilder: function(idx, slide) { return '<a href="#" class="btnSlide"><span>'+(idx+1)+'</span></a>'; }
	});
	
	//bind events for touch devices
	if (Modernizr.touch && typeof($.fn.touchSwipe) === 'function') {
		/*using jquery mobile touch*/
		$slideshow.touchSwipe(function(dir){
			if ( dir == 'left' ) 				$slideshow.cycle('next');
			else if ( dir == 'right' ) 	$slideshow.cycle('prev');
		});		
	}
	
	//pause/play slideshow based on autoplay, play from 1st slide
	$slideshow.cycle(autoplay ? 'resume' : 'pause', false);
	
	//return global obj
	return homeSlideshowObj;
}
/* ------------------------------------------------------------------------------ */
/* init */
/* ------------------------------------------------------------------------------ */
var HomeSlideshows, SelectNav, Slideshows, StaticAudios, StaticVideos;
function init(){
	//layout assistance
	insertFirstLastChild('#navItems, #sideNav, #sideNav ul');
	
	//interactions	
	SelectNav = new initSelectNav();
	
	//template specific functions
	if ($('body#home').length) { 
		initHome(); 
	} else {
		//media
		Slideshows = new initSlideshows();
		StaticAudios = new initStaticAudios();
		StaticVideos = new initStaticVideos();
		//form
		initDatepicker();
	}
	
	//debug
	displayDebugInfo('#debugInfo');
}
function initHome(){
	HomeSlideshows = new initHomeBanner();
}
/* DOM Ready */
$(document).ready(function(){
	console.log('DOM Ready');
	initWebFontLoader();
	Platform.addDOMClass();
	init();	
});
