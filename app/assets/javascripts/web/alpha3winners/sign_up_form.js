;
(function (window) {

  var alpha3winnersNs = ns("ost.alpha3winners"),
    utilities = ns("ost.utilities"),
    oThis;

  alpha3winnersNs.index = oThis = {
    jForm : null,
    jBtn  : null,
    captchaErrMsg : "Please select the reCaptcha checkbox",
    init: function (config) {
      $('#successModal').modal('hide');
      oThis.jForm = $('#alpha-winners-form');
      oThis.jBtn = $('#alpha-winners-submit');
      oThis.bindEvents();
    },

    bindEvents: function(){
      oThis.jForm.formHelper( {
        success : function( res ){
          if( res.success ){
            $('#successModal').modal('show');
            oThis.jForm[0].reset();
          }
        },
        complete: function(){
          grecaptcha.reset();
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