app.controller('CardController', ['$rootScope', '$scope', 'Item',
  function($rootScope, $scope, Item){

    $scope.hasImagePreview = function(){
      var type = $scope.item.embedlyContent.type;
      return (type == 'rich' || type == 'video');
    };

    $scope.hasTextPreview = function(){
      var type = $scope.item.embedlyContent.type;
      return type == 'link';
    };

    $scope.belongsToUser = function(){
      return ($rootScope.currentCollection.owners.indexOf($rootScope.user._id) >= 0);
    };

    $scope.deleteCard = function(){
      // remove it from the visible items
      $rootScope.showItems = _.reject($rootScope.showItems, function(item){
        return item._id === $scope.item._id;
      });

      // make the backend request
      Item.destroy($rootScope.currentCollection._id, $scope.item._id);
    };

}]);