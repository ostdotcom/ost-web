;
(function (window) {

  var stickyheaderNs = ns("ost.stickyheader"),
    oThis;

  stickyheaderNs.index = oThis = {

    init: function (config) {
        oThis.bindButtonActions();
    },

    bindButtonActions: function () {
      var ostNavHeight = $('.ost-nav').height(),
          navHeight    = $('.container-about-nav').height()
        ;

      oThis.stickyNav();

      var scrollLink = $('.scroll');
      // Smooth scrolling
      scrollLink.on('click', function(e) {
        e.preventDefault();
        if (this.hash !== "") {
          var hash = this.hash;
          $('html, body').animate({
            scrollTop: $(hash).offset().top - ostNavHeight
          }, 800);
        }
      });

      $(window).scroll(function() {
        var windowScroll = $(this).scrollTop();
        console.log("===============start===============");
        scrollLink.each(function() {
          var sectionOffset = $(this.hash).offset().top - ostNavHeight ;
          console.log("sectionOffset" , sectionOffset  );
            console.log("windowScroll" , windowScroll  );

            if ( sectionOffset <= windowScroll ) {
                $('.container-about-nav').find('.nav-item').removeClass('active');
                $(this).parent().addClass('active');
                $(this).parent().siblings().removeClass('active');
           }
        })
          console.log("==============end===============");
      })

    },



    stickyNav: function(){
      var ostNavHeight      = $('.ost-nav').height() ,
          navContainer      = $('.container-about-nav') ,
          navPhantom        = $('.container-about-nav-phantom'),
          navOffset         = navContainer.offset().top ,
          aboutNavHeight    = navContainer.height()
      ;
      $(window).scroll(function(){
        var scrollPos = $(window).scrollTop();
        if(scrollPos > navOffset){
            navPhantom.height( aboutNavHeight  );
            navContainer.css({position: 'fixed', top: ostNavHeight - 2 , zIndex: 2,left: '0px', width: '100%'});
        } else{
            navPhantom.height( 0 );
            navContainer.css({position: 'static'});
        };
      });
    }

  };

  $(document).ready(function () {
    oThis.init({i18n: {}});
    $(window).resize(function(){
      var navContainer =  $('.container-about-nav');
      $('.nav-placeholder').height(navContainer.outerHeight());
    });
  });


})(window);