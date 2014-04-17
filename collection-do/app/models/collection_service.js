app.factory('Collection', ['$rootScope', '$http', 'BaseModel', function($rootScope, $http, BaseModel){
  return _.extend(_.clone(BaseModel), {

    allByUsername: function(username){
      var url = "/api/user/" + username + "/collection";
      
      return this.hasRequestOrNewRequest(url, 'GET');
    },

    fromId: function(id){
      var url = "/api/collection/" + id;

      return this.hasRequestOrNewRequest(url, 'GET');
    },

    fromSlugAndUsername: function(slug, username){
      var url = "/api/user/" + username + "/collection/" + slug;

      return this.hasRequestOrNewRequest(url, 'GET');
    },

    edit: function(collection){
      var url = "/api/collection/" + collection._id;

      return this.hasRequestOrNewRequest(url, 'PUT', collection);
    },

    create: function(collection){
      var url = "/api/collection";

      return this.hasRequestOrNewRequest(url, 'POST', collection);
    },

    destroy: function(collectionId){
      var url = "/api/collection/" + collectionId;

      return this.hasRequestOrNewRequest(url, 'DELETE');
    }
  });
}]);