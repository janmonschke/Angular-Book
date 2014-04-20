app.controller('SidebarController', ['$rootScope', '$scope', '$location', 'Collection', 'Slug', 'User',
  function($rootScope, $scope, $location, Collection, Slug, User){
    $scope.newCollectionName = "";

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

    User.bySession().then(function(){
      Collection.allByUsername($rootScope.user.username).then(function(collections){
        $scope.collections = collections.data;
      });  
    });
}]);