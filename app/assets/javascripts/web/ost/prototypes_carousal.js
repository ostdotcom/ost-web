;(function (window ,$) {

  var ost          = ns('ost'),
      oThis;

      ost.carousel = window.ost.carousel || {};

      ost.carousel.prototypes = oThis = {
        scrollHeight      : $(window).scrollTop(),
        snapElemetHeight  : 600,
        jumbotronHeight   : $('.side-by-side-1-wrapper').outerHeight(true),
        noOfPrototypes    : $('.snap-container ul li').length,
        threshold         : 2,
        startIndex        : 0,
        jViewMoreBtn      :$('#view-more-prototypes'),

        init : function (config) {
          oThis.initPrototypeCarousal();
          oThis.viewMore();
          oThis.bindActions();
        },

        initPrototypeCarousal : function () {
          if(navigator.userAgent.match(/iPad/i)){
            $('#prototypes-carousal').slick({
              dots: true,
              arrows: false,
              slidesToShow: 1,
              centerMode:true,
              initialSlide:0,
              centerPadding:'300px',

            });

          }else{
            $('#prototypes-carousal').slick({
              dots: true,
              arrows: false,
              slidesToShow: 2,
              centerMode:true,
              initialSlide:0,
              centerPadding:'200px',

            });
          }

          if(!navigator.userAgent.match(/iPad/i)){
            $('.slick-current').prev('div').addClass('nofade');
          }else{
            $('.slick-slide').css({'display': 'flex' , 'justify-content' : 'center'});
          }


        },
        bindActions : function () {
          $('#prototypes-carousal').on('beforeChange',function (event,slick,currentSlide,nextSlide) {
            $('.slick-slide').removeClass('nofade');
              //add no fade class to nextslides's previous div
            if(!navigator.userAgent.match(/iPad/i)){
              $("[data-slick-index='" + nextSlide +"']").prev('div').addClass('nofade');
            }

            })

          oThis.jViewMoreBtn.on('click',function () {
              oThis.viewMore();
          });
        },
        viewMore : function () {
          var tempThreshold = oThis.threshold;
          if(oThis.noOfPrototypes > 3 ){

            $('.snap-container ul li').each(function (index) {
              if(oThis.startIndex <= index && index < oThis.threshold){
                $(this).show();
                tempThreshold = index;
              }
            });

            if(oThis.noOfPrototypes == tempThreshold + 1){
              oThis.jViewMoreBtn.hide();
            }
            oThis.startIndex = tempThreshold + 1;
            oThis.threshold = tempThreshold + 3;

          }else{

            oThis.jViewMoreBtn.hide();
            $('.snap-container ul li').each(function (index) {
              $(this).show()
            });
          }
        }
      }

      $(document).ready(function () {

        // $('.iframe-dimensions').load(function() {
        //   $(this).prev('img').hide();
        //   $(this).show();
        //
        // });
        //
        // $('.iframe-dimensions-mobile').load(function() {
        //   $(this).prev('img').hide();
        //   $(this).show();
        //
        // });
      })

})(window,jQuery);