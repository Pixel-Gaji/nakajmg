ModelView = require "./ModelView"

module.exports = class CollectionView
  constructor: (collection) ->
    @collection = collection
    @render()
    @_eventify()
    
  render: ->
    @el = $ "<div>"
    @modelViews = []
    @collection.models.forEach (model, index) =>
      modelView = new ModelView model, @
      @modelViews.push(modelView)
      @el.append(modelView.el)
    
    @$turnOnBtn = $("<button>").text("ON")
    @$turnOffBtn = $("<button>").text("OFF")
    
    @el.append(@$turnOnBtn, @$turnOffBtn)
    
    @

  _eventify: ->
    @el.on("click:switch", (e, model) =>
      @update(model.id)
    )
    
    @$turnOnBtn.on("click", =>
      @collection.allOn()
      @updateAll()
    )
    
    @$turnOffBtn.on("click", =>
      @collection.allOff()
      @updateAll()
    )
  
  update: (index) ->
    @modelViews[index].update()

  updateAll: ->
    @modelViews.forEach (modelView) ->
      modelView.update()
