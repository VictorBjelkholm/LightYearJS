assert = require('assert');
jsdom = require('jsdom');
var VActionRoot = require('../../src/VActionRoot').VActionRoot;

html = "<input type='input' action='click:textboxes:click'></input>" +
       "<button action='click:namespaceOne:click,click:namespaceTwo:click'>Click Me</button>'";

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
    assert.equal(3, sut.actions.length, "There was not three actions");
  });
  it('should create a corresponding action instance for every element', function() {
    actionOne = sut.actions[0];
    actionTwo = sut.actions[1];
    actionThree = sut.actions[2];
    assert.equal('click:textboxes:click', actionOne.fullName, 'Action One');
    assert.equal('click:namespaceOne:click', actionTwo.fullName, 'Action Two');
    assert.equal('click:namespaceTwo:click', actionThree.fullName, 'Action Three');
  });
});
