;(function (window ,$) {

  var ost          = ns('ost'),
      oThis;
  var   IFRAME_HEIGHT = 875,
        IFRAME_WIDTH  = 416 ,
        MARGIN        = '0 20%',
        NEGATIVE_MULTIPLIER = -1;

      ost.carousel = window.ost.carousel || {};

      ost.carousel.prototypes = oThis = {
        noOfPrototypes    : $('.snap-container ul li').length,
        threshold         : 2,
        startIndex        : 0,
        jViewMoreBtn      :$('#view-more-prototypes'),
        jCoverImage       :$('.iframe-cover-img'),
        iFrameWidth       :IFRAME_WIDTH,
        iFrameHeight      :IFRAME_HEIGHT,
        invisionRootUrl   :null,
        prototypesMap     :null,
        invisionVersion   :null,

        init : function (config) {
          $.extend(oThis,config);
          oThis.createPrototypeURLs();
          oThis.initPrototypeCarousal();
          oThis.viewMore();
          oThis.bindActions();
        },

        createPrototypeURLs : function(){
          oThis.prototypesMap     = {
            "spoon" : oThis.invisionRootUrl+"/prototype-3/index.html?v="+oThis.invisionVersion,
            "hornet" : oThis.invisionRootUrl+"/prototype-1/index.html?v="+oThis.invisionVersion,
            "tolkin" : oThis.invisionRootUrl+"/prototype-2/index.html?v="+oThis.invisionVersion
          }
        },

        initPrototypeCarousal : function () {

            //Init slick
            $('#prototypes-carousal').slick({
              dots: true,
              arrows: false,
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode:true,
              initialSlide:0,
              centerPadding:'33%',
            });
        },

        bindActions : function () {

          oThis.jCoverImage.on('click',function () {
            var prototypeName = $(this).data("name"),
                link = oThis.prototypesMap[prototypeName],
                jImg = $(this),
                iframe = '<iframe class="iframe-dimensions" width="'+ oThis.iFrameWidth+'" height="'+ oThis.iFrameHeight +'" src="'+ link +'" frameborder="0" scrolling="no"></iframe>',
                jIframe = $( iframe ),
                imageWidth = jImg.width(),
                imageHeight = jImg.height(),
                widthScale = imageWidth / oThis.iFrameWidth;

                widthScale = widthScale * 100;
                widthScale = parseInt(widthScale);
                widthScale = widthScale / 100;


            var jWrap = $('<div></div>');
            jWrap.css({
              width: imageWidth + "px",
              height: imageHeight + "px",
              margin: MARGIN,
              position: 'relative',
              overflow: 'hidden',
              display : 'inline-block'
            });

            var jWrap2 = $('<div></div>');
            jWrap2.css({
              transform : "scale(" + widthScale + ")",
              position: 'relative',
              width: oThis.iFrameWidth,
              height: oThis.iFrameHeight + "px"
            });
            jWrap.append(jWrap2);

            setTimeout(function () {
              var positions = jWrap2.position();

              jIframe.css({
                transform : "scale(" + widthScale + ")",
                position: 'relative',
                width: oThis.iFrameWidth,
                height: oThis.iFrameHeight + "px",
                marginLeft: (NEGATIVE_MULTIPLIER * positions.left) + "px",
                marginTop:  (NEGATIVE_MULTIPLIER * positions.top) + "px"
              });
              jWrap.append(jIframe);
              jWrap2.hide();
            }, 200);

            jWrap.insertAfter(jImg);
            jImg.hide();
          });

          //View more button in mobile view
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
      };

})(window,jQuery);