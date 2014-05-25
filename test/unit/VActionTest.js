assert = require('assert');
VAction = require('../../src/VAction').VAction;

describe('Action tests', function() {
  it('parse the action string to type, namespace, action', function() {
    action = new VAction(null, 'type:namespace:action');
    assert.equal('type', action.type);
    assert.equal('namespace', action.namespace);
    assert.equal('action', action.action);
  })
})
