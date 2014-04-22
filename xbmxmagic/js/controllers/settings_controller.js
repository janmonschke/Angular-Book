app.controller('SettingsController', ['$scope', 'xbmcSettings', function($scope, xbmcSettings){
  $scope.settings = xbmcSettings.settings;
  var form = angular.element('#settings-form');
  form.on('change', xbmcSettings.save);
}]);