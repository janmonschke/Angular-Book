app.controller('AppController', ['$rootScope', '$scope',  'Collection', 'Item', '$http',
  function($rootScope, $scope, Collection, Item, $http){

    $rootScope.currentTitle = "";
    $rootScope.$watch('currentTitle', function(newv, oldv){
      if(newv != oldv)
        document.title = $rootScope.currentTitle;
    });
}]);