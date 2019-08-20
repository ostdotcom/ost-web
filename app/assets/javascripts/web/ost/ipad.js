;
(function (window ,  $) {
  var ost = ns("ost.transactions"),
      oThis;

  ost.ipad = oThis = {

    jTotalTransafer       : $("#total-transfers"),
    getTransactionsApi    : "/api/latest-transactions",
    getStatsApi           : "/api/latest-transactions",

    init: function (config) {
      $.extend(oThis,config);
      oThis.getTransactionData();
      oThis.getTotalTransactions();
    },

    getTotalTransactions:function(){
      // $.ajax({
      //   url:oThis.getStatsApi,
      //   success : function (res) {
      //
      //   },
      //   error : function (err) {
      //     console.log("error total transfers",err);
      //   }
      // });
      res={
              "total_token_transfers" : 100000
            }
            oThis.setTotalTransactions(res);
    },

    setTotalTransactions:function(stats){
      var totalTransfers = stats.total_token_transfers
      totalTransfers = oThis.roundOffvalues(totalTransfers)
      oThis.jTotalTransafer.text(totalTransfers);
    },

    getTransactionData:function(){
      // $.ajax({
      //   url:oThis.getTransactionsApi,
      //   success :function (res) {
          var apiResponse = {
            "result_type": "latest_transactions",
            "latest_transactions": [
              {
                "transaction_hash": "0x8b484fa1931cc7a4ba9c762f66cb0f6a35f47019e3ef81e03181535e173e75dc",
                "chain_id": 197,
                "token_amount_in_wei": "1847204748304749370009000000",
                "token_id": 1090,
                "transaction_fees_in_wei": "184720474830474937",
                "created_ts": "1566225394"
              },
              {
                "transaction_hash": "0x8b484fa1931cc7a4ba9c762f66cb0f6a35f47019e3ef81e03181535e173e75dc1",
                "chain_id": 197,
                "token_amount_in_wei": "1847204748304749370",
                "token_id": 1090,
                "transaction_fees_in_wei": "1847204748304749370",
                "created_ts": "1563546994"
              },
              {
                "transaction_hash": "0x8b484fa1931cc7a4ba9c762f66cb0f6a35f47019e3ef81e03181535e173e75dc",
                "chain_id": 197,
                "token_amount_in_wei": "18472047483047493700",
                "token_id": 1090,
                "transaction_fees_in_wei": "18472047483047493700",
                "created_ts": "1566052594"
              },
              {
                "transaction_hash": "0x8b484fa1931cc7a4ba9c762f66cb0f6a35f47019e3ef81e03181535e173e75dc",
                "chain_id": 197,
                "token_amount_in_wei": "184720474830474937000",
                "token_id": 1090,
                "transaction_fees_in_wei": "184720474830474937000",
                "created_ts": "1568730994"
              },
              {
                "transaction_hash": "0x8b484fa1931cc7a4ba9c762f66cb0f6a35f47019e3ef81e03181535e173e75dc",
                "chain_id": 197,
                "token_amount_in_wei": "1847204748304749370000",
                "token_id": 1090,
                "transaction_fees_in_wei": "1847204748304749370000",
                "created_ts": "1578090965"
              },
              {
                "transaction_hash": "0x8b484fa1931cc7a4ba9c762f66cb0f6a35f47019e3ef81e03181535e173e75dc1",
                "chain_id": 197,
                "token_amount_in_wei": "18472047483047493700000",
                "token_id": 1090,
                "transaction_fees_in_wei": "18472047483047493700000",
                "created_ts": "1578090965"
              },
              {
                "transaction_hash": "0x8b484fa1931cc7a4ba9c762f66cb0f6a35f47019e3ef81e03181535e173e75dc",
                "chain_id": 197,
                "token_amount_in_wei": "0",
                "token_id": 1090,
                "transaction_fees_in_wei": "184720474830474937000000",
                "created_ts": "1578090965"
              },
              {
                "transaction_hash": "0x8b484fa1931cc7a4ba9c762f66cb0f6a35f47019e3ef81e03181535e173e75dc",
                "chain_id": 197,
                "token_amount_in_wei": "184720474830474937",
                "token_id": 1090,
                "transaction_fees_in_wei": "18472047483047493700000",
                "created_ts": "1565939845"
              }
            ],
            "tokens":{
              "1090": {
                "name": "Pepo Coin",
                "symbol": "Pepo",
                "conversion_factor": "2.5",
                "status": "deploymentCompleted"
              }
            },
            "price_points": {
              "PAX":{
                "USD":"1.007386"
              },
              "OST":{
                "USD":"0.02206"
              }
            }
          }
          oThis.buildTransactionMarkup(apiResponse)
        // },
        // error : function (err) {
        //   $(".transactions-tab").hide();
        //   $(".fallbackImage").show();

        // }
      // });
    },

    buildTransactionMarkup: function(data){
      var source              = $("#transaction-list-template").text(),
          template            = Handlebars.compile(source),
          latestTransactions  = data[data["result_type"]],
          html                = '';

      for(var i =0 ; i < latestTransactions.length; i++){

        var displayData = {};
        displayData["tokenSymbol"] = oThis.getTokenSymbol(latestTransactions[i].token_id, data);
        displayData["tokenValue"]  = oThis.getTokenValue(latestTransactions[i].token_amount_in_wei,latestTransactions[i].token_id,data.tokens);
        displayData["tokenValueUSD"]  =oThis.getTokenValueUSD(latestTransactions[i],data.price_points.OST.USD)
        displayData["txCost"] = oThis.getTxCost(latestTransactions[i].transaction_fees_in_wei,data.price_points.OST.USD);
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
        txDetailUrl = oThis.view_url+"mainnet/transaction/tx-"+chainId+"-"+txHash;
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
      if(tokenValueInUSD % 1 != 0 || tokenValueInUSD > 1000){
        tokenValueInUSD = oThis.roundOffvalues(tokenValueInUSD);
      }
      return tokenValueInUSD;
    },

    getTxCost : function(txCostInWei,ostToUSDConversionFactor){
      //tcCostInUSD = (txCostInWei / 10^18)* conversion
      var weiToEthConversionFactor = new BigNumber(10).exponentiatedBy(18);
      var txCostInEther = new BigNumber(txCostInWei).dividedBy(weiToEthConversionFactor);
      var txCostInUsd = new BigNumber(txCostInEther).multipliedBy(ostToUSDConversionFactor);
      txCostInUsd = txCostInUsd.toFixed(5);
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
      return oThis.roundOffvalues(tokenValue);

    },

    // convertToKFormat: function(value){
    //   var displayVal = parseFloat(value).toFixed()
    //   while(displayVal >= 1000){
    //     var remainder = displayVal % 10;
    //     var quotient  = parseInt(displayVal /10);
    //     if (remainder >= 5  ){
    //       quotient = quotient+1;
    //     }
    //     displayVal = quotient
    //   }
    //   return displayVal
    // },

    roundOffvalues:function(value){
      if( value < 1){
        // value = parseFloat(value).toFixed(3)
        value = numeral(value).format("0.000")
      }
      else if( value < 100){
        // value = parseFloat(value).toFixed(2)
        value = numeral(value).format("0.00")
      }
      else if(value < 1000){
        // value = parseFloat(value).toFixed(1)
        value = numeral(value).format("0.0")
      }
      else{
        value = numeral(value).format("0.0a")
      }
      return value;

    },
  }
})(window,jQuery);

