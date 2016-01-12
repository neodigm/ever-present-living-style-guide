var nImg = 0;           //  Images total
var nImg_w_alt = 0;     //  Images with ALT
var nImg_wo_alt = 0;    //  Images without ALT
var nImg_empty_alt = 0; //  Images emtpy ALT
var sAttr = "";         //  SRC and ALT attribs
var sMU = "";

$("img").each(function() {
    if ( $(this).attr("alt") ){
		nImg_w_alt++;
		
        $( this ).css("-webkit-filter", "grayscale(.8) opacity(.08)");
        $( this ).css("filter", "grayscale(1) opacity(.08)");  

    	if( $(this).attr("alt") === "" || $(this).attr("alt") === " " ){
			nImg_empty_alt++;
    	}
    }else{
		nImg_wo_alt++;
    }
    sAttr += $(this).attr("src") + " " + $(this).attr("alt");
    sAttr += "</br>";
    nImg++;
});
sMU  = "Images with ALT " + nImg_w_alt;
sMU += "</br>";
sMU += "Images without ALT " + nImg_wo_alt;
sMU += "</br>";
sMU += "Images with emtpy ALT " + nImg_empty_alt;
sMU += "</br>";
sMU += "Total Images " + nImg;
sMU += "</br>";
chrome.storage.local.set({myclipboard_temp_summary: sMU});
sMU += sAttr;
console.log( sMU );
chrome.storage.local.set({myclipboard_temp: sMU});