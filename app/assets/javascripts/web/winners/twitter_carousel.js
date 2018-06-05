(function(window, $){
    var winners = ns('winners');
    winners.twitter = {};

    winners.twitter.carousel = {
        init: function(data){

            initCarousal();
            handleAchorTag();

        }
    }



    function initCarousal(){
        $('.twitter-carousel').slick({
            dots:false,
            slidesToShow: 5,
            slidesToScroll:5,
            centerMode: true,
//            speed:300,
            focusOnSelect: true,
            responsive:[
                {
                    breakpoint: 900,
                    settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
            ]
        });
        $('.twitter-carousel').on('afterChange', function(event, slick, ele){
            var currentSlide = $('.twitter-carousel').slick('slickCurrentSlide');
            var tweetText =    $(".slick-slide[data-slick-index='"+ currentSlide +"'] .carousel-item .hidden-desc").text();

            $(".twitter-desc").text(tweetText);

            $(".carousel-item .twitter-link").addClass("disabled");
            $(".slick-slide[data-slick-index='"+ currentSlide +"'] .carousel-item a").removeClass("disabled");

        });

        $(".twitter-carousel").on("breakpoint", function(){
          handleAchorTag();
        });


    }

    function handleAchorTag(){
        $("a.twitter-link").click(function(e){
           if ($(e.currentTarget).hasClass("disabled")){
             e.preventDefault();
           }
        });

    }




})(window, jQuery);