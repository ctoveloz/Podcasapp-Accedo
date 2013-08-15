/* Custom JS by Cristiano Veloz */        

var main = function () {
    var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'http%3A%2F%2Frss.cnn.com%2Fservices%2Fpodcasting%2Fac360%2Frss.xml'%20AND%20itemPath%3D%22%2F%2Fchannel%22&format=json&diagnostics=true&callback=?";

    $.ajax({
        type: 'GET',
        url: url,
        async: false,
        jsonpCallback: 'jsonCallback',
        contentType: "application/json",
        dataType: 'jsonp',
        success: function (json) {
            // titulos
            var titles = json.query.results.channel.item.map(function (item) {
                return item.title;

            });

            // urls
            var urls = json.query.results.channel.item.map(function (item) {
                return item.origLink;

            });

            // First Video
            var firstVideo = json.query.results.channel.item[0].origLink;


            // description
            var firstDescription = json.query.results.channel.item[0].summary;
            var description = json.query.results.channel.item.map(function (item) {
                return item.summary;

            });


            // Call Ajax Key Enter
            $(document).on('keypress', function (e) {
                if (e.which == 13) {
                    $('.description-podcast p').html(description[$(".selected2").index()]);
                }
                e.preventDefault();
            });




            $(".podcast-title").html(json.query.results.channel.title);
            $(".podcast-description").html(json.query.results.channel.description);
            $(".container-list-podcast ul").append('<li>' + titles.join('</li><li>'));
            $(".container-list-podcast ul li").each(function (key, value) {
                var text = $(this).text();
                $(this).html('<a class="link-podcast" href="' + urls[key] + '">' + text + '</a>');
            });

            $(".video").attr("src", function () {
                return (firstVideo);
            });

            $(".description-podcast p").html( firstDescription );


            // Load KeyNavigation Video
            a = $('.nav_holder li a').keynav(function () {
                return window.keyNavigationDisabled;
            });

            //Load KeyNavigation Description
            a = $('.nav_holder li').keynavv(function () {
                return window.keyNavigationDisabled;
            });


        },
        error: function (e) {
            console.log(e.message);
        }
    });

}(jQuery);

// Call Ajax Click
$('.container-list-podcast').on('click', '.link-podcast', function (e) {
    e.preventDefault();
    $('.video').attr('src', this.href);
});

// Call Ajax Enter Key
$(document).on('keypress', function (e) {

    if (e.which == 13) {
        $('.video').attr('src', $('.container-list-podcast .selected').prop('href'));
    }
    e.preventDefault();
});