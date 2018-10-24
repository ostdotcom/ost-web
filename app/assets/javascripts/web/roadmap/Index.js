;
(function (window) {

  var roadMapNs = ns("ost.roadMap"),
    oThis;

  roadMapNs.index = oThis = {

    init: function (config) {
      oThis.bindButtonActions();
      oThis.fixedHeader();
      oThis.quarterScroll();
      oThis.categoriesToAnimate();
      oThis.highlightQuarter();
    },

    bindButtonActions: function () {

      $(".smooth-scroll").on('click', function (event) {
        if (this.hash !== "") {
          event.preventDefault();
          var hash = this.hash;
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800);
        }
      });

    },

    quarterScroll: function(){
      var item = $('.quarter-item a');
      item.on('click', function(event){
        event.preventDefault();
        $('.time-line').removeClass('selected');
        item.removeClass('selected-item');
        $(this).addClass('selected-item').closest('.time-line').addClass('selected');
      });
    },

    fixedHeader: function() {
      var stickyHeaderTop    = $('.quarters-container').offset().top ,
          stickyHeaderHeight = $('.quarters-container').height()
      ;
      $(window).on( "scroll resize" , function(){
        var scrollTop = $(window).scrollTop();
        if( scrollTop >  stickyHeaderTop  ) {
          $('.quarters-container').css({position: 'fixed', top: '0px'});
          $('#stickyalias').css({ height: stickyHeaderHeight + 'px' });
        } else {
          $('.quarters-container').css({position: 'static', top: '0px'});
          $('#stickyalias').css({  height: 0 });
        }
      });
    },

    categoriesToAnimate : function () {
      var categoriesToAnimateWrapper      = $('.categoriesToAnimateWrapper') ,
          categoriesToAnimatePhantom      = $('.categoriesToAnimatePhantom') ,
          stickyHeader                    = $('.quarters-container'),
          stickyHeaderHeight              = stickyHeader.height() ,
          categoriesToAnimateEls          = $('.categoriesToAnimate') ,
          categoriesToAnimateWrapperHeight= categoriesToAnimateWrapper.height()
      ;
      $(window).on("scroll resize" , function(){
        var scrollTop                       = $(window).scrollTop(),
            categoriesToAnimateWrapperTop   = categoriesToAnimateWrapper.offset().top ,
            stickyHeaderTop                 = stickyHeader.offset().top,
            stickyHeaderBottom              = stickyHeaderTop + stickyHeaderHeight ,
            animateDiff                     = scrollTop + stickyHeaderHeight ,
            distance
        ;
        console.log("stickyHeaderHeight" , stickyHeaderHeight );
        console.log("categoriesToAnimateElHeight" , categoriesToAnimateWrapperHeight );
        console.log("scrollTop" , scrollTop );
        console.log("categoriesToAnimateWrapperTop" , categoriesToAnimateWrapperTop );
        console.log("stickyHeaderTop" , stickyHeaderTop );
        console.log("stickyHeaderBottom" , stickyHeaderBottom );
        console.log("stickyHeaderBottom" , animateDiff );
        if( categoriesToAnimateWrapperHeight < animateDiff   ){

        }else {
          
        }
      });
    },


    highlightQuarter : function () {
      var animationTimerOut ,
          isVisible = false , id
      ;
      $(window).on("scroll resize" , function(){
        var jEls =  $('.qElementsToAnimate') ;
        clearTimeout( animationTimerOut );
        animationTimerOut = setTimeout( function () {
          console.log("Outsideforloop");
          for( var cnt = 0 ;  cnt < jEls.length ;  cnt++ ){
            console.log("In for loop");
            isVisible =  jEls.eq( cnt ).visible();
            if( isVisible ){
              id =  jEls.eq( cnt ).attr('id');
              $('.quarter-item a').removeClass('selected-item');
              $('.time-line').removeClass('selected');
              $("[data-id='" + id + "']").find('.smooth-scroll').addClass('selected-item').closest('.time-line').addClass('selected');
              break ;
            }
          }
        } ,  50 )
      });
    }
  };

  $(document).ready(function () {
    oThis.init();
    enterView({
      selector: '.q-elements',
      enter: function(el) {
        el.classList.add('qElementsToAnimate');
      },
      offset: 0.10
    });
  });

})(window);