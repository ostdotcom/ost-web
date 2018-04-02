;
(function (window) {

  var partnersNs = ns("simpletoken.partners"),
      utilsNs = ns("simpletoken.utils"),
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
                scrollTop: $(hash).offset().top
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
        simpletoken.utils.errorHandling.clearFormErrors();
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
        $('#send-message-success').hide();
        $.ajax({
          url: $contactusformurl,
          dataType: 'json',
          method: 'GET',
          data: $contactusform.serialize(),
          success: function (response) {
            if (response.success == true) {
              $contactusform.hide();
              $('#send-message-success').show().height($formHeight);
            } else {
              simpletoken.utils.errorHandling.displayFormErrors(response);
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