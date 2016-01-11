var oAudContx = new AudioContext();    //    HTML5 Audio
var oTabContent;    //    Chrome Tab

var oAJAXReq = new XMLHttpRequest();    //    Get Sounds
var aAudioBuffer = new Array(10);    //    Store Sound files
var fetchSoundConfig = {sound_max: 11, sound_current: 1};    //    Sound limits

fetchSound();

function fetchSound(){
	//    AJAX a single sound binary
	oAJAXReq.open("GET", "Scott_C_Krause/au/s" + fetchSoundConfig.sound_current + ".mp3", true);
	oAJAXReq.responseType = "arraybuffer";
    oAJAXReq.send();
    oAJAXReq.onload = fetchSoundonload;
}

function fetchSoundonload() {
	//    The audio file has loaded via AJAX
    oAudContx.decodeAudioData(oAJAXReq.response, function (decAudBuf) {
        aAudioBuffer[ fetchSoundConfig.sound_current ] = decAudBuf;
        fetchSoundConfig.sound_current = fetchSoundConfig.sound_current + 1;
        if(fetchSoundConfig.sound_current <= fetchSoundConfig.sound_max){
            oAJAXReq = new XMLHttpRequest();
            oAJAXReq.responseType = "arraybuffer";
            fetchSound( fetchSoundConfig.sound_current );
        }
    });
};

function playAudioFile( nSound ) {
	//    

    if( localStorage.getItem("sound_switch") !== "false" ){
        var oSrc = oAudContx.createBufferSource();
        var volume = oAudContx.createGain();

        //volume.gain.setValueAtTime(0.00, startTime + duration - 0.04);
        oSrc.buffer = aAudioBuffer[nSound];
        volume.gain.value = 0.16;
        oSrc.connect(volume);  
        volume.connect(oAudContx.destination);

        oSrc.connect(oAudContx.destination);

        volume.gain.value = 0.16;
        oSrc.start(oAudContx.currentTime);
    }    
};

function audioSuccessSound() {
	//
    playNote(493.883, oAudContx.currentTime,  0.12);
    playNote(659.255, oAudContx.currentTime + 0.12, 0.24);
};

function audioAlert() {
	//
    playNote(300, oAudContx.currentTime,  0.03);
    playNote(400, oAudContx.currentTime + 0.03, 0.06);
};

function audioBleep_1() {
	//
    playNote(800, oAudContx.currentTime + 0.0, 0.10);
};

function audioTick_1() {
	//
    playNote(100, oAudContx.currentTime,  0.60, 0.80);
    playNote(200, oAudContx.currentTime + 0.80, 0.10);
};

function playNote(frequency, startTime, duration) {
	//

    if( localStorage.getItem("sound_switch") !== "false" ){
        var osc = oAudContx.createOscillator(),
            osc2 = oAudContx.createOscillator(),
            volume = oAudContx.createGain();

        // Multiplies the incoming signal by 0.16
        volume.gain.value = 0.16;

        // Make sure the gain value is at 0.216, 0.04 seconds before the note stops.
        volume.gain.setValueAtTime(0.16, startTime + duration - 0.04);
        volume.gain.linearRampToValueAtTime(0, startTime + duration);

        osc.frequency.value = frequency;
        osc.type = 'triangle';

        osc2.frequency.value = frequency;
        osc2.type = 'triangle';

        osc.detune.value = -16;
        osc2.detune.value = 16;

        osc.connect(volume);
        volume.connect(oAudContx.destination);

        osc2.connect(volume);

        osc.start(startTime);
        osc.stop(startTime + duration);

        osc2.start(startTime);
        osc2.stop(startTime + duration);
    }
};

function aJTab( sPanel ){
	//    Create or reuse a tab and make its location that had from an href

	localStorage.setItem("eplsg-template--article", sPanel);

	if( oTabContent === undefined ){
		chrome.tabs.create({url: "Scott_C_Krause/ever_present_living_style_guide.html", index: 0}, function(tab) {
			oTabContent = tab;
		 });	
	}else{
		chrome.tabs.update(oTabContent.Id, {url: "Scott_C_Krause/ever_present_living_style_guide.html"}, function(tab) {
		});
	}
}

function runTool( sTool ){
    //    Inject CSS or JS into a tab

    switch ( sTool ) {
        case "cmdGrayScale":
            //
            chrome.tabs.insertCSS({code: "body {-webkit-filter: grayscale(1);}"});
            break;
        case "cmdMissingAltTags":
            //
            chrome.tabs.executeScript({file: "Scott_C_Krause/js/tool_missing_alt_tags.js"});
            break;
    }    
}

function displayMsg( sMsg ){
	//

	audioSuccessSound();
	console.log( sMsg );
	if (!("Notification" in window)) {
		alert('Notification API not supported.');
		return;
	} else if (Notification.permission === "granted") {
		// If it's okay let's create a notification
		var notification = new Notification( sMsg );
	} else if (Notification.permission !== 'denied') {
		// Otherwise, we need to ask the user for permission

		Notification.requestPermission(function (permission) {
			// If the user accepts, let's create a notification
			if (permission === "granted") {
				var notification = new Notification( sMsg );
			}
		});
	}
}

function appendMyClipboard( sClip ){
    //    timestamp and append to existing loc str then
    //    return entire persisted value

    var sPre = "\n<br>---- " + Nowish() + " ----<br>\n";
    var sPost = ""
    if( localStorage.getItem("MyClipboard") !== null ){
        sPost = localStorage.getItem("MyClipboard");
    }

    sClip = sPre + sClip +  sPost;

    localStorage.setItem("MyClipboard", sClip);
    return localStorage.getItem("MyClipboard");
}

function Nowish(){
    var dNow = new Date();
    return dNow.toString();
    //return (dNow.getMonth() + 1) + '/' + dNow.getDate() + '/' + dNow.getFullYear();
}
