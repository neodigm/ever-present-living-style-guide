(function(){function l(u,i){
var d=document;if(!d.getElementById(i)){var s=d.createElement('script');s.src=u;s.id=i;d.body.appendChild(s);}}l('https://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js','jquery')})();

document.getElementsByTagName("BODY")[0].insertAdjacentHTML("afterBegin", "<aside id='js-content--span'></aside>");
$("#js-content--span" ).html( genTable() );
function genTable(){
   	var sMU = "cats";
	var uTarget = "https://visitor-service.tealiumiq.com/datacloudprofiledefinitions/ltd/ltd";
    $.getJSON( uTarget, function( jsn, sMU ){
    	var sMU = this.sMU;
		$.each( jsn.badges, function( key, val, sMU ) {
alert( sMU );			
			sMU += " ducks";
		});


	}).error(function() { alert("Cannot reach API"); });
	return "sMU: " + sMU;	
}