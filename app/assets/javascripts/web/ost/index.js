;
(function (window) {

  var oSTNs = ns("ost"),
      oThis;

  oSTNs.index = oThis = {

    init: function (config) {
      oThis.uberBannerModification(); // This is by intend as this injects smooth-scroll class
      oThis.bindButtonActions();
      oThis.dropDown();
      oThis.initClipPath();

    },

    bindButtonActions: function () {

      $("#subscribe-form-email").on('input',function(){
          $(".checkbox-section").show();
          $('#subscribe-success-wallet-app').hide();
      });
      $("#subscribe-form-submit").on("click", function (event) {
        event.preventDefault();
        oThis.onSubscribe();
      });

      $(".smooth-scroll").on('click', function (event) {
        if (this.hash !== "") {
          event.preventDefault();
          var hash = this.hash,
            ostNavOuterHeight = $('.ost-nav').outerHeight();
          $('html, body').animate({
            scrollTop: $(hash).offset().top - ostNavOuterHeight
          }, 800);
        }
      });
      $('.play-video').click(function(){
        oThis.playVideo($(this));
      });

    },

    playVideo: function(elem){
      var jVideoIframeWrap = elem.find('.video-iframe'),
        dataSrc = jVideoIframeWrap.data('src')
      ;
      elem.find('.video-image').attr( "hidden", '' );
      jVideoIframeWrap.removeAttr( "hidden");
      jVideoIframeWrap.html('<iframe class="embed-responsive-item" src=" ' + dataSrc +
        '"frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
    },

    pauseVideo: function(contextSelector) {
      var embed = $(contextSelector).find('.embed-responsive-item');
      embed.length > 0 && embed[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    },

    uberBannerModification: function(){
      if($('.uber-banner-winners a').length > 0 && $('.uber-banner-winners a').attr('href').indexOf('http') === 0) {
        $('.uber-banner-winners a').attr('target', '_blank');
      } else {
        $('.uber-banner-winners a').addClass('smooth-scroll');
      }
    },

    onSubscribe: function () {
      var oThis     = this,
          jForm     = $('#subscribe-form'),
          jSubmitBtn = $("#subscribe-form-submit"),
          jsonpUrl  = jSubmitBtn.data('jsonp'),
          jEmail    = $("#subscribe-form-email"),
          emailVal   = jEmail.val().trim(),
          emailPattern =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          isFormValid = true,
          platform_marketing = 1,
          popcorn_wallet = 0
      ;

      oThis.resetError( jForm );



      if( !emailVal ) {
        oThis.showError('Email is mandatory', '.email-error');
        isFormValid = false;
      }else if ( !emailPattern.test( emailVal ) ) {
        oThis.showError('Invalid email', '.email-error' );
        isFormValid =  false;
      }


      if ( $("input#subscribe_confirmation").is(":checked")){
        popcorn_wallet = 1;
        platform_marketing = 0;
      }

     if( !isFormValid ){
         return false;
     }

      jSubmitBtn.prop('disabled', true);
      $(".checkbox-section").hide();
      $("#submitting-email-state").show();


      $.ajax({
        url: jsonpUrl,
        jsonp: "callback",
        dataType: "jsonp",
        data: {email: emailVal, 'attributes[platform_marketing]': platform_marketing, 'attributes[popcorn_wallet]': popcorn_wallet },
        method: 'GET',
        success: function (responseJson) {
          $("#submitting-email-state").hide();
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
            oThis.resetForm(jForm);
            $('#subscribe-success-wallet-app').show();
          }

        },
        error: function (error) {
          $("#submitting-email-state").hide();
          console.log("error in sign-up" , error);
          oThis.showError('Something Went Wrong', '.general_error');
        },
        complete: function (response) {
          jSubmitBtn.text('GO').prop('disabled', false);

        }

      });
    },

    showError: function (text, selector) {
      $('#subscribe-form ' + selector).html(text);
      $('#subscribe-form input').addClass('red');
    },

    resetError: function ( jForm ) {
      jForm.find('.error').html("");
    },
    resetForm:function(jForm){
      jForm[0].reset();
    },

      dropDown: function(){
          $('.dropdown-el').click(function(e) {
              e.preventDefault();
              e.stopPropagation();
              $(this).toggleClass('expanded');
              $('#'+$(e.target).attr('for')).prop('checked',true);
              oThis.changeSection();
          });
          $(document).click(function() {
              $('.dropdown-el').removeClass('expanded');
          });

          oThis.changeSection();
      },

      changeSection: function () {
          var mobile_developer_tools = $('.mobile_developer_tools'),
              mobile_btx_exchange = $('.mobile_btx_exchange'),
              mobile_infrastructure = $('.mobile_infrastructure');

          if($('#infrastructure').prop('checked')){
              mobile_developer_tools.hide();
              mobile_btx_exchange.hide();
              mobile_infrastructure.show();
          }
          else if($('#developer-tools').prop('checked') ){
              mobile_infrastructure.hide();
              mobile_btx_exchange.hide();
              mobile_developer_tools.show();
          }
          else if( $('#btx-exchange').prop('checked')   ){
              mobile_infrastructure.hide();
              mobile_developer_tools.hide();
              mobile_btx_exchange.show();
          }
      },
  
    initClipPath : function () {
      if(oThis.isClipPathShapesSupported()){
        $('.hp-section-bg-wrap').addClass('polygon-init');
      }
    },
  
    isClipPathShapesSupported : function () {
  
      var base = 'clipPath',
        prefixes = [ 'webkit', 'moz', 'ms', 'o' ],
        properties = [ base ],
        testElement = document.createElement( 'testelement' ),
        attribute = 'polygon(50% 0%, 0% 100%, 100% 100%)';
  
      // Push the prefixed properties into the array of properties.
      for ( var i = 0, l = prefixes.length; i < l; i++ ) {
        var prefixedProperty = prefixes[i] + base.charAt( 0 ).toUpperCase() + base.slice( 1 ); // remember to capitalize!
        properties.push( prefixedProperty );
      }
  
      // Interate over the properties and see if they pass two tests.
      for ( var i = 0, l = properties.length; i < l; i++ ) {
        var property = properties[i];
    
        // First, they need to even support clip-path (IE <= 11 does not)...
        if ( testElement.style[property] === '' ) {
      
          // Second, we need to see what happens when we try to create a CSS shape...
          testElement.style[property] = attribute;
          if ( testElement.style[property] !== '' ) {
            return true;
          }
        }
      }
  
      return false;
    }

  };

  $(document).ready(function () {
    oThis.init({i18n: {}});
  });

  $(window).on('scroll', function(e){
    var videoEl = $('#partner-video'),
        mobileVideoEl = $('#partner-video-mobile');
    if(videoEl.length>0 && !videoEl.visible(true) ) {
      oThis.pauseVideo(videoEl);
    }

    if(mobileVideoEl.length>0 && !mobileVideoEl.visible(true) ) {
      oThis.pauseVideo(mobileVideoEl);
    }

  });

  $('body').on('click', function(e){
    var videoEl = $('#partner-video'),
      mobileVideoEl = $('#partner-video-mobile');

    oThis.pauseVideo(videoEl);
    oThis.pauseVideo(mobileVideoEl);
  });
  
  



})(window);