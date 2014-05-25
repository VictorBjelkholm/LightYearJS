//class VActionRoot
//  @actionsEls: []
//  @actions: []
//  @document
//
//  constructor: (@document) ->
//    @actions = []
//    @actionsEls = @document.querySelectorAll('[action]')
//    for action in @actionsEls
//      actionAttr = action.getAttribute('action')
//      actionInstance = new VAction(action, actionAttr)
//      @actions.push(actionInstance)
//
//root = exports ? window
//root.VActionRoot = VActionRoot
var VActionRoot;

VActionRoot = (function() {
  VActionRoot.actionsEls = [];

  VActionRoot.actions = [];

  VActionRoot.document;

  function VActionRoot(document) {
    var action, actionAttr, actionInstance, _i, _len, _ref;
    this.document = document;
    this.actions = [];
    this.actionsEls = this.document.querySelectorAll('[action]');
    _ref = this.actionsEls;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      action = _ref[_i];
      actionAttr = action.getAttribute('action');
      actionInstance = new VAction(action, actionAttr);
      this.actions.push(actionInstance);
    }
  }

  return VActionRoot;

})();

root = typeof exports !== "undefined" && exports !== null ? exports : window;

root.VActionRoot = VActionRoot;

