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
      var index = _.indexOf($scope.items, $scope.item);
      $scope.items.splice(index, 1);

      // make the backend request
      Item.destroy($rootScope.currentCollection._id, $scope.item._id);
    };

    $scope.baseWidth = 310;
    $scope.height = function(){
      var ratio = $scope.item.embedlyContent.thumbnail_height/ $scope.item.embedlyContent.thumbnail_width;
      return $scope.baseWidth * ratio;
    };

}]);