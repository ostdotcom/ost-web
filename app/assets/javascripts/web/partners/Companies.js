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

            // $('#infoModal').on('show.bs.modal', function (e) {
            //
            //         var index = $(e.relatedTarget).data('partner_companies_index');
            //
            //         oThis.showCompanyDetails(index,oThis.config.partner_companies);
            //
            //
            //     // for (var i = 0 ; i < oThis.config.partner_companies[index].founders.length ; i++)
            //     // {
            //     //     $("#trial").append('<p>' + oThis.config.partner_companies[index].founders[i].name+ '</p>');
            //     //     $("#trial").append('<p>' + oThis.config.partner_companies[index].founders[i].title+ '</p>');
            //     // }
            //
            //
            //
            // });



        },

        showHideCompanies: function(category, size) {

            $('.category-all.size-all').hide();
            $('.category-'+category+'.size-'+size).show();

        },

        showCompanyDetails(index,data){


            console.log(index);
            console.log(data[index].description_html);


            $("#description").html(data[index].description_html);
            $("#infoModal .founders_div").text('');

            for (var i = 0 ; i < data[index].founders.length ; i++)
                {
                    var str = '<div class="mt-2"><span>';
                    //$(".founders_div").append('<div class="mt-2"><span >' + data[index].founders[i].name+ '</span><br>' );
                    //$(".founders_div").append('<span >' + data[index].founders[i].title+ '</span><br> </div>');
                }

            $(".location_div").text(data[index].location);
            $(".industry").text(data[index].categories.join(", "));
            $(".size").text(data[index].size);
            $(".website").html('<a href ="' + data[index].website + '">' + data[index].website +'</a>');

            for (var i = 0 ; i < data[index].social.length ; i++)
            {
                $(".social").append('<a class="mr-2" href " ' + data[index].social[i].link + '">' + data[index].social[i].name+ '</a>' );
            }




        }


    };

})(window)