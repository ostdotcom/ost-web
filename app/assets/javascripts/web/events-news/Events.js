(function(window, $){

  var oSTNs          = ns("ost"),
    eventsCount      = 6,
    eventsStartIndex = 6,
    jWrapper         = $('.dynamic-events-section'),
    jShowMoreWrapper = $('.show-more-event-wrapper'),
    jShowMoreButton  = $('.show-more-event-btn'),
    jBookMark        = $('.bookmark-icon'),
    eventTemplate    = null,
    eventsData,
    jMarkup,

    oThis;

  oSTNs.events = oThis = {

    jDateSelectorClass : "events-date-picker",
    selectedDate: null,
    datepickerConfig: null,

    init : function( data ) {
      oThis.datepickerConfig = {
      };
      $('.'+ oThis.jDateSelectorClass).datepicker( 'setDate', new Date() );
      oThis.bindEvents();
      eventsData = data.eventsList;
      console.log("eventsData",eventsData);
      eventTemplate = $('#events_template').text();
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
      jShowMoreButton.on('click', function () {
        oThis.createMarkup();
      })
    },


    createMarkup:function(){
      var compiledOutput ;
      compiledOutput = Handlebars.compile( eventTemplate );
      oThis.appendMarkup(compiledOutput);
    },

    appendMarkup:function (compiledOutput) {
      var eventsEndIndex = eventsStartIndex + eventsCount;
      for(var cnt = eventsStartIndex ;  cnt < eventsEndIndex ; cnt ++ ) {
        if ( cnt >=  eventsData.length  ) break;
        jMarkup = compiledOutput(eventsData[cnt]);
        jWrapper.append(jMarkup);
      }
      eventsStartIndex = cnt;
      if ( eventsStartIndex >= eventsData.length ){
        jShowMoreWrapper.hide();
      }
    }
  };

})(window, jQuery);