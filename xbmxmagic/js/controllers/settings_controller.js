app.controller('SettingsController', ['$scope', 'xbmcSettings', function($scope, xbmcSettings){
  $scope.settings = xbmcSettings.settings;

  $scope.save = function(){
    xbmcSettings.save();
  };
}]);