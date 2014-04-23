app.factory('xbmcRemote', function($http, xbmcSettings) {
  var sendAction = function(action, extra) {
    if (extra == null) {
      extra = {};
    }
    var protocol = 'http';
    var settings = xbmcSettings.settings;
    var auth = settings.auth;
    if (auth.length > 0) {
      auth = "" + auth + "@";
    }
    var address = settings.address;
    var port = settings.port;
    var url = "" + protocol + "://" + auth + address + ":" + port + "/jsonrpc";
    var data = {
      jsonrpc: "2.0",
      method: action,
      id: 1
    };
    angular.extend(data, extra);
    console.log("action -> " + action);
    console.log("data -> " + (JSON.stringify(data)));

    var req = $http({method: 'POST', url: url, data: data});
    
    req.success(function(a) {
      console.log('success');
      console.log(JSON.stringify(a));
    });
    req.error(function(a) {
      console.log('error');
      console.log(JSON.stringify(a));
    });
  };

  var up = function() {
    sendAction('Input.Up');
  };

  var right = function() {
    sendAction('Input.Right');
  };
  
  var down = function() {
    sendAction('Input.Down');
  };
  
  var left = function() {
    sendAction('Input.Left');
  };
  
  var select = function() {
    sendAction('Input.Select');
  };
  
  var back = function() {
    sendAction('Input.Back');
  };
  
  var contextMenu = function() {
    sendAction('Input.ShowOSD');
    sendAction('Input.ContextMenu');
  };
  
  var play = function() {
    sendAction('Player.PlayPause', {
      params: [1]
    });
  };
  
  var pause = function() {
    sendAction('Player.PlayPause', {
      params: [1]
    });
  };
  
  var info = function() {
    sendAction('Player.GetActivePlayer');
  };

  return {
    up: up,
    right: right,
    down: down,
    left: left,
    select: select,
    back: back,
    play: play,
    pause: pause,
    info: info,
    contextMenu: contextMenu
  };
});
