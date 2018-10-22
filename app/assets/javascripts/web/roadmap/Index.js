;
(function (window) {

  var roadMapNs = ns("ost.roadMap"),
    oThis;

  roadMapNs.index = oThis = {

    init: function (config) {
      oThis.bindButtonActions();
      oThis.fixedHeader();
      oThis.quarterScroll();
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