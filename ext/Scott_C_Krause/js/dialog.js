//    (C)2014-2016 Neo Studios Corporation

//    Background Reference
var oBackGroundEvent = chrome.extension.getBackgroundPage();  
//    Repo base URL /wo ending slash
var sRepo_url = "";
//    Repo Demo base URL /wo ending slash
var sRepo_url_demo = "http://neodigm.github.io/ever-present-living-style-guide-site";


function aJLoad( sPanel ){
	//    Load HTML content into dialog from the configured repo

	switch ( sPanel ){
		case "oc_nav_content_left" :
			$(".oc_nav_content_left").load( sRepo_url + "/left_nav.html");
		break;
		case "oc_nav_content_right" :
			$(".oc_nav_content_right").load("http://codepen.io/ltdc_ux_cookbook/pen/VeZxqv.html");
		break;
		case "ql_nav_dropdown" :
			$(".ql_nav_dropdown").load( sRepo_url + "/ql_nav_dropdown.html");
		break;
	}
}

function aJTab( sPanel ){
	//    Create or reuse a tab and make its location that had from an href

	oBackGroundEvent.aJTab( sPanel );
	
}

function loadDynRepo(){
	//    

	aJLoad("oc_nav_content_left");
	aJLoad("ql_nav_dropdown");
}

$( document ).ready(function(){
	//    Fire up the Zurb Foundation 6 RWD framework
	$( document ).foundation();

	$('.owl-carousel').owlCarousel({
	    loop:true,
	    margin:10,
	    nav:false,
	    autoplay:true,
	    autoplayTimeout:2400,
	    autoplayHoverPause:true,
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:3
	        },
	        1000:{
	            items:5
	        }
	    }
	});

	$(document).on('closed.zf.reveal', '#modGetGitRepo[data-reveal]', function () {
		//    The config modal was closed

		if( $("#txtRepo_name").val() == ""){
			sRepo_url = sRepo_url_demo;
			localStorage.setItem("repo_name", sRepo_url);
			oBackGroundEvent.displayMsg(  "No Style Guide connected\nLoading Demo" );
		}else{

		}

// GSAP animation test
TweenLite.to( $("#crd-1"), 6, {width:40, height: 15});

	});

	$("#cmdRepo-new").on("click", function(e){
		//    The [Custom Repo] button on the Config Modal
		//    was explicitly clicked

		var sURL = $("#txtRepo_name").val();
		if( sURL != "" && isValidRepo( sURL ) ){
			sRepo_url = sURL;
			localStorage.setItem("repo_name", sRepo_url);
			oBackGroundEvent.displayMsg(  "Connected to Style Guide\n" + sRepo_url );
		}
		e.preventDefault();
	});

	$(".store-repo-dialog--a").on("click", function(e){
		//    Cog Clicked

		if( localStorage.getItem("repo_name") !== null ){
			$("#txtRepo_name").val( localStorage.getItem("repo_name") );
		}
		$("#modGetGitRepo").foundation("open");
		e.preventDefault();
	});

	//    Startup Application Logic

	if( localStorage.getItem("repo_name") === null ){
		sRepo_url = sRepo_url_demo;
		$("#modGetGitRepo").foundation("open");
		$("#txtRepo_name").focus();
	}else{
		//    A repo URL exists in local storage, so let's use it
		sRepo_url = localStorage.getItem("repo_name");
	}
	loadDynRepo(); //    Fetch Content






	//    Temp dev events - delete later
	$(".store-repo-set--a").on("click", function(e){
		localStorage.setItem("repo_name", "ltdc_ux_cookbook");
		e.preventDefault();
	});
	$(".store-repo-get--a").on("click", function(e){
		oBackGroundEvent.displayMsg( localStorage.getItem("repo_name") );
		e.preventDefault();
	});
	$(".store-repo-clear--a").on("click", function(e){
		localStorage.removeItem("repo_name");
		e.preventDefault();
	});	
});

function isValidRepo( sURL ){
	//    
	return true;
}

$( window ).load(function(){ 

});

$('.callout > .close-button').click(function( e ) {
	//    Fade Alert

	e.preventDefault();
	oBackGroundEvent.audioTick_1();	
	
	$(this).closest('.callout').fadeOut();
});

$( document ).bind("ajaxComplete", function(){
	$( document ).foundation();

	$(".oc_nav_content_left--a").unbind().on("click",function( e ){
	//    Left Nav Menu Click

		e.preventDefault();
		oBackGroundEvent.audioAlert();
		
		var sFilNam = e.target.pathname; //    This contains the extension path
		sFilNam = sFilNam.substring(sFilNam.lastIndexOf( "/" ) + 1);
		if( sFilNam.substring(0, 2) === "--"){
alert("do reveal | "+ sFilNam);
		}else{
			aJTab( sRepo_url + "/" + sFilNam );
		}
	});

	TweenLite.to( $(".n5-card__default"), 0, {height: "256px"});

	$(".n5-card--iconarrow-1__default > i").unbind().on("click", function(){
		//

		var n5c = $( this ).closest(".n5-card__default");
		var n5c_sum = $( n5c ).children(".n5-card--summary-1__default");
		
		oBackGroundEvent.audioAlert();
		if( $( this ).hasClass("fa-chevron-down") ){
			$( this ).removeClass("fa-chevron-down").addClass("fa-chevron-up");
			TweenLite.to( n5c, .4, {height: "256px"});
			TweenLite.to( n5c_sum, .8, {height: "64px"});			

		}else{
			$( this ).removeClass("fa-chevron-up").addClass("fa-chevron-down");
			TweenLite.to( n5c_sum, .4, {height: "0px"});			
			TweenLite.to( n5c, .8, {height: "48px"});
		}
	});
});

function n5c_icon( n5card ){

}