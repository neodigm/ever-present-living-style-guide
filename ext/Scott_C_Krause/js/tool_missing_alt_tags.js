var nALT_NO = 0;        //  Alt does not exist
var nALT_NO_EQUAL = 0;  //  Alt without an equal 
var nALT_NO_VALUE = 0;  //  Alt with empty quotes
var nALT_DESCR = 0;     //  Alt with desc
var nIMG_TOTAL = 0;     //  Total Images
var sIMG_ISSUE = "";    //  Image Issue

var sLocation = "";     //  URL and Title
var sAttr = "";         //  Outer HTML
var sMU = "";

sLocation  = "<h4 class='text-center'>"
sLocation += "<a href='"+ document.location + "'>"+document.title+"</a>";
sLocation += "</h4>"

sAttr += "<table border=1>";

$("img").each(function(){
    //    Iterate through all of the image elements

    if( $( this )[0].hasAttribute("alt") ){
        if( $( this ).attr("alt").length <= 0 ){
            if( $( this )[0].outerHTML.toString().indexOf('alt=""') >= 0){
                sIMG_ISSUE = "Alt with empty quotes";
                sIssue_class = "status-table--td__warn"
                nALT_NO_VALUE++;
            }else{
                sIMG_ISSUE = "Alt without an equal";
                sIssue_class = "status-table--td__miss"
                nALT_NO_EQUAL++;
            }
        }else{
            sIMG_ISSUE = "Alt with desc";
            sIssue_class = "status-table--td__info"
                $( this ).css("-webkit-filter", "grayscale(.8) opacity(.08)");
                //$( this ).css("filter", "grayscale(1) opacity(.08)"); 
            nALT_DESCR++;
        }
    }else{
        sIMG_ISSUE = "Alt does not exist";
        sIssue_class = "status-table--td__miss"
        nALT_NO++;
    }
    nIMG_TOTAL++;
    sAttr += "<tr class='"+sIssue_class.split("__").pop()+"'><td>" + nIMG_TOTAL + "</td>";
    sAttr += "<td class='"+sIssue_class+"''>" + sIMG_ISSUE + "</td>";
    sAttr += "<td class='"+"status-table--td__source"+"'><pre><code>";
    sAttr += $( this )[0].outerHTML.toString().replace(/\</g,"&lt;").replace(/\>/g,"&gt;");
    sAttr += "</code></pre></td></tr>";
});
sAttr += "</table>";

sMU  = "Total Images " + nIMG_TOTAL;
sMU += " Alt does not exist " + nALT_NO;
sMU += " Alt without an equal " + nALT_NO_EQUAL;
sMU += " Alt with empty quotes " + nALT_NO_VALUE;
sMU += " Alt with desc " + nALT_DESCR;

chrome.storage.local.get("tool_tab_summary", function(fetchedData){
    sChromeStor_value = fetchedData["tool_tab_summary"];
    if(typeof sChromeStor_value !== typeof undefined){
        sMU += sChromeStor_value;
    }
    chrome.storage.local.set({tool_tab_summary: sMU});
});

sMU  = "<hr>"+sLocation+"<p class='text-center'>"+sMU+"</p>";
sMU += sAttr;

chrome.storage.local.get("tool_tab_temp", function(fetchedData){
    sChromeStor_value = fetchedData["tool_tab_temp"];
    if(typeof sChromeStor_value !== typeof undefined){
        sMU += "<hr>" + sChromeStor_value;
    }
    chrome.storage.local.set({tool_tab_temp: sMU});
});

console.group("Missing ALT attributes");
    console.log( sMU );
console.groupEnd();