//    An endeavor by Scott C. Krause
try {
//    Background Reference
var oBackGroundEvent = chrome.extension.getBackgroundPage();

$( document ).ready(function(){
	//    Fetch abs url from local storage and populate declaritive template element
	//    via ajax

	$(".eplsg-template--article").load( localStorage.getItem("eplsg-template--article"), function(){
		//    Fire up the Zurb Foundation 6 RWD framework

		if( $("#tab-tool").length === 1){
			//    This logic is only for the ALT Audit
			chrome.storage.local.get("tool_tab_summary", function(fetchedData){
				NotfChromeStor_value = fetchedData["tool_tab_summary"];
				if( typeof NotfChromeStor_value === typeof undefined ){
					$("#tab-tool").html( "Report not available - re-run" );
				}else{
				    var dNow = new Date();
				    $(".callout>p").text("ALT Audit Summary");
					$("#p-report-caption").html( dNow.toString().substr(0, dNow.toString().length - 33));

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
			//    This logic is only for the ALT Audit
		$("h4 a").each(function(){
			//    Append an ordered list of pages
			$("#js-head--pages").append("<li><p class='article--p__roboto text-center'>"+$(this).text()+"</p></li>");
			$( document ).foundation();
		});
		var nALT_DESCR=0,nALT_NO_VALUE=0,nALT_NO_EQUAL=0,nALT_NO=0,nIMG_TOTAL=0;
		$(".nALT_DESCR").each(function(){
			nALT_DESCR += Number( $( this ).text() );
		});
		$("#js-nALT_DESCR").text( nALT_DESCR );
		
		$(".nALT_NO_VALUE").each(function(){
			nALT_NO_VALUE += Number( $( this ).text() );
		});
		$("#js-nALT_NO_VALUE").text( nALT_NO_VALUE );

		$(".nALT_NO_EQUAL").each(function(){
			nALT_NO_EQUAL += Number( $( this ).text() );
		});
		$("#js-nALT_NO_EQUAL").text( nALT_NO_EQUAL );

		$(".nALT_NO").each(function(){
			nALT_NO += Number( $( this ).text() );
		});
		$("#js-nALT_NO").text( nALT_NO );

		$(".nIMG_TOTAL").each(function(){
			nIMG_TOTAL += Number( $( this ).text() );
		});
		$("#js-nIMG_TOTAL").text( nIMG_TOTAL );
		//    Wire up three filter buttons
		$(".button").on("click", function(){
			$("."+$(this).attr("data-toggle-target")).toggleClass("hide");
		});		
	}, 6800);

});

}
catch( e ){
	//console.log("Error | " + e.message);
}