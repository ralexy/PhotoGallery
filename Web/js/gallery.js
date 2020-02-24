// Declarations

let json = $.getJSON("http://photogallery/api/").done(function() {
    json = json.responseJSON;
    console.log(json);
});

let i = 0;

// Listeners
$("body").keydown(function (e) {
    // Left
    if(e.keyCode == 37) {
        previousPicture();
    }

    // Right
    else if(e.keyCode == 39) {
        nextPicture();
    }
});

$("#arrow-left").click(function () {
    previousPicture();
})

$("#arrow-right").click(function () {
    nextPicture();
})

// Methods
function previousPicture() {
    if(i - 1 <= 0) {
        i = json.length-1;
        changePicture(json[i].URL)
    }
    else {
        changePicture(json[--i%json.length].URL);
    }
}

function nextPicture() {
    changePicture(json[++i%json.length].URL);
}

function changePicture(url) {
    $("article").css('background-image', 'url('+ url+ ')');
}