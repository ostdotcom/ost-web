(function (window ,  $) {

    var winners = ns('ost.winner');
    winners.newsCarousel = {};

    winners.newsCarousel = {

        init : function (data) {
            createCarousel(data);
            initCarousel();
        }

    };

    function createCarousel(data) {
        var oneElCarousel = Handlebars.compile($("#one-el-carousel").html()),
            jWrapper = $('#home-carousel-wrapper'),
            jMarkup
        ;
        jWrapper.empty();

        for(var i = 0 ;  i < data.length ; i ++ ) {
            console.log(i);
            console.log(data[i]);
            jMarkup = oneElCarousel(data[i]);
            jWrapper.append(jMarkup);

        }
        console.log(jWrapper);
    }

    function initCarousel() {
        $('#home-carousel-wrapper').slick({
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 3,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    };

})(window ,  jQuery);