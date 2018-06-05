(function(window, $){
    ost = ns('ost');
    ost.carousel = {};
    ost.carousel.home = {
        init: function(data){
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
})(window, jQuery);