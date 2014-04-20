window.app = angular.module('app', ['templates-main', 'ui.router', 'wu.masonry', 'slugifier']);

app.config(['$httpProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider',
  function($httpProvider, $locationProvider, $stateProvider, $urlRouterProvider){

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('collection-content', {
      url: "/:username/:collectionSlug",
      views: {
        "content": {
          templateUrl: "cardlist.html",
          controller: "CardListController"
        },
        "sidebar": { template: "" }
      },
      resolve: {
        user_c: function(User){ return User.bySession(); }
      }
    })

  var csrf_meta = angular.element(document.querySelector('meta[name=csrf_token]'));
  $httpProvider.defaults.headers.common['x-csrf-token'] = csrf_meta.attr('content');

  $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}]);