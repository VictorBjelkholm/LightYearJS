class VAction
  type: null
  namespace: null
  action: null
  fullName: null
  el: null

  constructor: (@el, @fullName) ->
    argArr = @fullName.split(':');
    if argArr.length != 3
        throw new Error("You need type:namespace:action to create an action!")
    @type = argArr[0];
    @namespace = argArr[1];
    @action = argArr[2];
    #$(@el).on @type, (ev) =>
     #Mediator.Publish(@namespace + ':' + @action, ev);

root = exports ? window
root.VAction = VAction
