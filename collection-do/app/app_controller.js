app.controller('AppController', ['$rootScope', '$scope',  'Collection', 'Item', '$http',
  function($rootScope, $scope, Collection, Item, $http){

    // load the user's collections
    $rootScope.user_collections = [];
    Collection.allByUsername('thedeftone').then(function(collections){
      $rootScope.user_collections = collections.data;
    });

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
      loadCollectionFromSlugAndUsername($rootScope.currentCollectionSlug, 'thedeftone');
      // load the content of the current collection
      Item.byUsernameAndCollectionSlug('thedeftone', $rootScope.currentCollectionSlug).then(function(items){
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


    var initialize = function(){
      return $http({url: '/api/me', method: 'GET'}).then(function(user){
        $rootScope.user = user.data;
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

    initialize().then(startup);
}]);