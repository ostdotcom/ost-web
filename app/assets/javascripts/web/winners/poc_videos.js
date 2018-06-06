(function(window, $){
    winner = ns('winner');
    winner.carousel = {};
    winner.carousel = {
        init: function(data){
            videoData = data;
            initHandleBarHelper();
            createVideoSection();
            initLoadAction();

        }
    };
    videoCountLg = 3;
    videoCountSm = 3;
    endVideoIndex = 0;
    videoData = [];

    function createVideoSection(data){
        videoElement = Handlebars.compile($("#poc_videos").html());
        createMarkUp(0, videoCountLg);
    }

    function createMarkUp(startIndex, endIndex){

         var videoWrapper = $("#poc_video_wrapper"),
             markUp;
        if (startIndex == 0){
          videoWrapper.empty();
        }
        for (i=startIndex; i < endIndex; i++){
            markUp = videoElement(videoData[i]);
            videoWrapper.append(markUp);
        }
        endVideoIndex = endIndex;
        if (endVideoIndex >= videoData.length ){
            $(".load-more-wrapper").hide();
        }

    }

    function initLoadAction(){
        $(".load-more").click(function(e){
            createMarkUp(endVideoIndex, endVideoIndex+videoCountLg )
        });

    }

    function initHandleBarHelper(){
        Handlebars.registerHelper('ifImage', function(image, options ) {
            if(image){
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        });

        Handlebars.registerHelper('ifVideo', function(video, article_link ,  options ) {
            if( video && !article_link){
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        });
    }
})(window, jQuery);