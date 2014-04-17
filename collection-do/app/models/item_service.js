app.factory('Item', ['$rootScope', '$http', 'BaseModel', function($rootScope, $http, BaseModel){
  return _.extend(_.clone(BaseModel), {
    byId: function(id){
      var url = "/api/collection/" + id + "/items";

      return this.hasRequestOrNewRequest(url, 'GET');
    },

    byUsernameAndCollectionSlug: function(username, collectionSlug){
      var url = "/api/user/" + username + "/collection/" + collectionSlug + "/items";
      
      return this.hasRequestOrNewRequest(url, 'GET');
    },

    createFromUrlInCollection: function(contentUrl, collectionId){
      var url = "/api/collection/" + collectionId + "/items";

      return this.hasRequestOrNewRequest(url, 'POST', {url: contentUrl});
    },

    destroy: function(collectionId, itemId){
      var url = "/api/collection/" + collectionId + "/items/" + itemId;

      return this.hasRequestOrNewRequest(url, 'DELETE');
    }
  });
}]);