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
			chrome.storage.local.get("tool_tab_summary", function(fetchedData){
				NotfChromeStor_value = fetchedData["tool_tab_summary"];
				if( typeof NotfChromeStor_value === typeof undefined ){
					$("#myclipboard_summary").html( "Report not available - re-run" );
				}else{
				    var dNow = new Date();
					$("#p-report-caption").html( "ALT Audit Summary</br>"+ dNow.toString().substr(0, dNow.toString().length - 33));

					$("#myclipboard_temp").html( NotfChromeStor_value );
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
	setTimeout( function( ){
		$("h4 a").each(function(){
			//    Append an ordered list of pages
			$("#js-head--pages").append("<li><p class='article--p__roboto text-center'>"+$(this).text()+"</p></li>");
			$( document ).foundation();
		});
		//    Wire up three filter buttons
		$(".button").on("click", function(){
			$("."+$(this).attr("data-toggle-target")).toggleClass("hide");
		});		
	}, 2800);

});

}
catch( e ){
	//console.log("Error | " + e.message);
}