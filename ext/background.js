var oAudContx = new AudioContext();    //    HTML5 Audio
var oTabContent;    //    Chrome Tab

var oAJAXReq = new XMLHttpRequest();    //    Get Sounds
var aAudioBuffer = new Array(10);    //    Store Sound files
var fetchSoundConfig = {sound_max: 18, sound_current: 1};    //    Sound limits

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
            clearChromeStorage();
            chrome.tabs.getSelected(null, function(tab){
              chrome.tabs.update(tab.id, {url: "http://www.lakeside.com/browse/?Ntt=cats&_requestid=1609373"});
                sleep(2800);
                chrome.tabs.executeScript({file: "Scott_C_Krause/js/tool_missing_alt_tags.js"});
                sleep(800);
                audioSuccessSound();  //postToolAction();
                chrome.tabs.getSelected(null, function(tab){
                  chrome.tabs.update(tab.id, {url: "http://www.lakeside.com/browse/Garden-Outdoor-DIY/_/N-276x"});
                    sleep(2800);
                    chrome.tabs.executeScript({file: "Scott_C_Krause/js/tool_missing_alt_tags.js"});
                    sleep(800);
                    audioSuccessSound();  //postToolAction();  
                    chrome.tabs.getSelected(null, function(tab){
                      chrome.tabs.update(tab.id, {url: "http://www.lakeside.com/browse/Home-Decor/_/N-275b"});
                        sleep(2800);
                        chrome.tabs.executeScript({file: "Scott_C_Krause/js/tool_missing_alt_tags.js"});
                        sleep(800);
                        audioSuccessSound();  //postToolAction();
                        chrome.tabs.getSelected(null, function(tab){
                          chrome.tabs.update(tab.id, {url: "http://www.lakeside.com/"});
                            sleep(2800);
                            chrome.tabs.executeScript({file: "Scott_C_Krause/js/tool_missing_alt_tags.js"});
                            sleep(800);
                            audioSuccessSound();  //postToolAction();

    aJTab( localStorage.getItem("repo_name") + "/" + "tab-report.html");
                        });
                    });                 
                });
            });

            break;
        case "cmdInjectPrimeBanner":
            //
            chrome.tabs.executeScript({file: "Scott_C_Krause/js/tool_inject_prime_banner.js"});
            break;
        case "cmdInjectPhotoCust":
            //
            chrome.tabs.executeScript({file: "Scott_C_Krause/js/tool_inject_photo_cust.js"});
            break;
        case "cmdTabReport":
            //
            chrome.tabs.executeScript({file: "Scott_C_Krause/js/tab-report.js"});            
            break;
    } 
    //
    setTimeout( function(){
        postToolAction();
    }, 1840);
}

function clearChromeStorage(){
    //    Clear All Chrome Storage
    chrome.storage.local.clear(function() {
        var error = chrome.runtime.lastError;
        if (error) {
        console.error(error);
        }
    });
}

function sleep(ms) {
  var start = new Date().getTime(), expire = start + ms;
  while (new Date().getTime() < expire) { }
  return;
}

function displayMsg( sMsg ){
    //    System Tray Notification
    console.log( sMsg );
    if (!("Notification" in window)) {
        console.log('Notification API not supported.');
        return;
    } else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        audioSuccessSound();
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
    //    Timestamp and append to existing loc str then
    //    return entire persisted value

    console.clear();
    console.groupCollapsed("appendMyClipboard IN");
        console.log( sClip );
    console.groupEnd();

    var sPre = "<br>---- " + Nowish() + " ----<br>";
    var sPost = "";
    if( localStorage.getItem("MyClipboard") !== null ){
        sPost = localStorage.getItem("MyClipboard");
        if(sPost.indexOf( sPre ) >= 0){
            sPost = "";
        }
    }

    sClip = sPre + sClip +  "<hr>" + sPost;
    localStorage.removeItem("MyClipboard");
    localStorage.setItem("MyClipboard", sClip);
    return localStorage.getItem("MyClipboard");
}

function Nowish(){
    //    A readable Client-side time/date stamp
    var dNow = new Date();
    return dNow.toString().substr(0, dNow.toString().length - 33);
}

function postToolAction(){
    //    Delay execute after Tool has been actuated
    //    System tray notification of summary
    //    I think the summary needs to be text not markup !?
    //    Should use | delim in case we want to create a list type of notf in the future.

    chrome.storage.local.get("tool_tab_summary", function(fetchedData){
        NotfChromeStor_value = fetchedData["tool_tab_summary"];
        displayMsg( NotfChromeStor_value );
    });
}

function addBreaks(s,c) {
    var l = s.length;
    var i = 0;
    while (l > c) {
        l = l-c;
        i=i+c;
        s = s.substring(0,c)+"\n"+s.substring(c);
    }
    return s;
}