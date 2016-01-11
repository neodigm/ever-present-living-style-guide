var nImg = 0
$('img').each(function() {
    if ( $(this).attr('alt') ){
        console.log( $( this ).attr("src") );
        console.log( $( this ).attr("alt") );
        $( this ).css("-webkit-filter", "grayscale(.8) opacity(.08)");
        $( this ).css("filter", "grayscale(1) opacity(.08)");
        nImg++;
    }
});
console.log("Images without Alt tages: "+nImg);
chrome.storage.local.set({myclipboard_temp: nImg});