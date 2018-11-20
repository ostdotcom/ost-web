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
        }

    };

    $(document).ready(function () {

        oThis.initGrid();

        setInterval(function(){
            oThis.refreshGrid();
        }, oThis.refreshInterval);

    });

})(window ,  jQuery);