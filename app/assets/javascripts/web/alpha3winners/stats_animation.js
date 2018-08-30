;
(function (window) {

  var statsNs = ns("ost.winners"),
    oThis;

  statsNs.index = oThis = {

    didAnimated: false,

    animationWrapperFunction: function(){
        oThis.didAnimated = true;
        var ostText = " " + "OST";
        var plusText = "+";
        oThis.animateStats("#d1",0,200, plusText);
        oThis.animateStats("#d2",0,50);
        oThis.animateStats("#d3",0,90, plusText);
        oThis.animateStats("#d4",0,3154);
        oThis.animateStats("#d5",0,75000, ostText);
        oThis.animateStats("#d6",0,250000, ostText);
        oThis.animateStats("#d7",0,8900000, ostText);
        oThis.animateStats("#d8",0,1000, plusText);
    },

    init: function ( ) {
        var jObserver = $(".container-stats .container");
        if( jObserver.visible(true)){
            oThis.animationWrapperFunction();
        }else {
            $(window).scroll(function(){
                if( jObserver.visible(true) && !oThis.didAnimated ){
                    oThis.animationWrapperFunction();
                }
            });
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