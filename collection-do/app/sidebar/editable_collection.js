app.directive('editableCollection', function() {
  return {
    restrict: 'A',
    templateUrl: 'sidebar-editable-collection.html',
    controller: 'EditableCollectionController',
    link: function(scope, element){
      var input = element.find('input');

      scope.$watch('editing', function(newv, oldv){
        if(newv != oldv){
          if(scope.editing === true){
            // focus the input when edit mode starts
            input[0].focus();
            // save the previous name so it can be restored
            scope.previousCollectionName = scope.collection.name;            
          }
        }
      });

      scope.resetState = function(){
        scope.editing = false;
        scope.collection.name = scope.previousCollectionName;
      };

      scope.keyDown = function(event){
        // end edit mode on ESC
        if(event.keyCode === 27){
          scope.resetState();  
        }
      };


    }
  }
});