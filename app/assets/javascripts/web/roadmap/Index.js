;
(function (window) {

  var roadMapNs = ns("ost.roadMap"),
    oThis;

  roadMapNs.index = oThis = {

    init: function (config) {
      oThis.bindButtonActions();
      oThis.fixedHeader();
      oThis.quarterScroll();
      oThis.highlightQuarter();
      oThis.dropDown();
      oThis.categoriesToAnimate();
    },

    bindButtonActions: function () {

      $(".smooth-scroll").on('click', function (event) {
        if (this.hash !== "") {
          event.preventDefault();
          var hash = this.hash;
          var offset= $(hash).offset().top;
          var offsetTop = $('.categoriesToAnimateMainContainer').height() + $('.quarters-container').height();
          offset -= offsetTop;
          $('html, body').animate({
            scrollTop:offset
          }, 800);
        }
      });

    },

    quarterScrollClick : false ,
    quarterScroll: function(){
      var item = $('.quarter-item a');
      item.on('click', function(event){
        setTimeout( function () {
          oThis.quarterScrollClick = false ;
        } , 1000 );
        oThis.quarterScrollClick =  true;
        event.preventDefault();
        $('.time-line').removeClass('selected');
        item.removeClass('selected-item');
        $(this).addClass('selected-item').closest('.time-line').addClass('selected');
      });
    },

    fixedHeader: function(){
      var stickyHeaderTop = $('.quarters-container').offset().top ,
          stickyHeaderHeight = $('.quarters-container').height()
      ;
      $(window).scroll(function(){
        animateFunc();
      });
      animateFunc();

      function animateFunc() {
        var stickyAliasHeight = $('#stickyalias').height(stickyHeaderHeight + 'px'),
             scrollTop = $(window).scrollTop()
        ;
        if( scrollTop > stickyHeaderTop ) {
          $('.quarters-container').css({position: 'fixed', top: '0px'});
          $('#stickyalias').css({display: 'block', height: stickyAliasHeight + 'px'});
        } else {
          $('.quarters-container').css({position: 'static', top: '0px'});
          $('#stickyalias').css({display: 'none', height: 0});
        }
      }

    },

    dropDown: function(){
      $('.dropdown-el').click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).toggleClass('expanded');
        $('#'+$(e.target).attr('for')).prop('checked',true);
        oThis.changeSection();
      });
      $(document).click(function() {
        $('.dropdown-el').removeClass('expanded');
      });

      oThis.changeSection();
    },

    changeSection: function () {
      var mobile_developer_tools = $('.mobile_developer_tools'),
        mobile_btx_exchange = $('.mobile_btx_exchange'),
        mobile_infrastructure = $('.mobile_infrastructure');

      if($('#infrastructure').prop('checked')){
        mobile_developer_tools.hide();
        mobile_btx_exchange.hide();
        mobile_infrastructure.show();
      }
      else if($('#developer-tools').prop('checked') ){
        mobile_infrastructure.hide();
        mobile_btx_exchange.hide();
        mobile_developer_tools.show();
      }
      else if( $('#btx-exchange').prop('checked')   ){
        mobile_infrastructure.hide();
        mobile_developer_tools.hide();
        mobile_btx_exchange.show();
      }
    },

    highlightQuarter : function () {
      var animationTimerOut,
        isVisible = false, id
      ;
      $(window).on("scroll resize", function () {
        if( oThis.quarterScrollClick  ) return ;
        var jEls = $('.qElementsToAnimate');
        clearTimeout(animationTimerOut);
        animationTimerOut = setTimeout(function () {
          for (var cnt = 0; cnt < jEls.length; cnt++) {
            isVisible = jEls.eq(cnt).visible();
            if (isVisible) {
              id = jEls.eq(cnt).attr('id');
              $('.quarter-item a').removeClass('selected-item');
              $('.time-line').removeClass('selected');
              $("[data-id='" + id + "']").find('.smooth-scroll').addClass('selected-item').closest('.time-line').addClass('selected');
              break;
            }
          }
        }, 10)
      })
    },

    categoriesToAnimate : function () {
      var oThis = this,
          categoriesToAnimateWrapper        = $('.categoriesToAnimateWrapper') ,
          categoriesToAnimateMainContainer  = $('.categoriesToAnimateMainContainer') ,
          categoriesToAnimateEls            = $('.categoriesToAnimate') ,
          categoriesToAnimateElsDesc        = $('.categoriesToAnimate .desc'),
          categoriesToAnimateElsTitle       = $('.categoriesToAnimate .title'),
          stickyHeader                      = $('.quarters-container'),
          stickyHeaderHeight                = stickyHeader.height(),
          isCollapsed , animateDelay = 300

      ;
      $(window).on("scroll resize" , function(){
        animateFunc();
      });

      function animateFunc() {
        var categoriesToAnimateMainContainerTop = categoriesToAnimateMainContainer.offset().top,
          stickyHeaderTop                   = stickyHeader.offset().top,
          stickyHeaderBottom                = stickyHeaderTop + stickyHeaderHeight ,
          widthToAssign                     = $('.qElementsToAnimate .quarters-year-row').eq(0).width(),
          minHeightMainContainerCollapsed   = oThis.getHeight( categoriesToAnimateElsTitle ) + 30  ,
          minHeightMainContainerExpanded    = minHeightMainContainerCollapsed + oThis.getHeight( categoriesToAnimateElsDesc) + 20
        ;
        categoriesToAnimateWrapper.css({
          'max-width': widthToAssign + "px"
        });

        if( stickyHeaderBottom > categoriesToAnimateMainContainerTop  ){
          if( isCollapsed ) return ;
          isCollapsed =  true ;
          categoriesToAnimateMainContainer.animate({
            "min-height":  minHeightMainContainerCollapsed + "px"
          } , animateDelay );
          categoriesToAnimateEls.animate({
            "height":  minHeightMainContainerCollapsed + "px",
            "border-top-left-radius": "0px",
            "border-top-right-radius": "0px"
          } , animateDelay );
          categoriesToAnimateElsDesc.animate({
            "opacity": 0
          } , animateDelay );
          categoriesToAnimateWrapper.css({
            'position': "fixed",
            'top': stickyHeaderHeight - 1  + "px"
          });
        }else if( isCollapsed  ){
          isCollapsed =  false ;
          categoriesToAnimateMainContainer.animate({
            "min-height":  minHeightMainContainerExpanded + "px"
          }, animateDelay);
          categoriesToAnimateEls.animate({
            "height":   "100%",
            "border-top-left-radius": "10px",
            "border-top-right-radius": "10px",
          } , animateDelay);
          categoriesToAnimateElsDesc.animate({
            "opacity": 1
          }, animateDelay  );
          categoriesToAnimateWrapper.css({
            'position': "absolute",
            'top': 0
          });
        }
      }
    },


    getHeight : function ( jELS , ) {
      var  maxHeight ;
      for(var cnt = 0 ;  cnt < jELS.length ;  cnt++  ){
        if( !maxHeight || maxHeight <  jELS.eq(cnt).height() ){
          maxHeight = jELS.eq(cnt).height() ;
        }
      }
        return maxHeight ;
    },

    getMinHeightMainContainerExpand : function ( jELS1 ,  jELS2  ) {
      var height1 = oThis.getHeight( jELS1 ) ,
          height2 = oThis.getHeight( jELS2 )
      ;
      return height1 + height2  ;
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