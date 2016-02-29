var elemDiv = document.createElement('div');
elemDiv.style.cssText = 'position:absolute;width:100%;height:100%;opacity:0.3;z-index:100;background:#000;';
document.body.appendChild(elemDiv);

var cookie_name ="", cookie_value="";
chrome.storage.local.get("cookie_name" , function(fetchedData){
    cookie_name = fetchedData["cookie_name"];
	chrome.storage.local.get("cookie_value" , function(fetchedData){
	    cookie_value = fetchedData["cookie_value"];
		document.cookie = encodeURIComponent(  cookie_name ) + "=" + encodeURIComponent( cookie_value ) + "" + "; path=/";// prod5d
		window.location.reload();
	});
});

/*
<a data-dropdown="drop1" aria-controls="drop1" aria-expanded="true" class="button expand ">Test Instance</a>
<ul id="drop1" class="f-dropdown open f-open-dropdown" data-dropdown-content="" aria-hidden="false" tabindex="-1" style="position: absolute; left: 0px; top: 43px;">
  <li><a href="#">This is a link</a></li>
  <li><a href="#">This is another</a></li>
  <li><a href="#">Yet another</a></li>
</ul>
*/