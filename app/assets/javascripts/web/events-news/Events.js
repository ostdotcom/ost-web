(function(window, $){

  var oSTNs     = ns("ost"),
      utilities = ns("ost.utilities"),
      oThis;

  oSTNs.events = oThis = {

    jDateSelectorClass       : "events-date-picker",
    jDynamicEventWrapper     : $('.dynamic-events-section'),
    jStaticEventWrapper      : $('.static-events'),
    jNoEventsWrapper         : $('.no-events-wrapper'),
    jBookMark                : $('.bookmark-icon'),
    jShowCalendar            : $('.show-calendar'),
    jHideCalendar            : $('.hide-calendar'),
    jClearSelection          : $('.clear-selection'),
    jCalendarDatesSelector   : '.datepicker-days tbody',
    jCalendarWeekDaysSelector: '.datepicker-days thead tr',
    eventTemplate            : null,
    eventsData               : null,
    jMarkup                  : null,
    selectedDate             : null,
    datepickerConfig         : null,
    currentDisplayedMonth    : null,
    currentDisplayedYear     : null,

    init : function( data ) {
      oThis.eventsData = data && data.eventsList;
      var datesObj =  oThis.findFirstLastDate(oThis.eventsData);
      oThis.datepickerConfig = {
        todayHighlight: true,
        startDate : datesObj && datesObj.firstDate,
        endDate   : datesObj && datesObj.lastDate
      };
      $('.'+ oThis.jDateSelectorClass).datepicker( oThis.datepickerConfig );
      oThis.bindEvents();
      oThis.eventsStartIndex = data['startIndex'];
      oThis.eventTemplate = $('#events_template').text();
      oThis.bindAction();
      oThis.setCurrentDisplayedMonth();
      oThis.showEventDates();
      if(oThis.jStaticEventWrapper.children().length === 0 ){
        oThis.jNoEventsWrapper.show();
      }
    },

    setCurrentDisplayedMonth: function(){
      var last_event = oThis.eventsData[oThis.eventsData.length-1],
        last_event_month = new Date(last_event['event_date']*1000).getMonth()+1,
        last_event_year = new Date(last_event['event_date']*1000).getFullYear();
      if(((new Date().getFullYear() === last_event_year ) && (new Date().getMonth()+1 > last_event_month)) || (new Date().getFullYear() > last_event_year)){
        oThis.currentDisplayedMonth = last_event_month;
        oThis.currentDisplayedYear = last_event_year;
      } else{
        oThis.currentDisplayedMonth = new Date().getMonth()+1;
        oThis.currentDisplayedYear = new Date().getFullYear();
      }
    },

    findFirstLastDate:function(eventsData){
      if(!eventsData) return ;
      var firstEvent = new Date(eventsData[0].event_date*1000) ,
          lastEvent  = new Date(eventsData[eventsData.length-1].event_date*1000) ,
          firstDate = firstEvent.getMonth()+1+"/"+firstEvent.getDate()+"/"+firstEvent.getFullYear(),
          lastDate  = lastEvent.getMonth()+1+"/"+lastEvent.getDate()+"/"+lastEvent.getFullYear()
      ;

      return {firstDate:firstDate,lastDate:lastDate}
    },

    bindDatePickerEvents:function() {
      $('.'+ oThis.jDateSelectorClass).on('changeDate', function(event) {
        oThis.hidePopover();
        oThis.selectedDate = $('.'+ oThis.jDateSelectorClass).datepicker('getDate');
        if (oThis.selectedDate) {
          oThis.currentDisplayedMonth = new Date(event.date).getMonth()+1;
          oThis.currentDisplayedYear = new Date(event.date).getFullYear();
          oThis.showEventDates();
          oThis.refreshEventsListByDate(oThis.selectedDate);
          oThis.jClearSelection.css('visibility', 'visible');
        }
      });
      $('.'+ oThis.jDateSelectorClass).on('changeMonth', function(event) {
        oThis.hidePopover();
        oThis.currentDisplayedMonth = new Date(event.date).getMonth()+1;
        oThis.currentDisplayedYear = new Date(event.date).getFullYear();
        oThis.refreshEventsListByMonth(event.date);
        oThis.jClearSelection.css('visibility', 'visible');
        setTimeout( function () {
          oThis.showEventDates();
        } , 100 );
      });
    },

    bindEvents : function(){
      oThis.bindDatePickerEvents();
      oThis.jClearSelection.on('click', function(){
        oThis.hidePopover();
        if( oThis.selectedDate || (oThis.currentDisplayedMonth != new Date().getMonth()+1 || oThis.currentDisplayedYear != new Date().getFullYear())) {
          $('.'+ oThis.jDateSelectorClass).datepicker('remove');
          $('.'+ oThis.jDateSelectorClass).datepicker(oThis.datepickerConfig);
          oThis.bindDatePickerEvents();
          oThis.jDynamicEventWrapper.empty();
          oThis.jStaticEventWrapper.empty();
          oThis.setCurrentDisplayedMonth();
          oThis.showEventDates();
          oThis.refreshEventsListByMonth(new Date());
          oThis.jClearSelection.css('visibility', 'hidden');
          oThis.jHideCalendar.show();
          oThis.jShowCalendar.hide();
        }
      });
      oThis.jShowCalendar.on('click',function(){
        oThis.jHideCalendar.show();
        oThis.jShowCalendar.hide();
        $(oThis.jCalendarWeekDaysSelector).last().show();
        $(oThis.jCalendarDatesSelector).show();

      });
      oThis.jHideCalendar.on('click',function(){
        oThis.jShowCalendar.show();
        oThis.jHideCalendar.hide();
        $(oThis.jCalendarWeekDaysSelector).last().hide();
        $(oThis.jCalendarDatesSelector).hide();

      });
      $('body').on('click', '.apple-btn', function() {
        var elRef   = $(this),
            subject = elRef.data('subject'),
            desc    = elRef.data('desc'),
            location= elRef.data('location'),
            begin   = elRef.data('begin'),
            end     = elRef.data('end'),
            filename= elRef.data('filename'),
            extension= elRef.data('extension');
        oThis.downloadICalFile(subject, desc,location, begin, end, filename, extension);
      });

    },
    showEventDates: function(){
      $(".day").addClass('disable-no-events');
      var boldDateEvents;
      boldDateEvents = oThis.eventsData.filter( function( eventObj ) {
        var date = new Date(eventObj['event_date']*1000),
            monthToCompare = oThis.currentDisplayedMonth;
        if( monthToCompare == date.getMonth()+1 ) {
          return true;
        }else {
          return false;
        }
      });
      var dates = $('.events-date-picker td.day').toArray();
      boldDateEvents.forEach(function (element) {
        var date = new Date(element['event_date']*1000);
        var foundItems = dates.filter(function (item) {
          var dateItem = $(item).data('date');
          var dateDom = new Date(dateItem);
          return (date.getDate() == dateDom.getDate()) && (date.getMonth() == dateDom.getMonth())&& (date.getFullYear() == dateDom.getFullYear());
        });
          if(foundItems){
            $(foundItems).removeClass('disable-no-events');
            $(foundItems).addClass('bold-date');
          }
        });
    },
    refreshEventsListByDate : function( selectedDate ){
      var new_events_array = oThis.eventsData.filter( function( eventObj ) {
        var date = new Date(eventObj['event_date']*1000);
        if( date.getDate() ==  selectedDate.getDate() &&
          date.getMonth() ==  selectedDate.getMonth() &&
          date.getFullYear() ==  selectedDate.getFullYear() ) {
          return true;
        }
      });
      oThis.jDynamicEventWrapper.empty();
      oThis.jStaticEventWrapper.empty();
      if( new_events_array.length == 0) {
        oThis.jNoEventsWrapper.show();
        return;
      }
      oThis.createMarkup( 0, new_events_array);
    },

    refreshEventsListByMonth : function( selectedDate ){
      var new_events_array = oThis.eventsData.filter( function( eventObj ) {
        var date = new Date(eventObj['event_date']*1000);
        if(date.getMonth() ==  selectedDate.getMonth() &&
          date.getFullYear() ==  selectedDate.getFullYear() ) {
          return true;
        }
      });
      oThis.jDynamicEventWrapper.empty();
      oThis.jStaticEventWrapper.empty();
      if( new_events_array.length == 0) {
        oThis.jNoEventsWrapper.show();
        return;
      }
      oThis.createMarkup( 0, new_events_array);
    },

    bindAction:function() {
      oThis.bindBookmark();
      $(".smooth-scroll").on('click', function (event) {
        if (this.hash !== "") {
          event.preventDefault();
          var hash = this.hash,
            ostNavOuterHeight = $('.ost-nav').outerHeight();
          $('html, body').animate({
            scrollTop: $(hash).offset().top - ostNavOuterHeight
          }, 800);
        }
      });
    },

    bindBookmark:function(){
      $('body').on('click', function (e) {
        var jEl =  e.target.closest("[data-toggle=popover]") ,
          len =  jEl && $(jEl).length ;
        if ( !len  ) {
          oThis.hidePopover();
        }
      });

      $(".bookmark-wrapper").on('click',function () {
        oThis.hidePopover();
      });

      $("[data-toggle=popover]").each(function(i, obj) {
        var jEl =  $(this) ;
        jEl.popover({
          html: true,
          content: function () {
            return jEl.parent().find('.calendar-list').html();
          }
        });
      });
    },

    hidePopover: function(){
      $(".bookmark-wrapper").popover('hide');
    },

    createMarkup:function( startIndex, eventsData ){
      var compiledOutput ;
      eventsData.reverse();
      compiledOutput = Handlebars.compile( oThis.eventTemplate );
      oThis.appendMarkup(compiledOutput, startIndex, eventsData);
      oThis.jNoEventsWrapper.hide();
      oThis.bindBookmark();
    },

    appendMarkup:function (compiledOutput, startIndex, eventsData) {
      for(var cnt = startIndex ;  cnt < eventsData.length ; cnt ++ ) {
        oThis.jMarkup = compiledOutput(eventsData[cnt]);
        oThis.jDynamicEventWrapper.append(oThis.jMarkup);
      }
    },

    downloadICalFile:function(subject, desc,location, begin, end, filename, extension) {
      utilities.downloadCalendarFile(subject, desc,location, begin, end, filename, extension);
    }

  };

})(window, jQuery);