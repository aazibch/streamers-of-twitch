/*jshint browser: true, devel: true, jquery: true*/
$(document).ready(function () {
    var usernames = ["esl_sc2", "ogamingsc2", "cretetion", "freecodecamp", "storbeck"];

    usernames.forEach(function (val) {
        $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + val + "?callback=?", function (data) {
            var channelImage,
                channelName,
                channelLink,
                game,
                status;

            console.log(data);

            if (data.stream !== null) {
                channelName = data.stream.channel.display_name;
                channelLink = data.stream.channel.url;
                game = data.stream.game;
                status = data.stream.channel.status;

                if (data.stream.channel.logo !== null) {
                    channelImage = data.stream.channel.logo;
                } else {
                    channelImage = "http://res.cloudinary.com/aazibch/image/upload/c_scale,h_100/v1506900796/avatar_gpgvtj.png";
                }

                $("#channel-data .container-fluid").prepend('<div class="row online"><div class="col-sm-2"><img class="channel-image" src="' + channelImage + '" alt="Profile Image"></div><div class="col-sm-3"><span class="channel"><a href="' + channelLink + '" target="_blank">' + channelName + '</a></span></div><div class="col-sm-7"><span class="status">' + game + '<span class="hidden-xs">: ' + status + '</span></span></div></div>');
            } else {
                $.getJSON("https://wind-bow.gomix.me/twitch-api/channels/" + val + "?callback=?", function (data) {
                    channelName = data.display_name;
                    channelLink = data.url;

                    if (data.logo !== null) {
                        channelImage = data.logo;
                    } else {
                        channelImage = "http://res.cloudinary.com/aazibch/image/upload/c_scale,h_100/v1506900796/avatar_gpgvtj.png";
                    }

                    $("#channel-data .container-fluid").append('<div class="row offline"><div class="col-sm-2"><img class="channel-image" src="' + channelImage + '" alt="Profile Image"></div><div class="col-sm-3"><span class="channel"><a href="' + channelLink + '" target="_blank">' + channelName + '</a></span></div><div class="col-sm-7"><span class="status status-offline">Offline</span></div></div>');
                });
            }
        });
    });

    $("#all-button").on("click", function () {
        $(".online, .offline").removeClass("hidden");
        $(this).addClass("selected");
        $("#online-button, #offline-button").removeClass("selected");
    });

    $("#online-button").on("click", function () {
        $(".offline").addClass("hidden");
        $(".online").removeClass("hidden");
        $(this).addClass("selected");
        $("#all-button, #offline-button").removeClass("selected");
    });

    $("#offline-button").on("click", function () {
        $(".online").addClass("hidden");
        $(".offline").removeClass("hidden");
        $(this).addClass("selected");
        $("#online-button, #all-button").removeClass("selected");
    });
});
