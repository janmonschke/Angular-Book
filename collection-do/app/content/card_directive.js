app.directive('card', function() {
  return {
    restrict: 'A',
    templateUrl: 'card.html',
    controller: 'CardController',
    link: function(scope, element){
      // show the preview of the element
      scope.showPreview = function(){
        if(!scope.hasEmbedContent()) return;
        var contentElement = element[0].querySelector('.item-content');
        contentElement.innerHTML = scope.item.embedlyContent.html;
      }
    }
  }
});