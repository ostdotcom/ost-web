;
(function (window) {

  var stickyheaderNs = ns("ost.stickyheader"),
    oThis;

  stickyheaderNs.index = oThis = {
      ostNav                : null,
      navContainer          : null,
      ostNavHeight          : null,
      navContainerHeight    : null,
      scrollLink            : null,

    init: function (config) {
        oThis.ostNav                = $('.ost-nav') ;
        oThis.navContainer          = $('.container-about-nav') ;
        oThis.ostNavHeight          = oThis.ostNav.height();
        oThis.navContainerHeight    = oThis.navContainer.height();
        oThis.scrollLink            = $('.scroll');
        oThis.bindButtonActions();
    },

    bindButtonActions: function () {
      oThis.stickyNav();
      oThis.smoothScroll();
      oThis.navContainerActiveUpdate();
    },

    smoothScroll : function(){
        oThis.scrollLink.on('click', function(e) {
            e.preventDefault();
            if (this.hash !== "") {
                var hash = this.hash;
                $('html, body').animate({
                    scrollTop: $(hash).offset().top - oThis.ostNavHeight
                }, 800);
            }
        });
    } ,

    navContainerActiveUpdate: function(){
        $(window).scroll(function() {
            var windowScroll = $(this).scrollTop() ,
                sectionOffset
            ;
            oThis.scrollLink.each(function() {
                sectionOffset =  Math.floor( $(this.hash).offset().top - oThis.ostNavHeight );
                if ( sectionOffset <= windowScroll ) {
                    $(this).parent().addClass('active');
                    $(this).parent().siblings().removeClass('active');
                }
            });
        })
    } ,


    stickyNav: function(){
      var navPhantom        = $('.container-about-nav-phantom'),
          navOffset         = oThis.navContainer.offset().top,
          teamJumbo         = $('.abouthead').outerHeight();
      $(window).on('scroll resize', function(){
        var scrollPos = $(window).scrollTop();
        if(scrollPos > teamJumbo){
            navPhantom.height( oThis.navContainerHeight  );
            oThis.navContainer.css({position: 'fixed', top: oThis.ostNavHeight - 3 , zIndex: 2,left: '0px', width: '100%'});
        } else{
            navPhantom.height( 0 );
            oThis.navContainer.css({position: 'static'});
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