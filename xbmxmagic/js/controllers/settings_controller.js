app.controller('SettingsController', ['$scope', 'xbmcSettings', function($scope, xbmcSettings){
  $scope.settings = xbmcSettings.settings;

  $scope.$watch('settings', function(){
    xbmcSettings.save();
  }, true)
}]);