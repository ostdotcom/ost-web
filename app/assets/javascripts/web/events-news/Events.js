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
    jNoEventsWrapper   : $('.no-events-wrapper'),
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
      oThis.eventsStartIndex = data.startIndex;
      console.log("eventsData",oThis.eventsData);
      oThis.eventTemplate = $('#events_template').text();
      oThis.bindAction();
    },

    bindEvents : function(){
      $('.'+ oThis.jDateSelectorClass).on('changeDate', function() {
        oThis.selectedDate = $('.'+ oThis.jDateSelectorClass).datepicker('getDate');
        if (oThis.selectedDate) {
          oThis.refreshEventsList(oThis.selectedDate);
        }
      });
      $('.clear-selection').on('click', function(){
        if( oThis.selectedDate ) {
          $('.'+ oThis.jDateSelectorClass).datepicker( 'clearDates' );
          oThis.jWrapper.empty();
          oThis.jStaticEventWrapper.empty();
          oThis.jShowMoreWrapper.show();
          var new_events_array = oThis.eventsData.filter( function( eventObj ) {
            var date = new Date(eventObj['event_date']*1000),
              today = new Date();
            if( date.getMonth() == today.getMonth() ) {
              return true;
            }
          });
          oThis.createMarkup( 0, new_events_array.slice(0,6));
        }
      })
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
      if( new_events_array.length == 0) {
        oThis.jNoEventsWrapper.show();
        return;
      }
      oThis.createMarkup( 0, new_events_array);
    },

    bindAction:function() {
      oThis.jShowMoreButton.on('click', function () {
        oThis.createMarkup( oThis.eventsStartIndex, oThis.eventsData );
      })

      oThis.bindBookmark();
      oThis.hidePopover();
    },

    bindBookmark:function(){
      $("[data-toggle=popover]").each(function(i, obj) {
        $(this).popover({
          html: true,
          content: function () {
            return $('#calendar-list').html();
          }
        });
      });

    },

    hidePopover: function(){

      $('body').on('click', function (e) {
        var jEl =  e.target.closest("[data-toggle=popover]") ,
            len =  jEl && $(jEl).length ;
        if ( !len  ) {
          $('[data-toggle="popover"]').popover('hide');
        }
      });
    },
    createMarkup:function( startIndex, eventsData ){
      var compiledOutput ;
      compiledOutput = Handlebars.compile( oThis.eventTemplate );
      oThis.appendMarkup(compiledOutput, startIndex, eventsData);
      oThis.jNoEventsWrapper.hide();
      oThis.bindBookmark();
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