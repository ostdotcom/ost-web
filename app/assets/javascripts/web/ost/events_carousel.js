(function (window ,  $) {

  var ost = ns('ost');
  ost.carousel = window.ost.carousel || {};

  ost.carousel.events = oThis = {

    initCarousel: function() {
      var jWrapper = $('#events-carousel-wrapper');
      jWrapper
        .slick({
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
      })
        .removeClass('d-none');
    }

  };

})(window ,  jQuery);