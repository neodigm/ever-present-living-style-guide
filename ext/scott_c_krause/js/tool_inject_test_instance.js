var cookie_name ="", cookie_value="";
chrome.storage.local.get("cookie_name" , function(fetchedData){
    cookie_name = fetchedData["cookie_name"];
	chrome.storage.local.get("cookie_value" , function(fetchedData){
	    cookie_value = fetchedData["cookie_value"];
		var aNames = new Array();
		var aValues = new Array();
		aNames = cookie_name.split("|");
		aValues = cookie_value.split("|");
		for (c in aNames){
			document.cookie = encodeURIComponent( aNames[c] ) + "=" + encodeURIComponent( aValues[c] ) + "" + "; path=/";
		}
		//document.cookie = encodeURIComponent( cookie_name ) + "=" + encodeURIComponent( cookie_value ) + "" + "; path=/";
		window.location.reload();
	});
});