;
(function (window , $) {

  var ost =  ns("ost"),
      oThis
  ;

  ost.utilities = oThis = {
    captchaErrMsg: "Please select the reCaptcha checkbox",

    validateCaptcha: function (jForm) {
      if (!jForm) return false;
      if (typeof jForm.find('.g-recaptcha')[0] != 'undefined' && typeof grecaptcha != 'undefined') {
        var jElCaptchaErr = jForm.find('.error[data-forid="recaptcha"]');
        if (grecaptcha.getResponse() == '') {
          jElCaptchaErr.text(oThis.captchaErrMsg).addClass('is-invalid');
          return false;
        } else {
          jElCaptchaErr.text('').removeClass('is-invalid');
          return true;
        }
      }
    },

    downloadCalendarFile: function( subject, description, location, begin, end, filename, extension) {
      var cal = ics();
      cal.addEvent(subject, description, location, begin, end);
      cal.download(filename, extension);
    }
  }


})(window , jQuery);


