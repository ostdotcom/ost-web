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
        var jVideoIframeWrap = elem.find('.video-iframe'),
            dataSrc = jVideoIframeWrap.data('src')
          ;
        elem.find('.video-image').attr( "hidden", '' );
        jVideoIframeWrap.removeAttr( "hidden");
        jVideoIframeWrap.html('<iframe class="embed-responsive-item" src=" ' + dataSrc +
          '"frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
      },

      stopAllVideos: function(){
        var elem = $('.side-by-side');
        elem.find('.video-image').removeAttr( "hidden");
        elem.find('.video-iframe').attr( "hidden", '' );
        elem.find('.video-iframe').html("");
      },

      participantsCarousel: function(){
        $(".participants-carousel").slick({
          slidesToShow: 2,
          slidesToScroll: 1,
          speed: 500,
          variableWidth: true,
          infinite: false,
          dots: false,
          responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                variableWidth: false
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                variableWidth: false
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