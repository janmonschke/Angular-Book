app.controller('SidebarController', ['$rootScope', '$scope', '$location', 'Collection', 'Slug',
  function($rootScope, $scope, $location, Collection, Slug){

    $scope.collections = [];
    $scope.newCollectionName = "";

    $rootScope.$watch('user_collections', function(){
      $scope.collections = $rootScope.user_collections;
    })

    $scope.changeCollection = function(collectionId){
      $rootScope.currentCollectionId = collectionId;
      var collection = _.findWhere($scope.collections, { _id: collectionId});
      $location.path([$rootScope.user.username, collection.slug].join('/'), false);
    };

    $scope.createNewCollection = function(){
      if($scope.newCollectionName.length === 0) return;

      var counter = 0;
      var name = $scope.newCollectionName;
      var slug = Slug.slugify(name);
      while(_.where($scope.collections, { slug: slug }).length > 0){
        slug += ++counter;
      }

      Collection.create({ name: name, slug: slug}).then(function(response){
        $scope.collections.push(response.data);
        $scope.newCollectionName = "";
      })
    };

}]);