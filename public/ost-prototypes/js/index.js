(function ( window, $) {
  $(document).ready(function () {
    var query_param = document.location.search
    var version = query_param.substring(5);
    if(version){
      console.log("version was updated");
      $('head').append('<link type="text/css" rel="stylesheet" href="/ost-prototypes/css/index_v'+version+'.css"/>')
    }else {
      console.log("version was not updated");
      $('head').append('<link type="text/css" rel="stylesheet" href="/ost-prototypes/css/index.css"/>')
    }

  })
})(window, jQuery)