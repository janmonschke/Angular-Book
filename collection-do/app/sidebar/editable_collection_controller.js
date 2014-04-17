app.controller('EditableCollectionController', ['$rootScope', '$scope', 'Collection',
  function($rootScope, $scope, Collection){
    $scope.editing = false;
    $scope.saving = false;

    $scope.saveNewName = function(){
      $scope.saving = true;
      Collection.edit($scope.collection).then(function(collection){
        $scope.saving = false;
        $scope.editing = false;
      });
    };

    $scope.deleteCollection = function(){
      $scope.saving = true;
      Collection.destroy($scope.collection._id).then(function(){
        var collection = _.findWhere($rootScope.user_collections, { _id: $scope.collection._id });
        $rootScope.user_collections = _.without($rootScope.user_collections, collection);
      });
    };
}]);