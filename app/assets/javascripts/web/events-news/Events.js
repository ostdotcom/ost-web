(function(window, $){

  var oSTNs          = ns("ost"),
      oThis;

  oSTNs.events = oThis = {

    jDateSelectorClass : "events-date-picker",
    selectedDate       : null,
    datepickerConfig   : null,
    eventsCount        : 6,
    eventsStartIndex   : 6,
    jWrapper           : $('.dynamic-events-section'),
    jShowMoreWrapper   : $('.show-more-event-wrapper'),
    jShowMoreButton    : $('.show-more-event-btn'),
    jBookMark          : $('.bookmark-icon'),
    eventTemplate      : null,
    eventsData         : null,
    jMarkup            : null,

    init : function( data ) {
      oThis.datepickerConfig = {
      };
      $('.'+ oThis.jDateSelectorClass).datepicker();
      oThis.bindEvents();
      oThis.eventsData = data.eventsList;
      console.log("eventsData",oThis.eventsData);
      oThis.eventTemplate = $('#events_template').text();
      oThis.bindAction();
    },

    bindEvents : function(){
      $('.'+ oThis.jDateSelectorClass).on('changeDate', function() {
        oThis.selectedDate = $('.'+ oThis.jDateSelectorClass).datepicker('getFormattedDate');
        console.log(oThis.selectedDate);
        oThis.refreshEventsList();
      });
    },

    refreshEventsList : function(){

    },

    bindAction:function() {
      oThis.jShowMoreButton.on('click', function () {
        oThis.createMarkup();
      })
    },


    createMarkup:function(){
      var compiledOutput ;
      compiledOutput = Handlebars.compile( oThis.eventTemplate );
      oThis.appendMarkup(compiledOutput);
    },

    appendMarkup:function (compiledOutput) {
      var eventsEndIndex = oThis.eventsStartIndex + oThis.eventsCount;
      for(var cnt = oThis.eventsStartIndex ;  cnt < eventsEndIndex ; cnt ++ ) {
        if ( cnt >=  oThis.eventsData.length  ) break;
        oThis.jMarkup = compiledOutput(oThis.eventsData[cnt]);
        oThis.jWrapper.append(oThis.jMarkup);
      }
      oThis.eventsStartIndex = cnt;
      if ( oThis.eventsStartIndex >= oThis.eventsData.length ){
        oThis.jShowMoreWrapper.hide();
      }
    }
  };

})(window, jQuery);