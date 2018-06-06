(function(window, $){
    winner = ns('winner');
    winner.carousel = {};
    winner.carousel = {
        init: function(data){
            initHandleBarHelper();
            createVideoSection(data);
            console.log('cool');
        }
    }

    function createVideoSection(data){
        var videoElement = Handlebars.compile($("#poc_videos").html()),
            videoWrapper = $("#poc_video_wrapper"),
            markUp;
        videoWrapper.empty();

        for (i=0; i< data.length; i++){
            markUp = videoElement(data[i]);
            videoWrapper.append(markUp);

        }

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