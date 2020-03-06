// Declarations

let url = window.location.href.split('/');
let lastSegment = url.pop() || url.pop();

let json = $.getJSON("http://photogallery/api/PZvv8Mqae8jFuUa4/" + lastSegment).done(function() {
    json = json.responseJSON;
    //console.log(json);
});

let i = 1;

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

$('body').keyup(function(e){
    if(e.which == 27){
        redirectHomePage();
    }

    if(e.which == 73){
        showHideDescription();
    }
});

$("#arrow-left").click(function () {
    previousPicture();
})

$("#arrow-right").click(function () {
    nextPicture();
})

$("#cross").click(function () {
    redirectHomePage();
})

$("#info").click(function () {
    showHideDescription();
})

$("body").on("swipeleft", function() {
    alert("Swipe Left");
});

$("body").on("swiperight", function() {
    alert("Swipe right");
});


// Methods
function redirectHomePage() {
    window.location.replace("/");
}


function previousPicture() {
    if(i - 1 <= 0) {
        i = json.length-1;
		let url = json[i].url + json[i].fileName;
        changePicture(url)
        changeDescription(json[i]);
    }
    else {		
		let url = json[--i%json.length].url + json[i].fileName;
        changePicture(url);
        changeDescription(json[i%json.length]);
    }
}

function nextPicture() {
	let url = json[++i%json.length].url + json[i].fileName;
    changePicture(url);
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

function showHideDescription() {
    if($("#description").is(':visible')) {
        hideDescription();
    } else if($("#description").is(':hidden')) {
        showDescription();
    }
}

function hideDescription() {
    $("#description").hide();
}

function showDescription() {
    $("#description").show();
}