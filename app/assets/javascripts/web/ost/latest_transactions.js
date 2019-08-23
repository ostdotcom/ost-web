;
(function (window ,  $) {
  var ost = ns("ost.transactions"),
      oThis;

  ost.index = oThis = {

    jTotalTransafer       : $("#total-transfers"),
    jLoadingGif           : $("#loading-state"),
    jTabScreen            : $(".transactions-tab-screen"),
    jTransactionsTab      : $(".transactions-tab"),
    jFallBackImage        : $(".fallbackImage"),
    getTransactionsApi    : "/testnet/latest-transactions",
    getStatsApi           : "testnet/stats",
    pollInterval          : 5000,
    pollId                : null,

    init: function (config) {
      $.extend(oThis,config);
      oThis.fetchData();
      oThis.pollId = setInterval(function () {
        oThis.fetchData();
      }, oThis.pollInterval);
    },

    fetchData: function(){
      $.when(
        $.ajax(oThis.getStatsApi),
        $.ajax(oThis.getTransactionsApi)
      ).then(function (d1,d2) {
          oThis.jLoadingGif.hide();
          oThis.jTabScreen.show();
          oThis.buildTransactionMarkup(d2[0]);
          oThis.setTotalTransactions(d1[0]);
        },
        //error callback
        function (err1,err2) {
          oThis.jTransactionsTab.hide();
          oThis.jFallBackImage.show();
          clearInterval(oThis.pollId);
        });
    },

    initializeToolTips:function(){

        $('[data-toggle="tooltip"]').tooltip()

    },
    hideTooltip : function(){
      $('[data-toggle="tooltip"]').tooltip("hide");
    },

    setTotalTransactions:function(res){
      var totalTransfers = JSON.parse(res).data.stats.totalTokenTransfers
      totalTransfers = numeral(totalTransfers).format("0a");
      oThis.jTotalTransafer.text(totalTransfers);
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
            tokenValuesUSDs = oThis.getTokenValueUSD(latestTransactions[i],data.price_points.OST.USD,data.tokens),
            txCosts= oThis.getTxCost(latestTransactions[i].tx_fees_in_wei,data.price_points.OST.USD);

        displayData["tokenSymbol"] = oThis.getTokenSymbol(latestTransactions[i].token_id, data);
        displayData["tokenValue"] = tokenValues.tokenValue;
        displayData["tokenValueRaw"] = tokenValues.tokenValueRaw;
        displayData["tokenValueUSD"] = tokenValuesUSDs.tokenValueInUSD;
        displayData["tokenValueUSDRaw"] = tokenValuesUSDs.tokenValueInUSDRaw
        displayData["txCost"] = txCosts.txCostInUsd;
        displayData["txCostRaw"] = txCosts.txCostInUsdRaw;
        displayData["txHash"] = latestTransactions[i].transaction_hash;
        displayData["timePassed"] = moment(latestTransactions[i].created_ts *1000).fromNow();
        displayData["txDetailsUrl"] = oThis.getTxDetailsUrl(latestTransactions[i]);
        html += template(displayData);
      }
      oThis.hideTooltip();
      $('.transaction-list-data').empty();
      $('.transaction-list-data').append(html)
      oThis.initializeToolTips();
    },

    getTxDetailsUrl : function(transactionData){
      var chainId = transactionData.chain_id,
        txHash  = transactionData.transaction_hash,
        txDetailUrl = oThis.view_url+"testnet/transaction/tx-"+chainId+"-"+txHash;
      return txDetailUrl;
    },

    getTokenValueInEth : function(valueInWei){
      var weiToEthConversionFactor = new BigNumber(10).exponentiatedBy(18),
          tokenValueInEth = new BigNumber(valueInWei).dividedBy(weiToEthConversionFactor);
      return tokenValueInEth
    },

    getTokenValueUSD: function (latestTransactions,ostToUSDConversionFactor,tokens) {
      var ostToBtConversionfactor = tokens[latestTransactions.token_id].conversion_factor;
      var valueInWei = latestTransactions.token_amount_in_wei,
          tokenValueInEth = oThis.getTokenValueInEth(valueInWei),
          tokenValueInUSDRaw = new BigNumber(tokenValueInEth).dividedBy(ostToBtConversionfactor).multipliedBy(ostToUSDConversionFactor),
          tokenValueInUSD = oThis.roundOffvaluesTokenValue(tokenValueInUSDRaw);

      return {
        tokenValueInUSD: tokenValueInUSD,
        tokenValueInUSDRaw: tokenValueInUSDRaw.toFormat()
      };
    },

    getTxCost : function(txCostInWei,ostToUSDConversionFactor){
      var weiToEthConversionFactor = new BigNumber(10).exponentiatedBy(18),
          txCostInEther = new BigNumber(txCostInWei).dividedBy(weiToEthConversionFactor),
          txCostInUsdRaw = new BigNumber(txCostInEther).multipliedBy(ostToUSDConversionFactor),
          txCostInUsd = txCostInUsdRaw.decimalPlaces(5),
          txCostInUsdRaw = txCostInUsdRaw;

      return {
        txCostInUsd: txCostInUsd,
        txCostInUsdRaw: txCostInUsdRaw.decimalPlaces(20).toFormat()
      };
    },

    getTokenSymbol:function(token_id,data){
      var tokenSymbol = data.tokens[token_id];
      return tokenSymbol.symbol;
    },

    getTokenValue:function(valueInWei){
      var weiToEthConversionFactor = new BigNumber(10).exponentiatedBy(18),
          tokenValueRaw = new BigNumber(valueInWei).dividedBy(weiToEthConversionFactor),
          tokenValue = oThis.roundOffvaluesTokenValue(tokenValueRaw);

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

    }
  }
})(window,jQuery);

