//    (C)2014-2016 Neo Studios Corporation
try {
//    Background Reference
var oBackGroundEvent = chrome.extension.getBackgroundPage();

$( document ).ready(function(){
	//    Fetch abs url from local storage and populate declaritive template element
	//    via ajax
	$(".eplsg-template--article").load( localStorage.getItem("eplsg-template--article"), function(){
		//    Fire up the Zurb Foundation 6 RWD framework
		$( document ).foundation();		
		Prism.highlightAll();
	} );
});

$( window ).load(function(){

});

$( document ).bind("ajaxComplete", function(){
	$( document ).foundation();
});

}
catch( e ){
	//console.log("Error | " + e.message);
}