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
    },

    bindButtonActions: function () {

      $(".smooth-scroll").on('click', function (event) {
        if (this.hash !== "") {
          event.preventDefault();
          var hash = this.hash;
          var offset= $(hash).offset().top;
          offset -= 90;
          $('html, body').animate({
            scrollTop:offset
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

    fixedHeader: function(){

      var stickyHeaderTop = $('.quarters-container').offset().top;
      var stickyHeaderHeight = $('.quarters-container').height();

      $(window).scroll(function(){
        var stickyAliasHeight = $('#stickyalias').height(stickyHeaderHeight + 'px');
        var scrollTop = $(window).scrollTop();
        if( scrollTop > stickyHeaderTop ) {
          $('.quarters-container').css({position: 'fixed', top: '0px'});
          $('#stickyalias').css({display: 'block', height: stickyAliasHeight + 'px'});
        } else {
          $('.quarters-container').css({position: 'static', top: '0px'});
          $('#stickyalias').css({display: 'none', height: 0});
        }
      });

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