;
(function (window) {

  var statsNs = ns("ost.winners"),
    oThis;

  statsNs.index = oThis = {

    init: function (config) {
      oThis.animateStats("#d1",0,250);
      oThis.animateStats("#d2",0,143);
      oThis.animateStats("#d3",0,100);
      oThis.animateStats("#d4",0,50);
      oThis.animateStats("#d5",0,5000000);
      oThis.animateStats("#d6",0,250000);
      oThis.animateStats("#d7",0,75000);
      oThis.animateStats("#d8",0,50000);
    },

    animateStats: function(id, startNum, endNum, duration) {
      duration = duration || 300;
      var jEl = $(id);
      $({num: startNum}).animate({num: endNum}, {
        duration: duration,
        easing: "swing",
        step: function () {
          jEl.html( Math.round(this.num ) )
        },
        complete: function () {
          jEl.html( endNum );
        }
      })
    }

  };



  $(document).ready(function () {
    oThis.init({i18n: {}});
  });

})(window);