;
(function (window) {

    var partnersUpdates = ns("simpletoken.partnersUpdates"),
        oThis;

    partnersUpdates.index = oThis = {

        init: function (config) {
            oThis.bindButtonActions();
            oThis.loadVideos();
        },

        bindButtonActions: function () {

        },

        loadVideos: function(){
            $.ajax({
                url: "https://s3.amazonaws.com/wa.simpletoken.org/assets/videos/partnersmediumarticles.jsonp",
                dataType: "jsonp"
            });
            // this calls simpletoken.videos.index.videos with data
        },

        updates: function(posts){

            var $template = $('#partners-update-carousel-item').text();
            var $container = $('.partners-updates-carousel');
            var html = '';

            posts.forEach(function(post){
                var item_html = $template;
                item_html = item_html.replace(new RegExp('__link__', 'g'), post.link);
                item_html = item_html.replace(new RegExp('__title__', 'g'), post.title);
                item_html = item_html.replace(new RegExp('__image__', 'g'), post.image);
                html += item_html;
            });
            $container.html(html);

            $('.partners-updates-carousel').slick({
                dots: false,
                infinite: false,
                speed: 300,
                slidesToShow: 3,
                slidesToScroll: 3,
                responsive: [
                    {
                        breakpoint: 769,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    }
                ]
            });

            $('.partners-updates-carousel')
              .removeClass("with-placeholder")
              .css('opacity', 1)
            ;

            setTimeout(function () {
              $container.find("img").each(function () {
                var jImg = $( this )
                  ,dataSrc = jImg.data("thumbSrc")
                  ;
                console.log("dataSrc", dataSrc );
                if ( dataSrc && dataSrc.length ) {
                  jImg.prop("src", dataSrc);
                }
              });
            }, 0);

        }

    };

    $(document).ready(function () {
        oThis.init({i18n: {}});
    });

})(window);