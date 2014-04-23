window.app = angular.module('xbmcmagick', []);

app.config(function($httpProvider){
  $httpProvider.defaults.headers.common.ContentType = 'application/json;charset=UTF-8';
});