;
(function(window) {
    var partnersNs = ns("ost.partners"),
        oThis;

    partnersNs.companies = oThis = {

        init: function () {
            oThis.bindButtonActions();
        },

        bindButtonActions: function () {

            $('.industry').on('click', function(){
                $('#categorySelect').val($(this).data('category')).trigger('change');
            });

            $('#categorySelect').on('change', function(){
                oThis.showHideCompanies($(this).val(), $('#sizeSelect').val());
            });

            $('#sizeSelect').on('change', function(){
                oThis.showHideCompanies($('#categorySelect').val(), $(this).val());
            });

        },

        showHideCompanies: function(category, size) {

            $('.category-all.size-all').hide();
            $('.category-'+category+'.size-'+size).show();

        }



    };

    $(document).ready(function () {
        oThis.init();
    });

})(window)