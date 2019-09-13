;(function (window ,$) {

  var ost          = ns('ost'),
      oThis;

      ost.carousel = window.ost.carousel || {};

      ost.carousel.prototypes = oThis = {
        scrollHeight      : $(window).scrollTop(),
        snapElemetHeight  : 600,
        jumbotronHeight   : $('.side-by-side-1-wrapper').outerHeight(true),
        noOfPrototypes    : $('.protoype-wrapper li').length,

        init : function (config) {
          oThis.initPrototypeCarousal();
          oThis.initSnap();
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

//             var currentScroll = document.documentElement.scrollTop || document.body.scrollTop; // Get Current Scroll Value
//
//             if (currentScroll > 0 && lastScroll <= currentScroll){
//               lastScroll = currentScroll;
//               scrollUp = false;
//             }else{
//               lastScroll = currentScroll;
//               scrollUp = true;
//             }
// console.log("scroll",scrollUp);
//
//             oThis.scrollHeight = $(window).scrollTop();
//             var requiredHeight = oThis.scrollHeight > oThis.jumbotronHeight - oThis.snapElemetHeight/2;
//             var firstVisible = $('.edge-element-first').visible(true);
//             var lastVisible = $('.edge-element-last').visible(true);
//             if(requiredHeight && !scrollUp && firstVisible){
//               $('html, body').animate({
//                 scrollTop: $('#scrollSnap').offset().top
//               }, 800)
//             }
//             else if( !scrollUp && lastVisible ){
//               $('html, body').animate({
//                 scrollTop: $('#partners').offset().top
//               }, 800)
//             }
//             else if(scrollUp && firstVisible){
//               $('html, body').animate({
//                 scrollTop: 0
//               }, 800)
//             }
            oThis.scrollHeight = $(window).scrollTop();
            if(oThis.jumbotronHeight < oThis.scrollHeight){
              $('.snap-container').addClass('protoype-wrapper');
            }


          });




        },
        initSnap : function () {










        }
      }

})(window,jQuery);