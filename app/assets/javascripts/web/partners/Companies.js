;
(function(window) {
    var partnersNs = ns("ost.partners"),
        oThis;

    partnersNs.companies = oThis = {

        init: function (config) {
            oThis.config = config;
            oThis.bindButtonActions();
            console.log(oThis.config.partner_companies);
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

            $('#infoModal').on('show.bs.modal', function (e) {

                    var index = $(e.relatedTarget).data('partner_companies_index');

                for (var i = 0 ; i < oThis.config.partner_companies[index].founders.length ; i++)
                {
                    $("#trial").append('<p>' + oThis.config.partner_companies[index].founders[i].name+ '</p>');
                    $("#trial").append('<p>' + oThis.config.partner_companies[index].founders[i].title+ '</p>');
                }



            });



        },

        showHideCompanies: function(category, size) {

            $('.category-all.size-all').hide();
            $('.category-'+category+'.size-'+size).show();

        }


    };

})(window)