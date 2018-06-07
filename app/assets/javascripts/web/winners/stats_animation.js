;
(function (window) {

  var statsNs = ns("ost.winners"),
    oThis;

  statsNs.index = oThis = {

    didAnimated: false,

    animationWrapperFunction: function(){
        oThis.didAnimated = true;
        var ostText = " " + "OST";
        oThis.animateStats("#d1",0,250);
        oThis.animateStats("#d2",0,143);
        oThis.animateStats("#d3",0,100);
        oThis.animateStats("#d4",0,50);
        oThis.animateStats("#d5",0,5000000, ostText);
        oThis.animateStats("#d6",0,250000 , ostText);
        oThis.animateStats("#d7",0,75000  , ostText);
        oThis.animateStats("#d8",0,50000  , ostText);
    },

    init: function (config) {

        if( !$(".container-stats").visible()){
            $(window).scroll(function(){
                if( $(".container-stats").visible() && !oThis.didAnimated ){
                    oThis.animationWrapperFunction();
                }
            });
        }else {
            oThis.animationWrapperFunction();
        }
    },

    animateStats: function(id, startNum, endNum, extraText , duration) {
      duration = duration   || 1000;
      extraText = extraText || "";
      var jEl = $(id),
          textValue
        ;
      $({num: startNum}).animate({num: endNum}, {
        duration: duration,
        easing: "swing",
        step: function () {
          textValue = Math.round(this.num).toLocaleString('en') + extraText;
          jEl.html( textValue )
        },
        complete: function () {
          textValue = endNum.toLocaleString('en') + extraText;
          jEl.html( textValue );
        }
      })
    }
  };

  $(document).ready(function () {
    oThis.init({i18n: {}});
  });

})(window);