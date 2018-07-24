;
(function(window) {
    var partnersNs = ns("ost.partners"),
        oThis;

    partnersNs.companies = oThis = {

        init: function () {
          oThis.buildCategoryToSizeCounts();
          oThis.bindButtonActions();
        },

        categoryToSizeCounts: null,
        buildCategoryToSizeCounts: function () {
          var oThis = this;

          var map = oThis.categoryToSizeCounts = {};
          $('#categorySelect option').each( function ( indx, dCategoryOption ) {
            var categoryValue = dCategoryOption.value;
            var allCount = 0;
            $('#sizeSelect option').each( function ( indx, dSizeOption ) {
              var sizeValue = dSizeOption.value;
              var sizeCount = $(".category-" + categoryValue + ".size-" + sizeValue ).length;
              map[ categoryValue ] = map[ categoryValue ] || {};
              map[ categoryValue ][ sizeValue ] = sizeCount;
            });
          })

        },
        bindButtonActions: function () {
            var oThis = this;

            $('.industry').on('click', function(){
                $('#categorySelect').val($(this).data('category')).trigger('change');
            });

            var defaultSizeValue = "all";
            $('#categorySelect').on('change', function() {
              var categoryValue = $(this).val();
                // Update the size dropdown to select all.
                $('#sizeSelect').val( defaultSizeValue );

                // Disable the size options with no companies.
              $('#sizeSelect option').each( function ( index, dSizeOption ) {
                var sizeValue = dSizeOption.value;
                var jSizeOption = $( dSizeOption );
                if ( oThis.categoryToSizeCounts[ categoryValue ][ sizeValue ] ) {
                  //This is truthy if condition. for 0, it will be false.
                  jSizeOption.prop("disabled", false );
                  jSizeOption.show();
                } else {
                  jSizeOption.prop("disabled", true );
                  jSizeOption.hide();
                }
              });

              // Refrsh the size selectpicker.
              $('#sizeSelect').selectpicker("refresh");

              // Finally, show applicable companies.
              oThis.showHideCompanies(categoryValue, defaultSizeValue );
            });

            $('#sizeSelect').on('change', function(){
                oThis.showHideCompanies($('#categorySelect').val(), $(this).val());
            });


        },

        showHideCompanies: function(category, size) {

          $('.category-all.size-all')
            .removeClass('visible')
            .hide();
          $('.category-'+category+'.size-'+size)
            .addClass('visible')
            .show();

        }

    };

    $( document ).ready(function() {
        oThis.init();
    });


})(window);
