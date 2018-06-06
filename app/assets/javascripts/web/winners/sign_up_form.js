;
(function (window) {

  var winnersNs = ns("ost.winners"),
    utilsNs = ns("ost.utils"),
    oThis;

  winnersNs.index = oThis = {
    jSignUpForm: null,

    init: function (config) {
      oThis.jSignUpForm = $('#sign-up-form');
      oThis.jSignUpForm.setCustomValidity();
      oThis.bindButtonActions();
    },

    bindButtonActions: function () {

      $("#sign-up-form-submit").on("click", function (event) {
        event.preventDefault();
        oThis.onSignUpFormSubmit( event );
      });

    },

    onSignUpFormSubmit: function () {

      //Validate Everything Again
      if ( !oThis.isSignUpFormValid() ) {
        console.log("Validation failed!");
        return;
      }
      $("#sign-up-form-submit")
        .text('sending ...')
        .prop( "disabled", true );
      oThis.onSendMessage();
    },

    isSignUpFormValid: function () {
      utilsNs.errorHandling.clearFormErrors();
      oThis.jSignUpForm.find('input').trigger('change');
      if(typeof oThis.jSignUpForm.find('.g-recaptcha')[0] != 'undefined' && typeof grecaptcha  != 'undefined'){
        if(grecaptcha.getResponse() == ''){
          oThis.jSignUpForm.find('.error[data-for="recaptcha"]').text('Please select the reCaptcha checkbox');
        }
      }
      if(!$('#sign-up-form input[name=ost_product_communicate]').is(':checked')){
        oThis.jSignUpForm.find('.error[data-for="ost_product_communicate"]').text('Please check the checkbox');
      }
      return oThis.jSignUpForm.find('.error:not(:empty)').length == 0;
    },

    onSendMessage: function () {
      var $signupform = $('#sign-up-form');
      var $signupformurl = $signupform.prop('action');
      $('#successModal').modal('hide');
      $.ajax({
        url: $signupformurl,
        dataType: 'json',
        method: 'GET',
        data: $signupform.serialize(),
        success: function (response) {
          if (response.success == true) {
            $('#successModal').modal('show');
            $signupform[0].reset();
          } else {
            utilsNs.errorHandling.displayFormErrors(response);
            if(typeof grecaptcha  != 'undefined'){
              grecaptcha.reset();
            }
          }
        },
        error: function (jqXHR, exception) {
          utilsNs.errorHandling.xhrErrResponse(jqXHR, exception);
        },

        complete: function (response) {
          $("#sign-up-form-submit")
            .text('submit')
            .prop( "disabled", false );

          if(typeof grecaptcha  != 'undefined'){
            grecaptcha.reset();
          }
        }

      });
    }

  };

  $(document).ready(function () {
    oThis.init({i18n: {}});
  });

})(window);