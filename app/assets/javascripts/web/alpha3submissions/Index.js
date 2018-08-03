;
(function (window) {

  var alphaSubmissionNs = ns("ost.alphaSubmission"),
      utilsNs = ns("ost.utils"),
      oThis;

  alphaSubmissionNs.index = oThis = {

      init: function (config) {
        $('#alpha-poc-submit-form').formHelper( {
          success : function( res ){
            if( res.sucess ){
              $('#pocSuccessModal').modal('show');
            }
          }
        })
      }

  };

  $(document).ready(function () {
      oThis.init({i18n: {}});
  });

})(window);