window.app = angular.module('app', ['templates-main', 'ngRoute', 'wu.masonry', 'slugifier']);

app.config(['$httpProvider', function($httpProvider){
  var csrf_meta = angular.element(document.querySelector('meta[name=csrf_token]'));
  $httpProvider.defaults.headers.common['x-csrf-token'] = csrf_meta.attr('content');

  $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}]);


app.run(function($rootScope){
  $rootScope.currentCollectionSlug = 'test-collection';
})