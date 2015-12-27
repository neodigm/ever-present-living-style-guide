var oAudContx = new AudioContext(); // HTML5 Audio
//
var oTabContent;

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
};

function aJTab( sPanel ){
	//    Create or reuse a tab and make its location that had from an href

	localStorage.setItem("eplsg-template--article", sPanel);

	if( oTabContent === undefined ){
		chrome.tabs.create({url: "Scott_C_Krause/ever_present_living_style_guide.html"}, function(tab) {
			oTabContent = tab;
			//chrome.tabs.executeScript(oTabContent.id, { code: 'document.body.style.backgroundColor="red"' });
		 });	
	}else{
		chrome.tabs.update(oTabContent.Id, {url: "Scott_C_Krause/ever_present_living_style_guide.html"}, function(tab) {
			//chrome.tabs.executeScript(oTabContent.id, { code: 'document.body.style.backgroundColor="red"' });


		});
	}
}
//"document.getElementsByClassName('eplsg-template--article').innerHTML = " + "'JSON.stringify(data)'"
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


