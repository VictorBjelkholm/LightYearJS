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

