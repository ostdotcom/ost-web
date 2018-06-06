(function(window, $){

   var responsiveHelper = ns('ost.responsiveBreakPoint') ;

   var  winner = ns('ost.winner'),
        videoData , videoMarkup,
        videoCountLg    = 9,
        videoCountSm    = 6,
        startVideoIndex = 0
   ;
   
   var jPocVideoWrapper = $("#poc_video_wrapper") ,
       jLoadMoreWrapper = $(".load-more-wrapper") ,
       jLoadMoreBtn     = $(".load-more")
   ;
   

    winner.poc_videos = {
        init: function(data){
            videoMarkup = Handlebars.compile($("#poc_videos").html());
            videoData = data;
            initVideoSection();
            initLoadAction();
        }
    };


    function initVideoSection( ){
        createMarkUp( getVideoLoadCount());
    }

    function createMarkUp( videoLoadCnt   ){
         var maxLoadCount = startVideoIndex + videoLoadCnt ,
             markUp , cnt
         ;
       
        for ( cnt = startVideoIndex; cnt < maxLoadCount; cnt++) {
            if ( cnt >=  videoData.length  ) break;
            markUp = videoMarkup( videoData[cnt] );
            jPocVideoWrapper.append(markUp);
        }
        startVideoIndex = cnt;
        if ( startVideoIndex >= videoData.length ){
            jLoadMoreWrapper.hide();
        }
    }

    function initLoadAction(){
        jLoadMoreBtn.on('click', function( ){
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