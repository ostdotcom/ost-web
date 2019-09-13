;(function (window ,$) {

  var ost          = ns('ost'),
      oThis;

      ost.carousel = window.ost.carousel || {};

      ost.carousel.prototypes = oThis = {
        scrollHeight      : $(window).scrollTop(),
        snapElemetHeight  : 600,
        jumbotronHeight   : $('.side-by-side-1-wrapper').outerHeight(true),
        noOfPrototypes    : $('.snap-container ul li').length,

        init : function (config) {
          oThis.initPrototypeCarousal();
          oThis.viewMore();
          oThis.bindActions();

        },

        initPrototypeCarousal : function () {
          $('#prototypes-carousal').slick({
            dots: true,
            arrows: false,
            slidesToShow: 2,
            centerMode:true,
            initialSlide:0,
            centerPadding:'200px',

          });

          $('.slick-current').prev('div').addClass('nofade');
          // $('.slick-current').prev('div').animate({opacity :1});

        },
        bindActions : function () {
          $('#prototypes-carousal').on('beforeChange',function (event,slick,currentSlide,nextSlide) {
            $('.slick-slide').removeClass('nofade');
              //add no fade class to nextslides's previous div
              $("[data-slick-index='" + nextSlide +"']").prev('div').addClass('nofade');
            })
          var lastScroll = 0;
          var scrollUp = false;

          $(window).on('scroll ', function(){
            oThis.scrollHeight = $(window).scrollTop();
            if(oThis.jumbotronHeight < oThis.scrollHeight){
              $('.snap-container').addClass('protoype-wrapper');
            }


          });




        },
        viewMore : function () {

          if(oThis.noOfPrototypes > 3 ){
            for( var i =0 ; i < 3 ; i++){
              $('.snap-container ul li')[i].show();
            }
          }else{
            for( var i =0 ; i < oThis.noOfPrototypes ; i++){
              $('.snap-container ul li')[i].show();
            }
          }








        }
      }

})(window,jQuery);