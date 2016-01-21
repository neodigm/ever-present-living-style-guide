//    An endeavor by Scott C. Krause
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
		//
		if( $("#myclipboard_temp_summary").length === 1){
			chrome.storage.local.get("myclipboard_temp_summary", function(fetchedData){
				NotfChromeStor_value = fetchedData["myclipboard_temp_summary"];
				$("#myclipboard_temp_summary").html( NotfChromeStor_value );
			});
		}
	});
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