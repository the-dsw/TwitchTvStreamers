$(function() {
    var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

    channels.forEach(function(channel) {
        function setURL(type, name) {
        return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?';
        };
        $.getJSON(setURL("streams", channel), function(json) {
        var game,
            status;
        if (json.stream === null) {
            game = "Offline";
            status = "offline";
        } else if (json.stream === undefined) {
            game = "Account Closed";
            status = "offline";
        } else {
            game = json.stream.game;
            status = "online";
        };
        $.getJSON(setURL("channels", channel), function(json) {
            var logo = json.logo != null ? json.logo : "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F",
            name = json.display_name != null ? json.display_name : channel,
            description = status === "online" ? ': ' + json.status : "";
            html = '<div class="row ' + 
            status + '"><div class="col-xs-2 col-sm-1" id="icon"><img src="' + 
            logo + '" class="logo"></div><div class="col-xs-10 col-sm-3" id="name"><a href="' + 
            json.url + '" target="_blank">' + 
            name + '</a></div><div class="col-xs-10 col-sm-8" id="streaming">'+ 
            game + '<span class="hidden-xs">' + 
            description + '</span></div></div>';
            status === "online" ? $("#display").prepend(html) : $("#display").append(html);
        });
        });
    });

    $(".selector").click(function() {
        $(".selector").removeClass("active");
        $(this).addClass("active");

        var status = $(this).attr('id');
        if (status === "all") {
            $(".online, .offline").removeClass("hidden");
        } else if (status === "online") {
            $(".online").removeClass("hidden");
            $(".offline").addClass("hidden");
        } else {
            $(".offline").removeClass("hidden");
            $(".online").addClass("hidden");
        }
    })
});

