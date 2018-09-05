(function (window ,  $) {

  var ost = ns('ost');
  ost.carousel = window.ost.carousel || {};

  ost.carousel.events = oThis = {

    init : function (data) {

      oThis.data = data;
      oThis.eventCarousel = Handlebars.compile($("#event-carousel").text());
      oThis.jWrapper = $('#events-carousel-wrapper');

      oThis.createCarousel();
      oThis.initCarousel();
    },

    createCarousel: function(){
      var jMarkup;
      oThis.jWrapper.empty();
      for(var i = 0 ;  i < oThis.data.length ; i ++ ) {
        jMarkup += oThis.eventCarousel( oThis.data[i] );
      }
      oThis.jWrapper.append(jMarkup);
    },

    initCarousel: function() {
      oThis.jWrapper.slick({
        dots: false,
        infinite: false,
        speed: 600,
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
    }

  };

})(window ,  jQuery);