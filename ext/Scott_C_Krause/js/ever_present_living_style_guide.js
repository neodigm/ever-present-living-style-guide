//    An endeavor by Scott C. Krause
try {
//    Background Reference
var oBackGroundEvent = chrome.extension.getBackgroundPage();

$( document ).ready(function(){
	//    Fetch abs url from local storage and populate declaritive template element
	//    via ajax

	$(".eplsg-template--article").load( localStorage.getItem("eplsg-template--article"), function(){
		//    Fire up the Zurb Foundation 6 RWD framework

		if( $("#myclipboard_summary").length === 1){
			chrome.storage.local.get("myclipboard_summary", function(fetchedData){
				NotfChromeStor_value = fetchedData["myclipboard_summary"];
				if( typeof NotfChromeStor_value === typeof undefined ){
					$("#myclipboard_summary").html( "Report not available - re-run" );
				}else{
				    var dNow = new Date();
					$("#p-report-caption").html( "ALT Audit Summary: "+ dNow.toString().substr(0, dNow.toString().length - 33));
					$("#myclipboard_summary").html( NotfChromeStor_value );
					$("pre code").addClass("language-markup");
					Prism.highlightAll();
				}
			});
		}else{
		}
		$( document ).foundation();		
		Prism.highlightAll();	
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