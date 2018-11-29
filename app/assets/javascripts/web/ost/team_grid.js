(function (window ,  $) {

    var oSTNs = ns("ost"),
        oThis;

    oSTNs.team_grid = oThis = {

        indexSmall: 0,
        $grid: $('.grid'),
        refreshInterval: 4000,
        transitionDuration: 0,
        data: null,
        total_slots: 55,
        extra_slots: null,
        initialMemberGroup: null,
        randomMemberGroup: null,
        isSwaped: false,
        savedImageList: [],
        swapRangeGrids: [{
          min : 0,
          max : 8
        } , {
          min: 10,
          max: 25
        },
        {
          min: 27,
          max: 54 ,
          skip: 29
        }],
        imageSrcPrefix  : "url('",
        imageSrcPostfix : "')",

        initGrid: function( data ) {
          oThis.data = data.team_data;
          oThis.extra_slots = oThis.data.length - oThis.total_slots;
          oThis.initialMemberGroup = oThis.data.slice(0, oThis.total_slots );
          oThis.randomMemberGroup = oThis.data.slice( -1*oThis.extra_slots );
          var randomMemberLength =  oThis.randomMemberGroup &&  oThis.randomMemberGroup.length ,
              startIndex = ( oThis.total_slots - 1 ) - randomMemberLength
          ;
          oThis.plotMembers();
          oThis.$grid.masonry({
              itemSelector: '.grid-item',
              percentPosition: true,
          });
          console.time("swap");
          setInterval(function(){
            if( !oThis.isSwaped ){
              //oThis.swapWithNewData(  oThis.randomMemberGroup );
            }else {
              //oThis.swapWithDomData( );
            }
              oThis.refreshGrid();
          }, oThis.refreshInterval );
        },

        swapWithDomData: function(  ){
          var jGridItems = $('.grid-item'),
              totalVisibleItems = oThis.total_slots - 1  ,
              len = oThis.savedImageList.length ,
              preImageSrc = null ,
              imageList = [];
          for( var cnt = 0 ;  cnt < len  ; cnt++   ) {
            preImageSrc = jGridItems.eq( totalVisibleItems ).data('background-image') ;
            imageList.push( preImageSrc );
            jGridItems.eq( totalVisibleItems ).data('background-image' , oThis.savedImageList[cnt] );
            jGridItems.eq( totalVisibleItems ).css({
              "background-image" :  oThis.imageSrcPrefix +  oThis.savedImageList[cnt] + oThis.imageSrcPostfix
            });
            totalVisibleItems--;
          }
          oThis.savedImageList = imageList;
        },


        swapWithNewData : function( members ){
          if( !members|| members.length == 0  ) return ;
          oThis.isSwaped = !oThis.isSwaped ;
          var jGridItems = $('.grid-item')  ,
              extraItemsLen = members.length ,
              totalVisibleItems = oThis.total_slots - 1  ,
              imageSrc = null, preImageSrc = null
          ;
          for( var cnt = 0 ;  cnt < extraItemsLen  ; cnt++   ){
            preImageSrc = jGridItems.eq( totalVisibleItems ).data('background-image') ;
            oThis.savedImageList.push( preImageSrc );
            imageSrc = members[cnt]['members_list_image'];
            jGridItems.eq( totalVisibleItems ).css({
              "background-image" : oThis.imageSrcPrefix + imageSrc + oThis.imageSrcPostfix
            });
            jGridItems.eq( totalVisibleItems ).data('background-image' , imageSrc ) ;
            totalVisibleItems-- ;
          }
        },

        refreshGrid: function() {
          var jLargeElem = $('.grid-item--large')
          ;
          jLargeElem.each( function ( index  , value ){
            var jBigElem = $(value),
                jBigElemImage = jBigElem.data('background-image'),
                currentGrid = oThis.swapRangeGrids[index],
                min   = currentGrid['min'] ,
                max   = currentGrid['max'] ,
                skip  = currentGrid['skip'],
                randomNumber = oThis.getRandomInt( min , max , skip) ,
                jSmallElem = oThis.getRandomElement( randomNumber ),
                jSmallElemImage  = jSmallElem.data('background-image');

            jBigElem.css({
              "background-image" : oThis.imageSrcPrefix  + jSmallElemImage + oThis.imageSrcPostfix
            });
            jBigElem.data("background-image" , jSmallElemImage );

            jSmallElem.css({
              "background-image" : oThis.imageSrcPrefix  + jBigElemImage + oThis.imageSrcPostfix
            });
            jSmallElem.data("background-image" , jBigElemImage );
          });

          oThis.testGrids();
        },

        testGrids: function(){
          var jGridItems = $('.grid-item') ,
              imageSrc =  {} ;
          ;
          for(var cnt = 0 ;  cnt < jGridItems.length ;  cnt ++ ){
            imageSrc[ jGridItems.eq( cnt ).css('background-image') ] = true ;
          }
          if(Object.keys( imageSrc  ).length  < oThis.total_slots ){
            console.log("Duplicate images found !");
            console.timeEnd("swap");
            console.time("swap");
          }
        },

      getRandomElement: function( index ) {
        var jSmallElem = $('.grid-item');
        return jSmallElem.eq( index );
      },

      getRandomInt: function(min, max , skip ) {
        min = Math.ceil(min);
        max = Math.floor(max);
        var randomNumber =  Math.floor(Math.random() * (max - min + 1)) + min ;
        if( skip && skip == randomNumber  ) {
          return randomNumber + oThis.getRandomInt( 1 , 3 );
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },

      plotMembers: function() {
        for( var i=0; i< oThis.initialMemberGroup.length; i++) {
          var elem = document.createElement('div') ,
              imageSrc = oThis.initialMemberGroup[i]['members_list_image'] ,
              jEl = $(elem)
          ;
          jEl.addClass('grid-item');
          jEl.addClass(oThis.getClass(i));
          jEl.data('background-image' , imageSrc );
          jEl.css({
            "background-image" : oThis.imageSrcPrefix+  imageSrc + oThis.imageSrcPostfix
          });
          oThis.$grid.append(elem);
        }
      },

      getClass: function( index ) {
        if( index==9 || index==26 || index==29){
          return 'grid-item--large';
        } else{
          return '';
        }
      }

    };

})(window ,  jQuery);