assert = require('assert');
jsdom = require('jsdom');
var VActionRoot = require('../../src/VActionRoot').VActionRoot;

html = "<input type='input' action='click:textboxes:click'></input>";

describe('VAction Root Tests', function() {
  document = null;
  sut = null;
  before( function(done) {
    jsdom.env(html, function(errors, window) {
      document = window.document;
      sut = new VActionRoot(document);
      window.close();
      done();
    });
  });

  it('should find all elements with [action] attribute', function() {
    assert.equal(1, sut.actions.length);
  });
  it('should create a corresponding action instance for every element', function() {
    action = sut.actions[0];
    assert.equal('click:textboxes:click', action.fullName);
  });
});
