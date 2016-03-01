var cookie_name ="", cookie_value="";
chrome.storage.local.get("cookie_name" , function(fetchedData){
    cookie_name = fetchedData["cookie_name"];
	chrome.storage.local.get("cookie_value" , function(fetchedData){
	    cookie_value = fetchedData["cookie_value"];
		document.cookie = encodeURIComponent(  cookie_name ) + "=" + encodeURIComponent( cookie_value ) + "" + "; path=/";// prod5d
		window.location.reload();
	});
});