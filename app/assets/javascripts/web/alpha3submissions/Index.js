;
(function (window) {

  var alphaSubmissionNs = ns("ost.alphaSubmission"),
      utilities = ns("ost.utilities"),
      oThis;

  alphaSubmissionNs.index = oThis = {
      jForm : null,
      jBtn  : null,
      captchaErrMsg : "Please select the reCaptcha checkbox",
      init: function (config) {
        $('#pocSuccessModal').modal('hide');
        oThis.jForm = $('#alpha-poc-submit-form');
        oThis.jBtn = $('#alpha-poc-submit');
        oThis.bindEvents();
      },

      bindEvents: function(){
        oThis.jForm.formHelper( {
          success : function( res ){
            if( res.success ){
              $('#pocSuccessModal').modal('show');
              oThis.jForm[0].reset();
              grecaptcha.reset();
            }
          }
        });


        oThis.jForm.on("beforeSubmit", function (event) {
          if ( !oThis.isCaptchaValid ) {
            event.preventDefault();
          }
        });


        oThis.jBtn.on('click' , function () {
          oThis.isCaptchaValid = utilities.validateCaptcha( oThis.jForm );
        });

      }
  };

  $(document).ready(function () {
      oThis.init({i18n: {}});
  });

})(window);