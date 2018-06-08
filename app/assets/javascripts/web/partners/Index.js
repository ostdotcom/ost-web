;
(function (window) {

  var partnersNs = ns("ost.partners"),
      utilsNs = ns("ost.utils"),
      oThis;

  partnersNs.index = oThis = {
      jContactForm: null,

      init: function (config) {
        oThis.jContactForm = $('#partners-contact-us-form');
        oThis.jContactForm.setCustomValidity();
        oThis.bindButtonActions();
      },

      bindButtonActions: function () {


        $("#partners-contact-us-submit").on("click", function (event) {
          event.preventDefault();
          oThis.onContactFormSubmit( event );
        });

        $(".smooth-scroll").on('click', function (event) {
          if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top + 2
            }, 800);
          }
        });

      },

      onContactFormSubmit: function () {

        //Validate Everything Again
        if ( !oThis.isContactFormValid() ) {
          console.log("Validation failed!");
          return;
        }
        $("#partners-contact-us-submit")
          .text('sending ...')
          .prop( "disabled", true );
        oThis.onSendMessage();
      },

      isContactFormValid: function () {
        ost.utils.errorHandling.clearFormErrors();
        oThis.jContactForm.find('input').trigger('change');
        if(typeof oThis.jContactForm.find('.g-recaptcha')[0] != 'undefined' && typeof grecaptcha  != 'undefined'){
          if(grecaptcha.getResponse() == ''){
            oThis.jContactForm.find('.error[data-for="recaptcha"]').text('Please select the reCaptcha checkbox');
          }
        }
        return oThis.jContactForm.find('.error:not(:empty)').length == 0;
      },

      onSendMessage: function () {
        console.log("onSendMessage :: triggered!");
        var $contactusform = $('#partners-contact-us-form');
        var $contactusformurl = $contactusform.prop('action');
        var $formHeight = $contactusform.height();
        $('#successModal').modal('hide');
        $.ajax({
          url: $contactusformurl,
          dataType: 'json',
          method: 'GET',
          data: $contactusform.serialize(),
          success: function (response) {
            if (response.success == true) {
              $('#successModal').modal('show');
              $contactusform[0].reset();
            } else {
              ost.utils.errorHandling.displayFormErrors(response);
              if(typeof grecaptcha  != 'undefined'){
                grecaptcha.reset();
              }
            }
          },
          error: function (jqXHR, exception) {
            utilsNs.errorHandling.xhrErrResponse(jqXHR, exception);
          },

          complete: function (response) {
            $("#partners-contact-us-submit")
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