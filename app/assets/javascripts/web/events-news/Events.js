(function(window, $){

  var oSTNs          = ns("ost"),
      ostEvents      = ns("ost.events"),
    eventsCount     = 6,
    eventsIndex      = 6,
    jWrapper         = $('.dynamic-events-section'),
    jShowMoreWrapper = $('.show-more-event-wrapper'),
    jShowMoreButton  = $('.show-more-event-btn'),
    jBookMark        = $('.bookmark-icon'),
    eventTemplate    = null,
    eventsData,
    jMarkup,

    oThis;

  oSTNs.events = oThis = {
    init : function(data) {
      $('.events-date-picker').datepicker();
      eventsData = data.eventsList;
      console.log("eventsData",eventsData);
      eventTemplate = $('#events_template').text();
      oThis.bindAction();
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
      var eventsEndIndex = eventsIndex + eventsCount;
      for(var cnt = eventsIndex ;  cnt < eventsEndIndex ; cnt ++ ) {
        if ( cnt >=  eventsData.length  ) break;
        jMarkup = compiledOutput(eventsData[cnt]);
        jWrapper.append(jMarkup);
      }
      eventsIndex = cnt;
      if ( eventsIndex >= eventsData.length ){
        jShowMoreWrapper.hide();
      }
    }

  };


})(window, jQuery);