(function(window, $){

  var oSTNs          = ns("ost"),
      oThis;

  oSTNs.events = oThis = {

    jDateSelectorClass   : "events-date-picker",
    selectedDate         : null,
    datepickerConfig     : null,
    eventsStartIndex     : null,
    eventsCount          : 6,
    jWrapper             : $('.dynamic-events-section'),
    jShowMoreWrapper     : $('.show-more-event-wrapper'),
    jShowMoreButton      : $('.show-more-event-btn'),
    jBookMark            : $('.bookmark-icon'),
    jStaticEventWrapper  : $('.static-events'),
    jNoEventsWrapper     : $('.no-events-wrapper'),
    eventTemplate        : null,
    eventsData           : null,
    jMarkup              : null,
    currentDisplayedMonth:null,

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
      oThis.showEventDates();
    },

    bindEvents : function(){
      $('.'+ oThis.jDateSelectorClass).on('changeDate', function(event) {
        oThis.selectedDate = $('.'+ oThis.jDateSelectorClass).datepicker('getDate');
        if (oThis.selectedDate) {
          oThis.currentDisplayedMonth = new Date(event.date).getMonth()+1;
          oThis.showEventDates();
          oThis.refreshEventsList(oThis.selectedDate);
        }
      });
      $('.'+ oThis.jDateSelectorClass).on('changeMonth', function(event) {
        oThis.currentDisplayedMonth = new Date(event.date).getMonth()+1;
        setTimeout( function () {
          oThis.showEventDates();
        } , 100 );
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
    showEventDates: function(){
      var boldDateEvents = [];
      boldDateEvents = oThis.eventsData.filter( function( eventObj ) {
        var date = new Date(eventObj['event_date']*1000),
            monthToCompare = oThis.currentDisplayedMonth || new Date().getMonth()+1;
        if( monthToCompare == date.getMonth()+1 ) {
          return true;
        }else {
          return false;
        }
      });
      var dates = $('.events-date-picker td.day').toArray();
      boldDateEvents.forEach(function (element,index) {
        var date = new Date(element['event_date']*1000);
        var foundItems = dates.filter(function (item) {
          var dateItem = $(item).data('date');
          var dateDom = new Date(dateItem);
          return (date.getDate() == dateDom.getDate()) && (date.getMonth() == dateDom.getMonth())&& (date.getFullYear() == dateDom.getFullYear());
        });
          if(foundItems){
            $(foundItems).addClass('bold-date');
          }
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