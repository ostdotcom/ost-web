;
(function (window) {

  var winnersNs = ns("ost.winners"),
    utilsNs = ns("ost.utils"),
    oThis;

  winnersNs.index = oThis = {
    jSignUpForm: null,

    init: function (config) {
      $("#subscribe-form-submit").on("click", function (event) {
        event.preventDefault();
        oThis.onSubscribe();
      });
    },

    onSubscribe: function () {
      var oThis     = this,
        jForm     = $('#subscribe-form'),
        jSubmitBtn = $("#subscribe-form-submit"),
        jsonpUrl  = jSubmitBtn.data('jsonp'),
        jEmail    = $("#subscribe-form-email"),
        emailVal   = jEmail.val().trim(),
        emailPattern =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        isFormValid = true
      ;

      oThis.resetError( jForm );


      if( !emailVal ) {
        oThis.showError('Email is mandatory', '.email-error');
        isFormValid = false;
      }else if ( !emailPattern.test( emailVal ) ) {
        oThis.showError('Invalid email', '.email-error' );
        isFormValid =  false;
      }


      if ( !$("input#subscribe_confirmation").is(":checked")){
        oThis.showError('Please select the checkbox to continue', '.confirmation_error' );
        isFormValid =  false;
      }

      if( !isFormValid ){
        return false;
      }

      jSubmitBtn.text('Submitting...').prop('disabled', true);


      $.ajax({
        url: jsonpUrl,
        jsonp: "callback",
        dataType: "jsonp",
        data: {email: emailVal},
        method: 'GET',
        success: function (responseJson) {
          if ((responseJson.error != undefined) && (responseJson.error != '')) {

            var error_msg = [];
            $.each(responseJson.error_message, function (errors_key, errors_value) {
              $.each(errors_value, function (index, value) {
                error_msg.push(value);
              });
            });

            oThis.showError(error_msg.join('. '), '.general_error');

          } else {

            oThis.resetError( jForm );
            jForm.hide();
            $('#subscribe-success').show();
          }

        },
        error: function (error) {
          console.log("error in sign-up" , error);
          oThis.showError('Something Went Wrong', '.general_error');
        },
        complete: function (response) {
          jSubmitBtn.text('Sign Up').prop('disabled', false);
        }

      });
    },

    resetError: function ( jForm ) {
      jForm.find('.error').html("");
    },

    showError: function (text, selector) {
      $('#subscribe-form ' + selector).html(text);
      $('#subscribe-form input').addClass('red');
    },


  };

  $(document).ready(function () {
    oThis.init({i18n: {}});
  });

})(window);