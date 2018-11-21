(function(window, $){

  var news = ns('ost.news'),
    newsData,
    newsMarkup,
    jMarkup,
    newsCount      = 9,
    newsStartIndex = 9,
    jWrapper       = $('.dynamic-news-section'),
    jShowMoreBtn   = $('.show-more-btn'),
    jShowMoreWrapper= $('.show-more-wrapper'),
    htmlTmpl       = $("#news").html();

  news.init = function( data ) {
    newsData   = data.newsList;
    initShowMoreAction();
  };

  function createMarkup( template ) {
    var compiledMarkup;
    compiledMarkup = Handlebars.compile( template );
    appendMarkup( compiledMarkup );
  }

  function initShowMoreAction() {
    jShowMoreBtn.on('click', function( ){
      createMarkup( htmlTmpl );
    });
  }

  function appendMarkup( compiledMarkup ) {
    var newsEndIndex = newsStartIndex + newsCount;
    for(var cnt = newsStartIndex ;  cnt < newsEndIndex ; cnt ++ ) {
      if ( cnt >=  newsData.length  ) break;
      jMarkup = compiledMarkup(newsData[cnt]);
      jWrapper.append(jMarkup);
    }
    newsStartIndex = cnt;
    if ( newsStartIndex >= newsData.length ){
      jShowMoreWrapper.hide();
    }
  }


})(window, jQuery);