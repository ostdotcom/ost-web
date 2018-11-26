(function(window, $){

  var oSTNs          = ns("ost"),
      oThis;

  oSTNs.events = oThis = {

    jDateSelectorClass : "events-date-picker",
    selectedDate       : null,
    datepickerConfig   : null,
    eventsStartIndex   : null,
    eventsCount        : 6,
    jWrapper           : $('.dynamic-events-section'),
    jShowMoreWrapper   : $('.show-more-event-wrapper'),
    jShowMoreButton    : $('.show-more-event-btn'),
    jBookMark          : $('.bookmark-icon'),
    jStaticEventWrapper: $('.static-events'),
    eventTemplate      : null,
    eventsData         : null,
    jMarkup            : null,

    init : function( data ) {
      oThis.datepickerConfig = {
        todayHighlight: true
      };
      $('.'+ oThis.jDateSelectorClass).datepicker( oThis.datepickerConfig );
      oThis.bindEvents();
      oThis.eventsData = data.eventsList;
      oThis.startIndex = data.startIndex;
      console.log("eventsData",oThis.eventsData);
      oThis.eventTemplate = $('#events_template').text();
      oThis.bindAction();
    },

    bindEvents : function(){
      $('.'+ oThis.jDateSelectorClass).on('changeDate', function() {
        oThis.selectedDate = $('.'+ oThis.jDateSelectorClass).datepicker('getDate');
        console.log(oThis.selectedDate);
        oThis.refreshEventsList(oThis.selectedDate);
      });
    },

    refreshEventsList : function( selectedDate ){
      var new_events_array = oThis.eventsData.filter( function( eventObj ) {
        var date = new Date(eventObj['event_date']*1000);
        if( date.getDate() ==  selectedDate.getDate() &&
          date.getMonth() ==  selectedDate.getMonth() &&
          date.getFullYear() ==  selectedDate.getFullYear() ) {
          return true;
        }
      });
      oThis.jWrapper.empty();
      oThis.jStaticEventWrapper.empty();
      oThis.jShowMoreWrapper.hide();
      oThis.createMarkup( 0, new_events_array);
    },

    bindAction:function() {
      oThis.jShowMoreButton.on('click', function () {
        oThis.createMarkup( oThis.startIndex, oThis.eventsData );
      })
    },


    createMarkup:function( startIndex, eventsData ){
      var compiledOutput ;
      compiledOutput = Handlebars.compile( oThis.eventTemplate );
      oThis.appendMarkup(compiledOutput, startIndex, eventsData);
    },

    appendMarkup:function (compiledOutput, startIndex, eventsData) {
      var eventsEndIndex = startIndex + oThis.eventsCount;
      for(var cnt = startIndex ;  cnt < eventsEndIndex ; cnt ++ ) {
        if ( cnt >=  eventsData.length  ) break;
        oThis.jMarkup = compiledOutput(eventsData[cnt]);
        oThis.jWrapper.append(oThis.jMarkup);
      }
      startIndex = cnt;
      if ( startIndex >= oThis.eventsData.length ){
        oThis.jShowMoreWrapper.hide();
      }
    }
  };

})(window, jQuery);