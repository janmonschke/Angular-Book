app.controller('CardListController', ['$rootScope', '$scope', 'Item',
  function($rootScope, $scope, Item){

    $scope.filter = "";

    $scope.create = function(){
      $scope.loading = true;
      Item.createFromUrlInCollection($scope.newUrl, $rootScope.currentCollection._id).then(function(result){
        $scope.newUrl = "";
        $rootScope.showItems.unshift(result.data);
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

}]);