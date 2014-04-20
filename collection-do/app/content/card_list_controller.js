app.controller('CardListController', ['$rootScope', '$scope', '$stateParams', 'Item', 'Collection', 'User',
  function($rootScope, $scope, $stateParams, Item, Collection, User){
    $scope.filter = "";

    $scope.create = function(){
      $scope.loading = true;
      Item.createFromUrlInCollection($scope.newUrl, $rootScope.currentCollection._id).then(function(result){
        $scope.newUrl = "";
        $scope.items.unshift(result.data);
        $scope.loading = false;
      });
    };

    $scope.setFilter = function(filter){
      // reset filter, if current filter activated again
      if($scope.filter == filter)
        $scope.filter = "";
      else
        $scope.filter = filter;
    };

    $scope.cardFilter = function(card){
      if($scope.filter == '') return true;
      return (card.embedlyContent.type == $scope.filter);
    };
    
    // load the content of the current collection
    Item.byUsernameAndCollectionSlug($stateParams.username, $stateParams.collectionSlug).then(function(items){
      $scope.items = items.data;
    });

    // load the current collection
    Collection.fromSlugAndUsername($stateParams.collectionSlug, $stateParams.username).then(function(collection){
      $rootScope.currentCollection = collection.data;
    });
}]);