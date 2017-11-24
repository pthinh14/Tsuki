// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
$(".playlist").click(function () {
    $(".side-menu").animate({ marginLeft: '0px' });
});

$(".side-menu li a, .side-menu .close").click(function () {
    $(".side-menu").animate({ marginLeft: '-400px' });
}); 

/*$(".pause-b").click(function (l) {
    if (media) { media.stop(); media.release(); }
}); */