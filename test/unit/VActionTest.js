assert = require('assert');
VAction = require('../../src/VAction').VAction;

describe('Action tests', function() {
  it('parse the action string to type, namespace, action', function() {
    action = new VAction(null, 'type:namespace:action');
    assert.equal('type', action.type);
    assert.equal('namespace', action.namespace);
    assert.equal('action', action.action);
  });
  it('should accept string value as forth argument', function() {
  	action = new VAction(null, 'type:namespace:action(extra argument)');
  	assert.equal('extra argument', action.argument);
  	assert.equal('action', action.action);
  })
})
