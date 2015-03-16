Model = require "./Model"
module.exports = class Collection
  constructor: (data) ->
    @data = data
    @_initialize()
  
  _initialize: ->
    @models = []
    @data.forEach (data, index) =>
      model = new Model data
      model.id = index
      @models.push model
  
  allOn: ->
    @models.forEach (model) ->
      model.power = true
  
  allOff: ->
    @models.forEach (model) ->
      model.power = false
