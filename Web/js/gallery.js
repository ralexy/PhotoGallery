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

$("body").on("swipeleft", function() {
    alert("Swipe Left");
});

$("body").on("swiperight", function() {
    alert("Swipe right");
});


// Methods
function previousPicture() {
    if(i - 1 <= 0) {
        i = json.length-1;
        changePicture(json[i].URL)
    }
    else {
        changePicture(json[--i%json.length].URL);
        changeDescription(json[i%json.length])
    }
}

function nextPicture() {
    changePicture(json[++i%json.length].URL);
    changeDescription(json[i%json.length])
}

function changePicture(url) {
    $("article").css('background-image', 'url('+ url+ ')');
    $("article").css('background-size', 'auto 100%');
}

function changeDescription(infos) {
    $("#title").text(infos.title);
    $("#artist").text(infos.artist);
    $("#year").text(infos.year);
}