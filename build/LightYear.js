var VAction;

VAction = (function() {
  VAction.prototype.type = null;
  VAction.prototype.namespace = null;
  VAction.prototype.action = null;
  VAction.prototype.fullName = null;
  VAction.prototype.el = null;

  function VAction(el, fullName) {
    var self = this;
    this.el = el;
    this.fullName = fullName;

    var argArr = this.fullName.split(':');
    if(argArr.length !== 3) {
      throw new Error("You need type:namespace:action to create an action");
    }
    this.type = argArr[0];
    this.namespace = argArr[1];
    this.action = argArr[2];
    var actionArgumentMatch = this.action.match(/\((.*)\)/i);
    if(actionArgumentMatch !== null) {
      this.action = this.action.substr(0, actionArgumentMatch.index);
      this.argument = actionArgumentMatch[1];
    }
    if(this.el !== null) {
      this.el.addEventListener(this.type, function(ev){
        VMediator.publish(self.namespace + ':' + self.action, ev);
      }, false);
    }
  }
  return VAction;
})()

root = typeof exports !== "undefined" && exports !== null ? exports : window;
root.VAction = VAction;

var VActionRoot;

VActionRoot = (function() {
  VActionRoot.actionsEls = [];

  VActionRoot.actions = [];

  VActionRoot.document;

  function VActionRoot(document) {
    var action, actionAttr, actionInstance, _i, _len, _ref;
    this.document = document;
    var self = this;
    this.actions = [];
    this.actionsEls = this.document.querySelectorAll('[action]');
    _ref = this.actionsEls;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      action = _ref[_i];
      actionAttr = action.getAttribute('action');
      if(actionAttr.indexOf(',') !== -1) {
        var manyActions = actionAttr.split(',');
        for (var i = 0; i < manyActions.length; i++) {
          actionAttr = manyActions[i];
          var actionInstance = new VAction(action, actionAttr);
          self.actions.push(actionInstance);
        };
      } else {
        actionInstance = new VAction(action, actionAttr);
        this.actions.push(actionInstance);
      }
    }
  }

  return VActionRoot;

})();

root = typeof exports !== "undefined" && exports !== null ? exports : window;

root.VActionRoot = VActionRoot;


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
    var channel = VMediator.channels[channelName];
    var args = Array.prototype.slice.call(arguments, 1);
    for (var i = 0, l = VMediator.channels[channelName].length; i < l; i ++) {
      var subscription = VMediator.channels[channelName][i];
      subscription.callback.apply(subscription.context, args);
    }
  };
  return VMediator;

})()

root = typeof exports !== "undefined" && exports !== null ? exports : window;
root.VMediator = VMediator;
