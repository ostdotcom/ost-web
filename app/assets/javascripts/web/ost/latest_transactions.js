;
(function (window ,  $) {
  var ost = ns("ost.transactions"),
      oThis;

  ost.index = oThis = {

    jTotalTransafer       : $("#total-transfers"),
    jTotalTransfersOriginal : $(".total-transfers-original-value"),
    jLoadingGif           : $("#loading-state"),
    jTabScreen            : $(".transaction-list-data-wrapper"),
    jTransactionsTab      : $(".transactions-tab"),
    jFallBackImage        : $(".fallbackImage"),
    jTransactionList      : $(".transaction-list-data"),
    getTransactionsApi    : "/mainnet/latest-transactions",
    getStatsApi           : "/mainnet/stats",
    pollInterval          : 5000,
    pollId                : null,
    previousTransactionId   : null,

    init: function (config) {
      $.extend(oThis,config);
      oThis.fetchTotaltransfers();
      oThis.fetchTransactionsData();
      oThis.pollId = setInterval(function () {
        oThis.fetchTransactionsData();
      }, oThis.pollInterval);
    },
    fetchTotaltransfers : function(){
      $.ajax({
        url:oThis.getStatsApi,
        success: function (res) {
          if(JSON.parse(res).success){
            oThis.setTotalTransactions(res);
          }
          else{
            oThis.handleErrorState();
          }

        },
        error: function (err) {
          oThis.handleErrorState();
        }
      })
    },
    fetchTransactionsData: function(){
      $.when(
        $.ajax(oThis.getTransactionsApi)
      ).then(function (d1) {
        if(JSON.parse(d1).success){
          oThis.jLoadingGif.hide();
          oThis.jTabScreen.show();
          if(oThis.checkForNewData(d1)){
            oThis.buildTransactionMarkup(d1);
          }
        }else {
          oThis.handleErrorState();
        }

        },
        //error callback
        function (err1) {
          oThis.handleErrorState();
        });
    },
    checkForNewData: function(response){
      var firstTransaction         = JSON.parse(response).data.latest_transactions[0],
          firstTransactionId = firstTransaction.id;
      if(oThis.previousTransactionId != firstTransactionId){
        oThis.previousTransactionId = firstTransactionId;
        return true;
      }
      else  {
        return false;
      }
    },
    handleErrorState: function(){
      oThis.jTransactionsTab.removeClass("d-lg-block");
      oThis.jFallBackImage.removeClass("d-lg-none");
      clearInterval(oThis.pollId);
    },

    initializeToolTips:function(){

        $('.transaction-original-value').tooltip()

    },
    hideTooltip : function(){
      $('.transaction-original-value').tooltip("hide");
    },

    setTotalTransactions:function(res){
      var totalTransfers = JSON.parse(res).data.stats.totalTokenTransfers,
          totalTransfersFormatted = numeral(totalTransfers).format("0[.]0a",Math.floor);
      oThis.jTotalTransafer.text(totalTransfersFormatted);
      oThis.jTotalTransfersOriginal.attr('title',totalTransfers);
      oThis.jTotalTransfersOriginal.tooltip();
    },

    buildTransactionMarkup: function(response){
      var source              = $("#transaction-list-template").text(),
          template            = Handlebars.compile(source),
          latestTransactions  = JSON.parse(response).data.latest_transactions,
          html                = '',
          data                = JSON.parse(response).data;

      for(var i =0 ; i < latestTransactions.length; i++){

        var displayData = {},
            tokenValues  = oThis.getTokenValue(latestTransactions[i].token_amount_in_wei,latestTransactions[i].token_id,data.tokens),
            tokenValuesUSDs = oThis.getTokenValueUSD(latestTransactions[i],data.price_points,data.tokens),
            txCosts= oThis.getTxCost(latestTransactions[i].tx_fees_in_wei,data.price_points.OST.USD);

        displayData["firstItemClass"]   = i === 0 ? 'elementToFadeInAndOut' : '';
        displayData["tokenSymbol"]      = oThis.getTokenSymbol(latestTransactions[i].token_id, data);
        displayData["tokenValue"]       = tokenValues.tokenValue;
        displayData["tokenValueRaw"]    = tokenValues.tokenValueRaw;
        displayData["tokenValueUSD"]    = tokenValuesUSDs.tokenValueInUSD;
        displayData["tokenValueUSDRaw"] = tokenValuesUSDs.tokenValueInUSDRaw
        displayData["txCost"]           = txCosts.txCostInUsd;
        displayData["txCostRaw"]        = txCosts.txCostInUsdRaw;
        displayData["txHash"]           = latestTransactions[i].transaction_hash;
        displayData["timePassed"]       = moment(latestTransactions[i].created_ts *1000).fromNow();
        displayData["txDetailsUrl"]     = oThis.getTxDetailsUrl(latestTransactions[i]);
        html += template(displayData);
      }
      oThis.hideTooltip();
      oThis.jTransactionList.html(html);
      oThis.initializeToolTips();
    },

    getTxDetailsUrl : function(transactionData){
      var chainId   = transactionData.chain_id,
        txHash      = transactionData.transaction_hash,
        txDetailUrl = oThis.view_url+"mainnet/transaction/tx-"+chainId+"-"+txHash;
      return txDetailUrl;
    },

    getTokenValueInEth : function(valueInWei, tokenId, tokensEntity){
      var decimals                 = oThis.getDecimal(tokenId , tokensEntity),
          weiToEthConversionFactor = new BigNumber(10).exponentiatedBy(decimals),
          tokenValueInEth          = new BigNumber(valueInWei).dividedBy(weiToEthConversionFactor);
      return tokenValueInEth;
    },

    getTokenValueUSD: function (latestTransactions,pricePoints,tokens) {
      var ostToBtConversionfactor = tokens[latestTransactions.token_id].conversion_factor,
          valueInWei              = latestTransactions.token_amount_in_wei,
          tokenValueInEth         = oThis.getTokenValueInEth(valueInWei,latestTransactions.token_id,tokens),
          decimals                = oThis.getDecimal(latestTransactions.token_id,tokens),
          conversionFactor        = oThis.getBaseCurrencyToUSDConversion(decimals,pricePoints),
          tokenValueInUSDRaw      = new BigNumber(tokenValueInEth).dividedBy(ostToBtConversionfactor).multipliedBy(conversionFactor),
          tokenValueInUSD         = oThis.roundOffvaluesTokenValue(tokenValueInUSDRaw);

      return {
        tokenValueInUSD: tokenValueInUSD,
        tokenValueInUSDRaw: tokenValueInUSDRaw.toFormat()
      };
    },
    getBaseCurrencyToUSDConversion : function(decimals,pricePoints){
      if (decimals == 6){
        return pricePoints.USDC.USD;
      }else{
        return pricePoints.OST.USD;
      }
    },


    getTxCost : function(txCostInWei,ostToUSDConversionFactor){
      var weiToEthConversionFactor = new BigNumber(10).exponentiatedBy(18),
          txCostInEther            = new BigNumber(txCostInWei).dividedBy(weiToEthConversionFactor),
          txCostInUsdRaw           = new BigNumber(txCostInEther).multipliedBy(ostToUSDConversionFactor),
          txCostInUsd              = txCostInUsdRaw.decimalPlaces(6),
          txCostInUsdRaw           = txCostInUsdRaw;

      return {
        txCostInUsd: txCostInUsd,
        txCostInUsdRaw: txCostInUsdRaw.decimalPlaces(20).toFormat()
      };
    },

    getTokenSymbol:function(token_id,data){
      var tokenSymbol = data.tokens[token_id];
      return tokenSymbol.symbol;
    },

    getTokenValue:function( valueInWei, tokenId, tokensEntity){
      var tokenValueRaw = oThis.getTokenValueInEth(valueInWei,tokenId,tokensEntity),
          tokenValue    = oThis.roundOffvaluesTokenValue(tokenValueRaw);

      return {
        tokenValue    : tokenValue,
        tokenValueRaw : tokenValueRaw.toFormat()
      };

    },
    roundOffvaluesTokenValue:function(value){

      if( value.isLessThan(1) ){
        return value.decimalPlaces(5).toFormat();
      } else if( value.isLessThan(100) ){
        return value.decimalPlaces(2).toFormat();
      } else if( value.isLessThan(1000) ){
        return value.decimalPlaces(1).toFormat();
      } else if( value.isLessThan(10000) ){
         return value.decimalPlaces(0).toFormat();
      }
      else {
        return numeral(value.decimalPlaces(0).toString()).format("0a");
      }

      return value;

    },
    getDecimal : function (tokenId,tokensEntity) {
      return tokensEntity[tokenId].decimal;
    }
  }
})(window,jQuery);

