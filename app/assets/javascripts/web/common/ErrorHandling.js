;
(function(window){
  var utilsNs = ns("ost.utils");

  utilsNs.errorHandling = {
    xhrErrResponse: function(jqXHR, exception, jParent ){
      if ( !jParent ) {
        jParent = $("body");
      }

      var msg = '';
      if (jqXHR.status === 0) {
        msg = 'Not able to connect to server. Please verify your internet connection.';
      } else if (jqXHR.status == 404) {
        msg = 'Requested page not found.';
      } else if (jqXHR.status == 500) {
        msg = 'Internal Server Error.';
      } else if (jqXHR.status == 401) {
          window.location = '/login';
      } else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
      } else if (exception === 'timeout') {
        msg = 'Time out error.';
      } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
      } else {
        msg = 'Unable to connect to server.';
      }

      jParent.find('.error[data-for="general_error"]').text(msg);
      return msg;
    },

    displayFormErrors: function(response, jParent){
      if ( !jParent ) {
        jParent = $("body");
      }

      if((response.success === false) || (response.err != undefined && response.err != '')){

        utilsNs.errorHandling.clearFormErrors();
        if( jParent.find('.error[data-for="general_error"]').length > 0 ){
          jParent.find('.error[data-for="general_error"]').text(response.err.display_text);
        } else {
          $('.error[data-for="general_error"]').text(response.err.display_text);
        }

        if(typeof response.err.error_data != undefined){
          $.each(response.err.error_data, function(e_key, e_val){
            var ele = jParent.find('.error[data-for="'+e_key+'"]');
            ele.text(e_val);
            ele.parent().find('input').addClass('border-error');
          });
        }
      }

    },

    clearFormErrors: function( jParent ){
        if ( !jParent ) {
          jParent = $("body");
        }
        jParent.find('.error[data-for]').text('');
        jParent.find('input').removeClass('border-error');
    },

    addFormError: function(field_name, message){
        $('.error[data-for="'+field_name+'"]').text(message);
        if(message != ''){
            $('[name="'+field_name+'"]').addClass('border-error');
        } else {
            $('[name="'+field_name+'"]').removeClass('border-error');
        }

    }

  };

})(window);

jQuery.fn.extend({
    setCustomValidity: function() {
        var $form = $(this);
        $form.find('input, select, textarea').each(function(){
            $(this).on('change', function(){
                if (this.required && this.value == '') {
                    ost.utils.errorHandling.addFormError(this.name, this.title+' is required');
                }
                else if(this.validity.typeMismatch || this.validity.patternMismatch){
                    ost.utils.errorHandling.addFormError(this.name, 'Please enter a valid '+this.title);
                }
                else if(this.validity.rangeUnderflow){
                    ost.utils.errorHandling.addFormError(this.name, this.title+' cannot be less than '+this.min);
                }
                else if(this.type == 'file' && this.files.length > 0){
                    if(this.files[0].size < $(this).data('min-bytes')){
                        ost.utils.errorHandling.addFormError(this.name, this.title+' file size too small');
                    }
                    if(this.files[0].size > $(this).data('max-bytes')){
                        var maxMb = $(this).data('max-bytes') / (1024*1024);
                        ost.utils.errorHandling.addFormError(this.name, this.title+' file size too large. Max allowed '+maxMb+' Mb');
                    }
                }
                else {
                    this.setCustomValidity("");
                }
            });
        });
    },
});