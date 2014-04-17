app.controller('AppController', ['$rootScope', '$scope',  'Collection', 'Item', '$http',
  function($rootScope, $scope, Collection, Item, $http){

    $rootScope.currentCollection = null;
    var loadCollectionFromSlugAndUsername = function(slug, username){
      Collection.fromSlugAndUsername(slug, username).then(function(collection){
        $rootScope.currentCollection = collection.data;
      });
    };

    var loadCollectionFromId = function(id){
      Collection.fromId(id).then(function(collection){
        $rootScope.currentCollection = collection.data;
      });
    };

    var showItemsFromSlugAndUsername = function(){
      console.log('TODO: get the actual username')
      loadCollectionFromSlugAndUsername($rootScope.currentCollectionSlug, $rootScope.user.username);
      // load the content of the current collection
      Item.byUsernameAndCollectionSlug($rootScope.user.username, $rootScope.currentCollectionSlug).then(function(items){
        $rootScope.showItems = items.data;
      });
    };

    var showItemsFromId = function(){
      var id = $rootScope.currentCollectionId;
      loadCollectionFromId(id);
      // load the content of the current collection
      Item.byId(id).then(function(items){
        $rootScope.showItems = items.data;
      });
    };

    $rootScope.$watch('currentCollectionSlug', function(newv, oldv){
      if(oldv != newv)
        if($rootScope.currentCollectionSlug == 'inbox'){
          showItemsFromInbox();
        }else{
          showItemsFromSlugAndUsername();
        }
    });

    $rootScope.$watch('currentCollectionId', function(newv, oldv){
      if(oldv != newv)
        showItemsFromId();
    });

    $rootScope.$watch('currentCollection', function(newv, oldv){
      if(oldv != newv)
        document.title = $rootScope.currentCollection.name;
    });

    var initialize = function(){
      return $http({url: '/api/me', method: 'GET'}).then(function(user){
        $rootScope.user = user.data;
      });
    };

    $rootScope.user_collections = [];
    var loadUserCollections = function(){
      return Collection.allByUsername($rootScope.user.username).then(function(collections){
        $rootScope.user_collections = collections.data;
      }).then(function(){
        $rootScope.currentCollectionSlug = $rootScope.user_collections[0].slug;
      });
    };

    var startup = function(){
      if($rootScope.currentCollectionSlug){
        if($rootScope.currentCollectionSlug == 'inbox'){
          showItemsFromInbox();
        }else{
          showItemsFromSlugAndUsername();
        }
      }else{
        showItemsFromId();
      }
    };

    initialize().then(loadUserCollections).then(startup);
}]);