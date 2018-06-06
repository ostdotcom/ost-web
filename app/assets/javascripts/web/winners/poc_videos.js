(function(window, $){

   var responsiveHelper = ns('ost.responsiveBreakPoint') ;

   var  winner = ns('ost.winner'),
        videoData , videoElement,
        videoCountLg    = 2,
        videoCountSm    = 1,
        startVideoIndex = 0
   ;

    winner.poc_videos = {
        init: function(data){
            videoElement = Handlebars.compile($("#poc_videos").html());
            videoData = data;
            initVideoSection();
            initLoadAction();
        }
    };


    function initVideoSection( ){
        createMarkUp( getVideoLoadCount());
    }

    function createMarkUp( videoLoadCnt   ){
         var videoWrapper = $("#poc_video_wrapper"),
             maxLoadCount = startVideoIndex + videoLoadCnt ,
             markUp , cnt
         ;
        if ( startVideoIndex === 0 ){
          videoWrapper.empty();
        }
        for ( cnt = startVideoIndex; cnt < maxLoadCount; cnt++){
            markUp = videoElement(videoData[cnt]);
            videoWrapper.append(markUp);
        }
        startVideoIndex = cnt;
        if ( startVideoIndex >= videoData.length ){
            $(".load-more-wrapper").hide();
        }
    }

    function initLoadAction(){
        $(".load-more").on('click', function( ){
            createMarkUp(  getVideoLoadCount() );
        });
    }

    function getVideoLoadCount () {
      var breakPoint = responsiveHelper.getWindowWidth(),
          minWidth   = responsiveHelper.getBreakPointMinWidth( 'md' );
      ;
      if( breakPoint >=  minWidth ){
          return videoCountLg;
      }else {
        return videoCountSm;
      }
    }

})(window, jQuery);