angular.module('finApp.services', [])

.factory('stockDataService', function($q, $http) {

  var getDetailsData  = function (ticker) {
    var deferred = $q.defer(),
      url="http://query.yahooapis.com/v1/public/yql?format=json&env=store://datatables.org/alltableswithkeys&q=select * from yahoo.finance.quote where symbol in ('"+ ticker +"')";

    $http.get(url)
      .success(function(json){
        var jsonData = json.query.results.quote;
        deferred.resolve(jsonData);

      })
      .error(function(error){
        console.log("details data error: " + error);
        deferred.reject();

      });

    return deferred.promise;
  };

	var getPriceData = function(ticker){
		var deferred = $q.defer(),
      url="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22"+ticker+"%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";

		$http.get(url)
	      .success(function(json){
	      	var jsonData = json.query.results.quote.PriceSales;
	        deferred.resolve(jsonData);

	      })
	      .error(function(error){
	      	console.log("price data error: " + error);
	      	deferred.reject();

	      });

	    return deferred.promise;
	};


	return {
		getPriceData: getPriceData,
    getDetailsData: getDetailsData
	};

})

;
