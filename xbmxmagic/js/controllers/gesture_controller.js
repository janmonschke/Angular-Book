app.controller('GestureController', ['$scope', 'xbmcRemote', function($scope, xbmcRemote){
  // select the letter for animation
  var letter = angular.element('#letter');

  // remove the glow class when animation is over
  letter[0].addEventListener('webkitAnimationEnd', function() {
    letter.removeClass('glow');
    return console.log('animationend');
  });

  // prepare elements
  var gestureTarget = angular.element('#gesture-target');
  var hammeredGestureTarget = Hammer(gestureTarget);

  // assign gesture events
  hammeredGestureTarget.on('swipeup', function() {
    letter.removeClass();
    letter.addClass('glow icon-up');
    xbmcRemote.up();
  });

  hammeredGestureTarget.on('swiperight', function() {
    letter.removeClass();
    letter.addClass('glow icon-right');
    xbmcRemote.right();
  });

  hammeredGestureTarget.on('swipedown', function() {
    letter.removeClass();
    letter.addClass('glow icon-down');
    xbmcRemote.down();
  });

  hammeredGestureTarget.on('swipeleft', function() {
    letter.removeClass();
    letter.addClass('glow icon-left');
    xbmcRemote.left();
  });

  gestureTarget.on('click', function() {
    letter.removeClass();
    letter.addClass('glow icon-up-hand');
    xbmcRemote.select();
  });

  hammeredGestureTarget.on('doubletap', function() {
    letter.removeClass();
    letter.addClass('glow icon-ccw');
    xbmcRemote.back();
  });

  hammeredGestureTarget.on('hold', function() {
    letter.removeClass();
    letter.addClass('glow icon-up-circled2');
    xbmcRemote.contextMenu();
  });
};
