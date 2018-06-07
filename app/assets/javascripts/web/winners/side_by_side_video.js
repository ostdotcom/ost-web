;
(function (window) {

  var winnersNs = ns("ost.winners"),
    oThis;

  winnersNs.videos = oThis = {


      init: function () {
        oThis.participantsCarousel();
        oThis.bindButtonActions();
      },

      bindButtonActions: function () {
        $('.play-video').click(function(){
          oThis.playVideo($(this));
        })

      },

      playVideo: function(elem){
        oThis.stopAllVideos();
        var dataSrc = elem.find('.video-iframe iframe').data('src');
        elem.find('.video-image').attr( "hidden", '' );
        elem.find('.video-iframe').removeAttr( "hidden");
        elem.find('.video-iframe iframe').attr('src', dataSrc);
      },

      stopAllVideos: function(){
        //ost.winners.videos.stopAllVideos();

        var elem = $('.side-by-side');
        elem.find('.video-image').removeAttr( "hidden");
        elem.find('.video-iframe').attr( "hidden", '' );
        elem.find('.video-iframe iframe').removeAttr('src');
      },

      participantsCarousel: function(){
        $(".participants-carousel").slick({
          slidesToShow: 3,
          slidesToScroll: 3,
          speed: 500,
          variableWidth: true,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true
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

  $(document).ready(function () {
      oThis.init();
  });

})(window);