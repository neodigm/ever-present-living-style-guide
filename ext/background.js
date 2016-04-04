/*
<!--

 @@@@@@    @@@@@@@   @@@@@@   @@@@@@@  @@@@@@@
@@@@@@@   @@@@@@@@  @@@@@@@@  @@@@@@@  @@@@@@@
!@@       !@@       @@!  @@@    @@!      @@!
!@!       !@!       !@!  @!@    !@!      !@!
!!@@!!    !@!       @!@  !@!    @!!      @!!
 !!@!!!   !!!       !@!  !!!    !!!      !!!
     !:!  :!!       !!:  !!!    !!:      !!:
    !:!   :!:       :!:  !:!    :!:      :!:
:::: ::    ::: :::  ::::: ::     ::       ::
:: : :     :: :: :   : :  :      :        :


@@@  @@@  @@@@@@@    @@@@@@   @@@  @@@   @@@@@@   @@@@@@@@
@@@  @@@  @@@@@@@@  @@@@@@@@  @@@  @@@  @@@@@@@   @@@@@@@@
@@!  !@@  @@!  @@@  @@!  @@@  @@!  @@@  !@@       @@!
!@!  @!!  !@!  @!@  !@!  @!@  !@!  @!@  !@!       !@!
@!@@!@!   @!@!!@!   @!@!@!@!  @!@  !@!  !!@@!!    @!!!:!
!!@!!!    !!@!@!    !!!@!!!!  !@!  !!!   !!@!!!   !!!!!:
!!: :!!   !!: :!!   !!:  !!!  !!:  !!!       !:!  !!:
:!:  !:!  :!:  !:!  :!:  !:!  :!:  !:!      !:!   :!:
 ::  :::  ::   :::  ::   :::  ::::: ::  :::: ::    :: ::::
 :   :::   :   : :   :   : :   : :  :   :: : :    : :: ::

-->
*/
var oAudContx = new AudioContext();    //    HTML5 Audio
var oTabContent;    //    Chrome Tab

var oAJAXReq = new XMLHttpRequest();    //    Get Sounds
var aAudioBuffer = new Array(10);    //    Store Sound files
var fetchSoundConfig = {sound_max: 18, sound_current: 1};    //    Sound limits

fetchSound();

