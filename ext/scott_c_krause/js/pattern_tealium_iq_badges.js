(function(){function l(u,i){
var d=document;if(!d.getElementById(i)){var s=d.createElement('script');s.src=u;s.id=i;d.body.appendChild(s);}}l('https://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js','jquery')})();

document.getElementsByTagName("BODY")[0].insertAdjacentHTML("afterBegin", "<aside id='js-content--span'></aside>");

var sMU = "<table border=0 cellpadding=2 cellspacing=2>";
genTable();

function genTable(){
	var uTarget = "https://visitor-service.tealiumiq.com/datacloudprofiledefinitions/ltd/ltd";
    $.getJSON( uTarget, function( jsn ){
    	//var sMU = this.sMU;
		$.each( jsn.badges, function( key, val) {	
			sMU += "<tr>";
				sMU += "<td class='text-right'>";
				sMU += val.id;
				sMU += "</td>";
				sMU += "<td>";
				sMU += val.name;
				sMU += "</td>";
			sMU += "</tr>";
		});
		sMU += "</table>";
		$("#js-content--span" ).html( sMU );
	}).error(function() { alert("Cannot reach API"); });
	return "sMU: " + sMU;	
}