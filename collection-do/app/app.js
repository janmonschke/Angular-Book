window.app = angular.module('app', ['templates-main', 'ngRoute', 'wu.masonry', 'slugifier']);

app.config(['$httpProvider', '$locationProvider', function($httpProvider, $locationProvider){
  $locationProvider.html5Mode(true);
  var csrf_meta = angular.element(document.querySelector('meta[name=csrf_token]'));
  $httpProvider.defaults.headers.common['x-csrf-token'] = csrf_meta.attr('content');

  $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}]);


app.run(function($rootScope, $location, $route){
  // url change without reload-hack ;)
  // https://github.com/angular/angular.js/issues/1699#issuecomment-34841248
  var original = $location.path;
  $location.path = function (path, reload) {
    if (reload === false) {
      var lastRoute = $route.current;
      var un = $rootScope.$on('$locationChangeSuccess', function () {
        $route.current = lastRoute;
        un();
      });
    }

    return original.apply($location, [path]);
  };
  
});