function fetchSound(){
    //    AJAX a single sound binary
    oAJAXReq.open("GET", "scott_c_krause/au/s" + fetchSoundConfig.sound_current + ".mp3", true);
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
    //    Play MP3 if sound toggle is true
    if( localStorage.getItem("sound_switch") !== "false" ){
        var oSrc = oAudContx.createBufferSource();
        var volume = oAudContx.createGain();
        oSrc.buffer = aAudioBuffer[nSound];
        volume.gain.value = 0.0;
        oSrc.connect(volume);  
        volume.connect(oAudContx.destination);
        oSrc.connect(oAudContx.destination);
        volume.gain.value = 0.0;
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

function aJTab( sPanel, sData_all_tags ){
    //    Create or reuse a tab and make its location that had from an href
    localStorage.setItem("eplsg-template--article", sPanel);
    localStorage.setItem("eplsg-template--all_tags", sData_all_tags);

    if( oTabContent === undefined ){
        chrome.tabs.create({url: "scott_c_krause/ever_present_living_style_guide.html", index: 0}, function(tab) {
            oTabContent = tab;
         });    
    }else{
        chrome.tabs.update(oTabContent.Id, {url: "scott_c_krause/ever_present_living_style_guide.html"}, function(tab) {
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
        case "cmdMissingAltTagsLSC":
            //  ALT Audit Lakeside
            var aURL =  ["http://www.lakeside.com/browse/?Ntt=cats&_requestid=1609373",
            "http://www.lakeside.com/browse/Apparel-Beauty/_/N-26y3",
            "http://www.lakeside.com/browse/Garden-Outdoor-DIY/_/N-276x",
            "http://www.lakeside.com/browse/Home-Decor/_/N-275b",
            "http://www.lakeside.com/browse/Christmas-2015/_/N-1z0ziv5",
            "http://www.lakeside.com/catalog/catalog_quick_order.jsp",
            "http://www.lakeside.com/Garden--Outdoor---DIY/Home-Improvement/Household-Helpers/The-Redneck-Plunger-//prod1140079.jmp?fm=search",
            "http://www.lakeside.com/artist-studio",
            "http://www.lakeside.com/Ideas-and-Inspiration",
            "http://www.lakeside.com/catalog_request/index.jsp",            
            "https://www.lakeside.com/my_account/index.jsp",
            "http://www.lakeside.com/"];

            clearChromeStorage();
            chrome.tabs.getSelected(null, function(tab){
                for(var iCnt=0;iCnt < aURL.length;iCnt++){
                    chrome.tabs.update(tab.id, {url: aURL[iCnt]});
                    sleep(2800);
                    chrome.tabs.executeScript({file: "scott_c_krause/js/tool_missing_alt_tags.js"});
                    sleep(800);
                }
                aJTab( localStorage.getItem("repo_name") + "/" + "tab-report.html");                
            });

            break;
        case "cmdMissingAltTagsLTD":
            //  ALT Audit LTD
            var aURL =  ["http://www.ltdcommodities.com/browse/?Ntt=dog&_requestid=2456105",
            "http://www.ltdcommodities.com/browse/Home-Decor/_/N-2748",
            "http://www.ltdcommodities.com/browse/Toys-Electronics/_/N-27kp",
            "http://www.ltdcommodities.com/browse/Apparel-Beauty/_/N-26wo",
            "http://www.ltdcommodities.com/browse/What-s-New-2016/_/N-1z0xzba",
            "http://www.ltdcommodities.com/catalog/catalog_quick_order.jsp",
            "http://www.ltdcommodities.com/Garden--Outdoor---DIY/Home-Improvement/Household-Helpers/The-Redneck-Plunger-//prod1140079.jmp?fm=search",
            "http://www.ltdcommodities.com/designer-showcase",
            "http://www.ltdcommodities.com/World-of-Inspiration",
            "http://www.ltdcommodities.com/catalog_request/index.jsp",            
            "https://www.ltdcommodities.com/my_account/index.jsp",
            "http://www.ltdcommodities.com/homeltd"];

            clearChromeStorage();
            chrome.tabs.getSelected(null, function(tab){
                for(var iCnt=0;iCnt < aURL.length;iCnt++){
                    chrome.tabs.update(tab.id, {url: aURL[iCnt]});
                    sleep(2800);
                    chrome.tabs.executeScript({file: "scott_c_krause/js/tool_missing_alt_tags.js"});
                    sleep(800);
                }
                aJTab( localStorage.getItem("repo_name") + "/" + "tab-report.html");                
            });

            break;
        case "cmdMissingAltTagsLTDStage":
            //  ALT Audit LTD STAGE
            var aURL =  ["http://stage.ltdcommodities.com/value/?Ntt=dog&_requestid=11125",
            "http://stage.ltdcommodities.com/value/Home-Decor/_/N-276j",
            "http://stage.ltdcommodities.com/value/Toys-Electronics/_/N-27n0",
            "http://stage.ltdcommodities.com/value/Apparel-Beauty/_/N-26yz",
            "http://stage.ltdcommodities.com/value/SHOPNOW4084/_/N-1z11or9",
            "http://stage.ltdcommodities.com/catalog/catalog_quick_order.jsp",
            "http://stage.ltdcommodities.com/Garden--Outdoor---DIY/Home-Improvement/Household-Helpers/The-Redneck-Plunger-//prod1140079.jmp?fm=search",
            "http://stage.ltdcommodities.com/designer-showcase",
            "http://stage.ltdcommodities.com/World-of-Inspiration",
            "http://stage.ltdcommodities.com/catalog_request/index.jsp",            
            "https://stage.ltdcommodities.com/my_account/index.jsp",
            "http://stage.ltdcommodities.com/homeltd"];

            clearChromeStorage();
            chrome.tabs.getSelected(null, function(tab){
                for(var iCnt=0;iCnt < aURL.length;iCnt++){
                    chrome.tabs.update(tab.id, {url: aURL[iCnt]});
                    sleep(2800);
                    chrome.tabs.executeScript({file: "scott_c_krause/js/tool_missing_alt_tags.js"});
                    sleep(800);
                }
                aJTab( localStorage.getItem("repo_name") + "/" + "tab-report.html");                
            });

            break;
        case "cmdInjectPrimeBanner":
            //
            chrome.tabs.executeScript({file: "scott_c_krause/js/tool_inject_prime_banner.js"});
            break;
        case "cmdInjectPhotoCust":
            //
            chrome.tabs.executeScript({file: "scott_c_krause/js/tool_inject_photo_cust.js"});
            break;
        case "cmdTabReport":
            //
            chrome.tabs.executeScript({file: "scott_c_krause/js/tab-report.js"});            
            break;
        case "cmdTestInstance":
            //    Cookies
            var sURL = "http://www.LTDCommodities.com/"; // TODO | Really need to move to prop object
            var cookie_name =""
            chrome.storage.local.get("cookie_name" , function(fetchedData){
                cookie_name = fetchedData["cookie_name"];
                if( cookie_name.indexOf( "-lake-" ) > 0 ){
                    sURL = "http://www.Lakeside.com/"; // TODO | Really need to move to prop 
                }
                chrome.tabs.getSelected(null, function(tab){
                    chrome.tabs.update(tab.id, {url: sURL});
                    sleep(2800);
                    chrome.tabs.executeScript({file: "scott_c_krause/js/tool_inject_test_instance.js"});
                });                 
            });
            break;
        case "cmdImageAudit":
            //  Right now this is just the injected perf script
            chrome.tabs.executeScript({file: "scott_c_krause/js/tool_img_perf_audit.js"});            
            break;
        case "cmdResponsiveImages":
            //
            chrome.tabs.getSelected(null, function(tab){
                chrome.tabs.update(tab.id, {url: localStorage.getItem("repo_name") + "/" + "pattern_resp_images.html"});
                sleep(600);
alert("stuff and stuff");
                chrome.tabs.executeScript(tab.id, {file: "scott_c_krause/js/tool_resp_images.js"}, function(){
                    if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError.message);
                    }                    
                });
            });
            break;
    } 
    //
    setTimeout( function(){
        displayMsg( "Tab Tool Complete" );
    }, 1840);
}
/*
function navToThenExec(aURL, sScript){
    //    
    chrome.tabs.getSelected(null, function(tab){
        for(var iCnt=0;iCnt < aURL.length;iCnt++){
            chrome.tabs.update(tab.id, {url: aURL[iCnt]});
            sleep(3000);
            chrome.tabs.executeScript({file: sScript});
            sleep(600);
        }
    });
}
*/
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
    //  Synce Sleep
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

function Nowish(){
    //    A readable Client-side time/date stamp
    var dNow = new Date();
    return dNow.toString().substr(0, dNow.toString().length - 33);
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

function createCookie(name, value, days) {
    //    Lets also create a chrome store assoc array
    var expires;
    chrome.storage.local.set({cookie_name:  name});
    chrome.storage.local.set({cookie_value: value});
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}