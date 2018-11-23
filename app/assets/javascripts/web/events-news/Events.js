(function(window, $){

  var oSTNs = ns("ost"),
    oThis;

  oSTNs.events = oThis = {
    init : function() {
      $('.events-date-picker').datepicker();
    }
  };

  $(function (){
    oThis.init();
  })

})(window, jQuery);