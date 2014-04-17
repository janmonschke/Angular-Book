app.factory('BaseModel', ['$rootScope', '$http', function($rootScope, $http){
  return {
    _requests: {},

    hasRequest: function(url, method){
      return (this.getRequest(method+url) != undefined);
    },

    getRequest: function(url, method){
      return this._requests[method+url];
    },

    hasRequestOrNewRequest: function(url, method, data){
      console.log('hasRequest', url, method, (method+url), this._requests[method+url])
      if(this.hasRequest(url, method)){
        return this.getRequest(url, method);
      }else{
        var reqOpts = {method: method, url: url}
        if(data) reqOpts.data = data;
        var req = $http(reqOpts);
        this._requests[method+url] = req;
        req.then(function(){
          delete this._requests[method+url];
        }.bind(this));
        return req;
      }
    }
  };
}]);