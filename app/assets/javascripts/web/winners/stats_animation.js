;
(function (window) {

  var statsNs = ns("ost.winners"),
    oThis;

  statsNs.index = oThis = {

    init: function (config) {
    },

    bindButtonActions: function () {

      $("#sign-up-form-submit").on("click", function (event) {
        event.preventDefault();
        oThis.onSignUpFormSubmit( event );
      });

    }

  };

  $(document).ready(function () {
    oThis.init({i18n: {}});
  });

})(window);