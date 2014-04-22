app.factory('xbmcSettings', function($http, $rootScope) {
  var localStorageKey = 'xbmcMagickSettings';
  var settings = {
    address: '',
    port: '8080',
    auth: '',
    password: ''
  };
  var loadedSettings = JSON.parse(localStorage.getItem(localStorageKey));
  loadedSettings || (loadedSettings = {});
  angular.extend(settings, loadedSettings);
  
  var save = function() {
    localStorage.setItem(localStorageKey, JSON.stringify(settings));
  };

  return {
    settings: settings,
    save: save
  };
});
