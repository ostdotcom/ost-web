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
    getTransactionsApi    : "/mainnet/latest-transactions",
    getStatsApi           : "/stats",
    deferredObjTx : $.Deferred(),
    deferredObjTotTx : $.Deferred(),

    init: function (config) {
      $.extend(oThis,config);

      setInterval(function () {
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
          });
      },5000);

    },

    setTotalTransactions:function(res){
      var totalTransfers = JSON.parse(res).data.stats.totalTokenTransfers
      if(totalTransfers % 1 != 0 || totalTransfers > 1000){
        totalTransfers = oThis.roundOffvalues(totalTransfers);
      }
      oThis.jTotalTransafer.text(totalTransfers);
    },

    buildTransactionMarkup: function(response){
      var source              = $("#transaction-list-template").text(),
          template            = Handlebars.compile(source),
          latestTransactions  = JSON.parse(response).data.latest_transactions,
          html                = '',
          data                = JSON.parse(response).data;

      for(var i =0 ; i < latestTransactions.length; i++){

        var displayData = {};
        displayData["tokenSymbol"] = oThis.getTokenSymbol(latestTransactions[i].token_id, data);
        displayData["tokenValue"]  = oThis.getTokenValue(latestTransactions[i].token_amount_in_wei,latestTransactions[i].token_id,data.tokens);
        displayData["tokenValueUSD"]  =oThis.getTokenValueUSD(latestTransactions[i],data.price_points.OST.USD)
        displayData["txCost"] = oThis.getTxCost(latestTransactions[i].tx_fees_in_wei,data.price_points.OST.USD);
        displayData["txHash"] = latestTransactions[i].transaction_hash;
        displayData["timePassed"] = moment(latestTransactions[i].created_ts *1000).fromNow();
        displayData["txDetailsUrl"] = oThis.getTxDetailsUrl(latestTransactions[i]);
        html += template(displayData);
      }


      $('.transaction-list-data').append(html)
    },

    getTxDetailsUrl : function(transactionData){
      var chainId = transactionData.chain_id,
        txHash  = transactionData.transaction_hash,
        txDetailUrl = oThis.view_url+"/mainnet/transaction/tx-"+chainId+"-"+txHash;
      return txDetailUrl;
    },

    getTokenValueInEth(valueInWei){
      var weiToEthConversionFactor = new BigNumber(10).exponentiatedBy(18);
      var tokenValueInEth = new BigNumber(valueInWei).dividedBy(weiToEthConversionFactor)
      return tokenValueInEth
    },

    getTokenValueUSD: function (latestTransactions,ostToUSDConversionFactor) {
      var valueInWei = latestTransactions.token_amount_in_wei;
      var tokenValueInEth = oThis.getTokenValueInEth(valueInWei);
      //tokenValueInUSD = tokenValueInEth * ostToUSDConversionFactor
      var tokenValueInUSD = new BigNumber(tokenValueInEth).multipliedBy(ostToUSDConversionFactor);
      tokenValueInUSD = oThis.roundOffvalues(tokenValueInUSD);
      return tokenValueInUSD;
    },

    getTxCost : function(txCostInWei,ostToUSDConversionFactor){
      //tcCostInUSD = (txCostInWei / 10^18)* conversion
      var weiToEthConversionFactor = new BigNumber(10).exponentiatedBy(18);
      var txCostInEther = new BigNumber(txCostInWei).dividedBy(weiToEthConversionFactor);
      var txCostInUsd = new BigNumber(txCostInEther).multipliedBy(ostToUSDConversionFactor);
      txCostInUsd = txCostInUsd.decimalPlaces(5)  ;
      return txCostInUsd;
    },

    getTokenSymbol:function(token_id,data){
      var tokenSymbol = data.tokens[token_id];
      return tokenSymbol.symbol;
    },

    getTokenValue:function(valueInWei,tokenId,tokens){
      // valueInEther = (valueInWei/ 10 ^18) * ostToBTConversionFactor
      var weiToEthConversionFactor = new BigNumber(10).exponentiatedBy(18);
      var tokenValue = new BigNumber(valueInWei).dividedBy(weiToEthConversionFactor).multipliedBy(tokens[tokenId].conversion_factor);
        tokenValue = oThis.roundOffvalues(tokenValue);
      return tokenValue;

    },

    roundOffvalues:function(value){
      value = value.integerValue();
      if( value < 100){

        // value = parseFloat(value).toFixed(3)
        value = numeral(value).format("0.00");
        if(value % 1 == 0){
          value = numeral(value).format("0");
        }
      }
      else if(value < 1000){
        // value = parseFloat(value).toFixed(1)
        value = numeral(value).format("0.0")
      }
      else{
        if(value % 1 == 0 ){
          value = numeral(value).format("0a");
        }else{
          value = numeral(value).format("0.0a");
        }

      }

      // for small values that have zeros till 2 decimal places

      return value;

    },
  }
})(window,jQuery);

