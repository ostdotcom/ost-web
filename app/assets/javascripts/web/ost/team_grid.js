(function (window ,  $) {

    var oSTNs = ns("ost"),
        oThis;

    oSTNs.team_grid = oThis = {

        indexSmall: 0,
        $grid: $('.grid'),
        refreshInterval: 3000,
        transitionDuration: 0,

        initGrid: function() {
            oThis.$grid.packery({
                itemSelector: '.grid-item',
                percentPosition: true,
                transitionDuration: oThis.transitionDuration
            });
            oThis.backgroundImageLazyLoad();

        },

        refreshGrid: function() {
            // jq elements not cached as this is dynamic polling
            oThis.indexSmall = $('.grid-item').not('.grid-item--large, .grid-item--edge').length;
            $('.grid-item').removeClass('grid-item--large')
            $('.grid-item').not('.grid-item--large, .grid-item--edge').eq(oThis.getRandEq()).addClass('grid-item--large');
            $('.grid-item').not('.grid-item--large, .grid-item--edge').eq(oThis.getRandEq()).addClass('grid-item--large');
            $('.grid-item').not('.grid-item--large, .grid-item--edge').eq(oThis.getRandEq()).addClass('grid-item--large');
            oThis.$grid.packery('layout');
        },

        getRandEq: function() {
            return (Math.floor(Math.random() * oThis.indexSmall) + 1) - 1;
        },

        backgroundImageLazyLoad : function () {
            var jEls = $('.grid-item[data-background-image]') ,
                len = jEls.length , item ,  url
            ;

            for( var cnt = 0 ;  cnt < len ; cnt++ ){
                item = jEls.eq( cnt ) ;
                url  = item.data('background-image');
                jEls.eq( cnt ).css({
                    "background-image" : "url('" +  url + "')"
                })
            }
        }

    };

    $(document).ready(function () {

        oThis.initGrid();

        setInterval(function(){
            oThis.refreshGrid();
        }, oThis.refreshInterval);

    });

})(window ,  jQuery);