//    An endeavor by Scott C. Krause

//    Background Reference
try {
var oBackGroundEvent = chrome.extension.getBackgroundPage();  
//    Repo base URL /wo ending slash
var sRepo_url = "";
//    Repo Demo base URL /wo ending slash
var sRepo_url_demo = "http://neodigm.github.io/ever-present-living-style-guide-site";

var n5Tags = new n5Tags();
var n5Contents = new n5Contents();

n5Tags.addTag( new n5Tag("accessibility"  ,"accessibility"  ,"296661",	"Allow people with disabilities to perceive, understand, navigate, and interact with the Web"));
n5Tags.addTag( new n5Tag("browser"        ,"browsers"       ,"4D2850",	"User Agents, Android, Blink, Chrome, Edge, Explorer, Firefox, Opera, Safari, Webkit"));
n5Tags.addTag( new n5Tag("color"          ,"colors"         ,"EC3A40",	"Branded Color Motif, Palette, Scheme, Theme"));
n5Tags.addTag( new n5Tag("component"      ,"components"     ,"506F8D",	"Bundle markup and styles into encapsulated custom HTML elements"));
n5Tags.addTag( new n5Tag("content"        ,"content"        ,"E80C7A",	"Creating and distributing valuable, relevant, and consistent content"));
n5Tags.addTag( new n5Tag("crm"            ,"CRM"            ,"EEBD00",	"Customer Relationship Management"));
n5Tags.addTag( new n5Tag("form"           ,"forms"          ,"A49060",	"Data input, validation and file upload"));
n5Tags.addTag( new n5Tag("imagery"        ,"images"         ,"2C6418",	"Image presentation formatting and optimization"));
n5Tags.addTag( new n5Tag("media"          ,"media"          ,"4B3B32",	"Video and Audio presentation and capture"));
n5Tags.addTag( new n5Tag("mobile"         ,"mobile"         ,"BF5B21",	"Hybrid and Native Mobile Apps"));
n5Tags.addTag( new n5Tag("pattern"        ,"patterns"       ,"968851",	"Common reusable design patterns"));
n5Tags.addTag( new n5Tag("process"        ,"processes"      ,"4CA192",	"Business, Creative and Technical workflow"));
n5Tags.addTag( new n5Tag("performance"    ,"performance"    ,"DC8C3D",	"Web performance optimization tuning"));
n5Tags.addTag( new n5Tag("resource"       ,"resources"      ,"9B3C25",	"Curated UX Blogs, Knowledge base, articles, links and online tools"));
n5Tags.addTag( new n5Tag("seo"            ,"SEO"            ,"748C7A",	"Search engine optimization and Marketing"));
n5Tags.addTag( new n5Tag("social"         ,"social"         ,"9E9E4D",	"Social Media Platforms and Networks"));
n5Tags.addTag( new n5Tag("testing"        ,"testing"        ,"E5809C",	"QA testing, user acceptance, security, defect, integration, and regression"));
n5Tags.addTag( new n5Tag("typography"     ,"typography"     ,"256069",	"Text layout presentation design"));
n5Tags.addTag( new n5Tag("utility"        ,"utilities"      ,"E80C7A",	"Diagnostic tools, scripts, snippets, audits, generators and templates"));
n5Tags.addTag( new n5Tag("ux"             ,"UX"             ,"DCA907",	"User Experience, Computer Human Interaction and User Interface design"));
n5Tags.addTag( new n5Tag("video"          ,"videos"         ,"F24444",	"HTML5 Video Player"));

n5Contents.addContent( new n5Content("PATTERN",	"Primary Banner",	"Pattern: Primary Banner Component",	1,	"pattern-primary-banner-component.html",	"component",				"accessibility|content|pattern",""));
n5Contents.addContent( new n5Content("PATTERN",	"Tabs | Accordions",	"Pattern: Tabs | Accordions Component",	2,	"pattern-custom-accordion-component.html",	"component",			"accessibility|content|pattern",""));
n5Contents.addContent( new n5Content("PATTERN",	"Carousel",	"Pattern: Carousel Component",	3,	"pattern-carousel.html",	                                                "component","accessibility|content|pattern|ux",""));
n5Contents.addContent( new n5Content("PATTERN",	"JavaScript Media Queries",	"Pattern: JavaScript Media Queries Component",	4,	"pattern-javascript-media-queries.html",	"component","browser|pattern",""));
n5Contents.addContent( new n5Content("PATTERN",	"A11y",	"Accessibility Patterns",	5,	"pattern-a11y.html",	                                                        "accessibility","pattern",""));
n5Contents.addContent( new n5Content("PATTERN",	"A11y | Skip Nav",	"Skip Nav Pattern",	6,	"pattern-a11y-skip-nav.html",	                                                  "pattern","accessibility|form",""));

function n5Tags(){
	this.an5Tags = [];
	this.addTag = function( oTag ){
		this.an5Tags.push( oTag );
	};
	this.getTag = function( sName_short ){
		//    Iterate, fetch and return obj given name (token)
		for(var iCnt=0; iCnt < this.an5Tags.length; iCnt++){
			if( this.an5Tags[iCnt].name_short === sName_short){
				return this.an5Tags[iCnt];
			}
		}
	}
	this.addCardSub = function( sName_short, sTags_single ){
		//    Insanity - Append the name of the current tag to the end of the 
		//    delimited subtotal property.
		for(var iCnt=0; iCnt < this.an5Tags.length; iCnt++){
			if( this.an5Tags[iCnt].name_short === sName_short){
				this.an5Tags[iCnt].cardSubTotal = this.an5Tags[iCnt].cardSubTotal + sTags_single +"|";
			}		
		}
	}
	this.getCardSub = function( sName_short ){
		//    Iterate, fetch and return total given name (token)
		for(var iCnt=0; iCnt < this.an5Tags.length; iCnt++){
			if( this.an5Tags[iCnt].name_short === sName_short){
				return this.an5Tags[iCnt].cardSubTotal;
			}
		}
	}
	this.getCardSubAll = function( sTagToken ){
		//    Iterate, fetch and return an array of DTO objects given name (token)
		var aTag_Count = [];
		var aCompare = [];
		var sCompare = "";

		for(var iCnt=0; iCnt < this.an5Tags.length; iCnt++){

			if( this.an5Tags[iCnt].cardSubTotal.length > 0 && this.an5Tags[iCnt].name_short === sTagToken){
				aCompare = this.an5Tags[iCnt].cardSubTotal.split("|");
				for(var iCompare=0; iCompare < aCompare.length; iCompare++){
					if(sCompare.indexOf( aCompare[iCompare] ) >= 0){
					}else{
						sCompare += aCompare[iCompare];
						var nOccr= 0;
						nOccr = occurrences(this.an5Tags[iCnt].cardSubTotal, aCompare[iCompare], false);
						aTag_Count.push( {source: aCompare[iCompare], target: "name_short"});
						aTag_Count.push( {source: nOccr,              target: "tag_count"});
					}
				}
			}
		}
		return aTag_Count;
	}
}

function n5Tag(name_short,plural,color,summary){
	this.name_short = name_short;
	this.plural = plural;
	this.summary = summary;
	this.color = color;
	this.cardSubTotal = "";
}

function n5Contents(){
	this.an5Contents = [];
	this.addContent = function( oContent ){
		this.an5Contents.push( oContent );
	};
	this.getContentByTags = function( sTags ){
		//    Iterate, fetch and return an array of objs given a tag fragment

		var aContainedInTags = [];
		for(var iCnt=0; iCnt < this.an5Contents.length; iCnt++){
			if( this.an5Contents[iCnt].tags.indexOf( sTags ) > 0 ){
				aContainedInTags.push( this.an5Contents[iCnt] );
			}
		}
		return aContainedInTags;		
	}
	this.countContentByTags = function( sName_short ){
		//    Iterate, count and return total (from tags) given name (token)
		var iCnt_total = 0;
		sName_short += "|";
		for(var iCnt=0; iCnt < this.an5Contents.length; iCnt++){
			if( this.an5Contents[iCnt].tags.indexOf( sName_short ) > 0 ){
				iCnt_total++;
			}
		}
		return iCnt_total;
	}
	this.countContentByTag = function( sTagToken ){
		//    Iterate, count and return total (from primary tag) given name (token)
		var iCnt_total = 0;
		for(var iCnt=0; iCnt < this.an5Contents.length; iCnt++){
			if( this.an5Contents[iCnt].tag === sTagToken){
				iCnt_total++;
			}
		}
		return iCnt_total;
	}
	this.getTags = function( sName_short ){
		//    Return an array of short_names and counts
		//    Associated to this tag container
		//    Return an empty array if 0
		var aTag_Count = [];
		var nTag_Count = this.countContentByTag( sName_short );
		if( nTag_Count > 0 ){
			aTag_Count.push( {source: sName_short, target: "name_short"});
			aTag_Count.push( {source: nTag_Count, target: "tag_count"});
		}
		return aTag_Count;
	}
	this.hasContent = function( sName_short ){
		//    Return true if this card has any content
		//    Parse both tag and contained in tagS
		for(var iCnt=0;iCnt < this.an5Contents.length; iCnt++){
			if(( this.an5Contents[iCnt].tag === sName_short ) || ( this.an5Contents[iCnt].tags.indexOf( sName_short ) >= 0)){
				return true;
			}
		}
		return false;
	}
}

function n5Content(content_type, name_short, name_long, sound, file_name, tag, tags, notification){
	this.content_type = content_type;  //    PATTERN  TOOL-CSS  TOOL-JS  RESOURCE  DIALOG
	this.name_short = name_short; // aka token
	this.name_long = name_long;
	this.sound = sound;
	this.file_name = file_name;
	this.tag = tag; // aka token
	this.tags = "|" + tags + "|";
	this.notification = notification;
}

function popuTemplate(sTemplate_id, aContents){
	//    Return a string after swapping an assn array (objects)
	//    replacing pipe delm tokens in the template html
	//    If all the tokens have been replaced but there is still data in 
	//    the contents array then use a new copy of the template.

	if( aContents.length > 0){
		var $oTempl = $("#" + sTemplate_id);
		var sMUout = ""; //  Might contain more than one template html
		var sMUprc = $oTempl.html(); // In process string
		for(var iC=0; iC < aContents.length; iC++){		
			if( sMUprc.indexOf("|") <= 0){
				sMUout += sMUprc;
				sMUprc = $oTempl.html();
			}
			sMUprc = sMUprc.replace(("|"+aContents[iC].target+"|"), aContents[iC].source);
		}
		sMUout += sMUprc;
		return sMUout;
	}else{
		return "";
	}
}

function occurrences(string, subString, allowOverlapping) {
	//  Return the number of accurences of one string within another
    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}

function aJLoad( sPanel ){
	//    Load HTML content into dialog from the configured repo
	switch ( sPanel ){
		case "oc_nav_content_right" :
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

	oBackGroundEvent.playAudioFile( ( Math.floor((Math.random()*2)) === 0) ? 6 : 4 ); //  Random Intro sound

	//    Lets init the n5 Cards
	$(".n5-card").each(function(){
		var sTagToken = $( this ).attr("data-n5c-token");

		//    Populate the cards caption and summary
		$( this ).find(".n5-card--caption-1-h3").html(  n5Tags.getTag( sTagToken ).name_short );
		$( this ).find(".n5-card--summary-1 > p").html( n5Tags.getTag( sTagToken ).summary );

		//    Render tag labels /w count into card container
		//    Primary Tag
		$oCardContainer = $( this ).find(".n5-card--img-1");
		$oCardContainer.html( popuTemplate("templ_tag_label_count_primary",
			n5Contents.getTags( sTagToken ) ));
		//    Associated TagS
		if( n5Contents.countContentByTags( sTagToken ) > 0 ){
			var aTags = n5Contents.getContentByTags( sTagToken );
			for(var iC=0; iC < aTags.length; iC++){
				n5Tags.addCardSub( sTagToken, aTags[iC].tag ); // Increment counters
			}

			$oCardContainer.html( $oCardContainer.html() + popuTemplate("templ_tag_label_count",
			n5Tags.getCardSubAll( sTagToken )) );
		}
		//    Populate Reveal Modal Dialogs (ugc) via template (zoomed nav n5c state)
if( sTagToken !== "accessibility"){		
$("#"+ $(this).attr("id")+"--mod__ugc").html(popuTemplate("templ_n5-card-mod-details",[{source: "x", target: "y"}]));
}

	});

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
		}
	});
	
	$(".tool-cmd--a").on("click", function( e ){
		//    Tool Buttons Wire Up
		var sSoundCode = $(this).attr("data-sound");
		oBackGroundEvent.playAudioFile( sSoundCode );    //    From sound attr on anchor
		//$(".rev-modal").foundation("close");
		$("#modLoading").foundation("open");				
		oBackGroundEvent.runTool( $( this ).attr("data-tool-cmd-action") );
		setTimeout( function( ){
			$("#modLoading").foundation("close");
		}, 640);
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
		//    Notify the local storage vars / check console.log as well

		console.clear()
		console.group("Local Storage");
			oBackGroundEvent.displayMsg( "repo_name: " + localStorage.getItem("repo_name") );
			console.log("repo_name: " + localStorage.getItem("repo_name"));

			oBackGroundEvent.displayMsg( "article: " + localStorage.getItem("eplsg-template--article") );
			console.log("article: " + localStorage.getItem("eplsg-template--article"));

			oBackGroundEvent.displayMsg( "sound_switch: " + localStorage.getItem("sound_switch") );
			console.log("sound_switch: " + localStorage.getItem("sound_switch"));

			console.groupCollapsed("MyClipboard");
				console.log("MyClipboard: " + localStorage.getItem("MyClipboard"));
			console.groupEnd();
		console.groupEnd();

		console.group("Chrome Storage");
	        chrome.storage.local.get("myclipboard_summary" , function(fetchedData){
	            NotfChromeStor_value = fetchedData["myclipboard_summary"];
	            console.log(  "Tool Summary: " + NotfChromeStor_value );
	        });
	        chrome.storage.local.get("myclipboard_temp" , function(fetchedData){
	            NotfChromeStor_value = fetchedData["myclipboard_temp"];
	            console.log(  "Tool Report: " + NotfChromeStor_value );
	        });
		console.groupEnd();

		e.preventDefault();
	});
	$(".store-repo-clear--a").on("click", function(e){
		localStorage.removeItem("repo_name");
		localStorage.removeItem("sound_switch");
		chrome.storage.local.clear(function() {
		    var error = chrome.runtime.lastError;
		    if (error) {
		        console.error(error);
		    }
		});
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
	TweenLite.to( $(".n5-card:even"), 1.8, {height: "256px"});
	TweenLite.to( $(".n5-card:odd"),  1.0, {height: "256px"});

	$(".href-loc-stor-wrap-templ").unbind().on("click",function( e ){
		//    Left Nav Menu Click OR any in-doc click

		e.preventDefault();
		oBackGroundEvent.audioAlert();
		
		var sFilNam = e.target.pathname; //    This contains the extension path
		sFilNam = sFilNam.substring(sFilNam.lastIndexOf( "/" ) + 1);

		if( sFilNam.substring(0, 2) === "--" ){
			//  Open the reveal by attr naming convention
			//  May need to wait for the off canvas to close
			var sSoundCode = $(this).attr("data-sound");
			if( typeof sSoundCode === typeof undefined){ sSoundCode = 1; }
			setTimeout( function( ){
				$("[data-content-link=" + sFilNam + "]").foundation("open");
				oBackGroundEvent.playAudioFile( sSoundCode );    //    From sound attr on anchor
			}, 320);
		}else{
			aJTab( sRepo_url + "/" + sFilNam );
		}
	});

	$(".n5-card").unbind().on("click", function( e ){
		//  Pop into modal - open by naming convention
		var sTagToken = $( this ).attr("data-n5c-token");
		if( n5Contents.hasContent( $( this ).attr("data-n5c-token") )){
			$("#"+ $(this).attr("id")+"--mod").foundation("open");
			oBackGroundEvent.playAudioFile( 3 );    //    wind whizz
			// Generate content for MyClip
			$("#p_MyClipboard").html( oBackGroundEvent.appendMyClipboard( "Open "+sTagToken ) );
		}else{
			oBackGroundEvent.playAudioFile( 10 );    //    beep errorish
		}
		e.preventDefault();
	});

	$( ".n5-card" ).hover(
		function() {
			//    mouseover
			TweenLite.to( this, 4, {ease: Expo.easeOut, backgroundPosition: "-444px 0px"});
		}, function() {
			//    mouseout
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
			//oBackGroundEvent.playAudioFile( 5 );    //    slap echo
			oBackGroundEvent.playAudioFile( 18 );    //    mechanical whirl
			$( n5c_i ).removeClass("fa-chevron-down").addClass("fa-chevron-up");
			TweenLite.to( n5c, 1, {ease: Expo.easeOut, height: "256px"});
			TweenLite.to( n5c_sumr, 1.2, {ease: Expo.easeOut, delay:0.4, height: "64px"});
		}else{
			//    close
			oBackGroundEvent.playAudioFile( 8 );    //    alien whirl
			$( n5c_i ).removeClass("fa-chevron-up").addClass("fa-chevron-down");
			TweenLite.to( n5c_sumr, .8, {ease: Expo.easeOut, height: "0px"});
			TweenLite.to( n5c, 1, {ease: Expo.easeOut, height: "48px"});
		}
		e.preventDefault();
		e.stopPropagation();
	});

	$(".cmd--dropdown").on("click", function(){
		//  Quick Links Spoken Audio - 12
		oBackGroundEvent.playAudioFile( 12 );
	});
});

}
catch( e ){
	//console.log("Error | " + e.message);
}