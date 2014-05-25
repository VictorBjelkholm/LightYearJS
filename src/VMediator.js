var VMediator;

VMediator = (function() {
  var self = this;
  function VMediator() {
  }

  VMediator.channels = {};

  VMediator.install = function(obj) {
    obj.subscribe = VMediator.subscribe;
    obj.publish = VMediator.publish;
  }

  VMediator.subscribe = function(channelName, callback) {
    if (!VMediator.channels[channelName]) {
      VMediator.channels[channelName] = [];
    }
    VMediator.channels[channelName].push({
      context: VMediator,
      callback: callback
    });
  };

  VMediator.publish = function(channelName) {
    if(!VMediator.channels[channelName]) {
      throw new Error('No channel like that');
    }
    channel = VMediator.channels[channelName];
    args = Array.prototype.slice.call(arguments, 1);
    for (var i = 0, l = VMediator.channels[channelName].length; i < l; i ++) {
      var subscription = VMediator.channels[channelName][i];
      subscription.callback.apply(subscription.context, args);
    }
  };
  return VMediator;

})()

root = typeof exports !== "undefined" && exports !== null ? exports : window;
root.VMediator = VMediator;
