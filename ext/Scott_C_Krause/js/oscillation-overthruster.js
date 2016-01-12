//    (C)2014-2016 Neo Studios Corporation

//    Background Reference
try {
var oBackGroundEvent = chrome.extension.getBackgroundPage();  
//    Repo base URL /wo ending slash
var sRepo_url = "";
//    Repo Demo base URL /wo ending slash
var sRepo_url_demo = "http://neodigm.github.io/ever-present-living-style-guide-site";


function aJLoad( sPanel ){
	//    Load HTML content into dialog from the configured repo

	switch ( sPanel ){
		case "oc_nav_content_right" :
		//  Change below
			$(".oc_nav_content_right").load( sRepo_url + "/right_nav.html");
		break;
		case "ql_nav_dropdown" :
			$(".ql_nav_dropdown").load( sRepo_url + "/ql_nav_dropdown.html");
		break;
		case "modAboutThisGuide" :
			$("#modAboutThisGuide_ugc").load( sRepo_url + "/modAboutThisGuide.html");
		break;
	}
}

function aJTab( sPanel ){
	//    Create or reuse a tab and make its location that had from an href

	oBackGroundEvent.playAudioFile( 8 );
	oBackGroundEvent.aJTab( sPanel );
}

function loadDynRepo(){
	//    Content Template Driver

	aJLoad("oc_nav_content_right");
	aJLoad("ql_nav_dropdown");
	aJLoad("modAboutThisGuide");
}

$( document ).ready(function(){
	//    Fire up the Zurb Foundation 6 RWD framework
	$( document ).foundation();

	oBackGroundEvent.playAudioFile( 6 ); // Intro sound

	if( localStorage.getItem("MyClipboard") !== null ){
        $("#p_MyClipboard").html( localStorage.getItem("MyClipboard") ); //  Init My Clipboard display
    }

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
	});
	
	$(".tool-cmd--a").on("click", function( e ){
		//    Tool Buttons Wire Up

		oBackGroundEvent.runTool( $( this ).attr("data-tool-cmd-action") );
	});

	$("#cmdOffCanvMyClip").on("click", function(){
		//    Generate the href for the download button
		//    When the Clipboard/OffCanvas is clicked, does not matter if currently open or closed

		chrome.storage.local.get("myclipboard_temp_summary", function(fetchedData){
//alert( fetchedData.myclipboard_temp );
			//oBackGroundEvent.displayMsg(  "Tool Summary\n" + fetchedData.myclipboard_temp_summary );
			//oBackGroundEvent.playAudioFile( 4 ); //    Unknown
		});
		var sMU = $("#p_MyClipboard").html();
		$( "#cmdMyClipboard_download" ).attr("href", "data:text/html;charset=UTF-8,"+encodeURIComponent(sMU) ).attr("download", "MyClipboard.html");
	});

	$("#cmdMyClipboard_clear").on("click", function(e){
		//    Clear clip contents

		$("#p_MyClipboard").html("");
		localStorage.removeItem("MyClipboard");
		e.preventDefault();
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

		oBackGroundEvent.playAudioFile( 7 );    //    ping
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
	if( localStorage.getItem("sound_switch") !== "false" ){
		$(".store-sound-switch--a > i").removeClass("fa-volume-off fa-volume-up").addClass("fa-volume-up");
	}else{
		$(".store-sound-switch--a > i").removeClass("fa-volume-off fa-volume-up").addClass("fa-volume-off");
	}
	loadDynRepo(); //    Fetch Content


	//    Temp dev events - DELETE later
	$(".store-repo-set--a").on("click", function(e){
		localStorage.setItem("repo_name", "ltdc_ux_cookbook");
		e.preventDefault();
	});
	$(".store-repo-get--a").on("click", function(e){
		oBackGroundEvent.displayMsg( localStorage.getItem("repo_name") );
		//    Lets also show the last template content
		oBackGroundEvent.displayMsg( localStorage.getItem("eplsg-template--article") );
alert( localStorage.getItem("eplsg-template--article")  );
		e.preventDefault();
	});
	$(".store-repo-clear--a").on("click", function(e){
		localStorage.removeItem("repo_name");
		localStorage.removeItem("sound_switch");
		e.preventDefault();
	});
	$(".store-sound-switch--a").on("click", function(e){
		//  Check LS val, update LS val, and change icon on button

		if( localStorage.getItem("sound_switch") !== "false" ){
			localStorage.setItem("sound_switch", "false");
			$(".store-sound-switch--a > i").removeClass("fa-volume-off fa-volume-up").addClass("fa-volume-off");
		}else{
			localStorage.setItem("sound_switch", "true");
			$(".store-sound-switch--a > i").removeClass("fa-volume-off fa-volume-up").addClass("fa-volume-up");
			oBackGroundEvent.playAudioFile( 1 );    //    ping
		}
		e.preventDefault();
	});
});

function isValidRepo( sURL ){
	//    
	return true;
}

$( window ).load(function(){ 

});

$('.close-button:not(.callout)').click(function( e ) {
	//    Sound | Audio ping close
	oBackGroundEvent.audioTick_1();	
});

$('.callout > .close-button').click(function( e ) {
	//    Fade Alert (not modal)

	e.preventDefault();
	oBackGroundEvent.audioTick_1();	
	$(this).closest('.callout').fadeOut();
});

$( document ).bind("ajaxComplete", function(){
	$( document ).foundation();

	//    Init Expand all cards
	TweenLite.to( $(".n5-card:even"), 2.1, {height: "256px"});
	TweenLite.to( $(".n5-card:odd"),   .4, {height: "256px"});

	$(".href-loc-stor-wrap-templ").unbind().on("click",function( e ){
		//    Left Nav Menu Click

		e.preventDefault();
		oBackGroundEvent.audioAlert();
		
		var sFilNam = e.target.pathname; //    This contains the extension path
		sFilNam = sFilNam.substring(sFilNam.lastIndexOf( "/" ) + 1);
		if( sFilNam.substring(0, 2) === "--" ){
			//  Open the reveal by attr naming convention
			//  May need to wait for the off canvas to close
			setTimeout( function(){
				$("[data-content-link=" + sFilNam + "]").foundation("open");
				oBackGroundEvent.playAudioFile( 11 );    //    Spoken
			}, 320);
		}else{
			aJTab( sRepo_url + "/" + sFilNam );
		}
	});

	$(".n5-card").unbind().on("click", function( e ){
		//  Pop into modal - open by naming convention

		$("#"+ $(this).attr("id")+"--mod").foundation("open");
		oBackGroundEvent.playAudioFile( 2 );    //    ping

// This is an example of how to generate content for MyClip
$("#p_MyClipboard").html( oBackGroundEvent.appendMyClipboard( $(this).attr("id") ) );

		e.preventDefault();

	});

	$( ".n5-card" ).hover(
		function() {
			//    mouseover
			TweenLite.to( this, 4, {ease: Expo.easeOut, backgroundPosition: "-444px 0px"});
		}, function() {
			//    mouseout
			//TweenLite.to( this, 2, {ease: Expo.easeIn, backgroundPosition: "0px 0px"});
		}
	);

	$(".n5-card--caption-1").unbind().on("click", function( e ){
		//    Iconify or expand card

		var n5c = $( this ).closest(".n5-card");
		var n5c_sumr = $( n5c ).children(".n5-card--summary-1");
		//    Get Ref to I element to change chevron icon
		var n5c_i = $( "#"+n5c.attr("id")+" .n5-card--iconarrow-1 .fa" ).first();

		if( $( n5c_i ).hasClass("fa-chevron-down") ){
			//    open
			oBackGroundEvent.playAudioFile( 3 );
			$( n5c_i ).removeClass("fa-chevron-down").addClass("fa-chevron-up");
			TweenLite.to( n5c, 1, {ease: Expo.easeOut, height: "256px"});
			TweenLite.to( n5c_sumr, 1.2, {ease: Expo.easeOut, delay:0.4, height: "64px"});
		}else{
			//    close
			oBackGroundEvent.playAudioFile( 4 );
			$( n5c_i ).removeClass("fa-chevron-up").addClass("fa-chevron-down");
			TweenLite.to( n5c_sumr, .8, {ease: Expo.easeIn, height: "0px"});
			TweenLite.to( n5c, 1, {ease: Expo.easeIn, height: "48px"});
		}
		e.preventDefault();
		e.stopPropagation();
	});
});

function n5c_icon( n5card ){

}



}
catch( e ){
	//console.log("Error | " + e.message);
}