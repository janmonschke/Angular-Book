app.controller('CommandsController', ['$scope', 'xbmcRemote', function($scope, xbmcRemote){
  $scope.play = xbmcRemote.play;
  
  $scope.pause = xbmcRemote.pause;
  
  $scope.info = xbmcRemote.info;
}]);
