class VMediator
  @channels = {}

  @InstallTo: (obj) ->
    obj.Subscribe = @Subscribe;
    obj.Publish = @Publish;

  @Subscribe: (channelName, callback) =>
    if !@channels[channelName]
      @channels[channelName] = []
      @channels[channelName].push(
        context: @
        callback: callback
      )

  @Publish: (channelName) =>
    if !@channels[channelName]
      throw new Error('No channel like that')
    channel = @channels[channelName]
    args = Array.prototype.slice.call(arguments, 1)
    for subscription in channel
      subscription.callback.apply(subscription.context, args)

root = exports ? window
root.VMediator = VMediator
