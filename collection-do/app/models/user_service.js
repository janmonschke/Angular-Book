app.factory('User', ['$rootScope', '$http', '$q', function($rootScope, $http, $q){
  return {
    currentUser: null,
    currentUserRequest: null,

    bySession: function(){
      // cached user object
      if(this.currentUser){
        return $q.defer().resolve(this.currentUser);
      }else if(this.currentUserRequest){
        return this.currentUserRequest;
      }else{
        this.currentUserRequest = $http({url: '/api/me', method: 'GET'}).then(function(user){
          this.currentUser = $rootScope.user = user.data;
        }.bind(this));
        return this.currentUserRequest;
      }

      return userDef.promise;
    }
  };
}]);