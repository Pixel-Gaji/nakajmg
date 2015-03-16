module.exports = class Model
  constructor: (opt) ->
    @power = !!opt.power
    @color = opt.color || "yellow"
  
  turnOn: ->
    @power = true
  
  turnOff: ->
    @power = false
  
  toggle: ->
    if @power then @turnOff() else @turnOn()
