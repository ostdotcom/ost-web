(function(window){
  var partnersUseCases = ns("ost.partnersUseCases"),
    oThis;

  partnersUseCases.index = oThis = {
    init : function(){
      oThis.bindButtonActions();
      oThis.initCarousel();

    },
    bindButtonActions: function(){
      $('.play-video').click(function(){
        oThis.playVideo($(this));
      });

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

    initCarousel: function () {
      $(".use-case-wrap").slick();
    },

    stopAllVideos: function(){
      var elem = $('.use_cases');
      elem.find('.video-image').removeAttr( "hidden");
      elem.find('.video-iframe').attr( "hidden", '' );
      elem.find('.video-iframe').html("");
    },


  }

})(window);