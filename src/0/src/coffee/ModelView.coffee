module.exports = class ModelView
  constructor: (model, collectionView) ->
    @collectionView = collectionView
    @model = model
    @render()
    @_eventify()

  render: ->
    $el = $("<div>")
    @$btn = $("<button>").text("switch")
    color = if @model.power then @model.color else 'black'
    
    $el.css(
      backgroundColor: color
      width: 100
      height: 100
    )
    
    $el.append(@$btn)
    @el = $el
    
    @
  
  _eventify: ->
    @$btn.on("click", =>
      @model.toggle()
      @collectionView.el.trigger("click:switch", @model)
    )
  
  update: ->
    color = if @model.power then @model.color else "black"
    @el.css(
      backgroundColor: color
    )
    
    @el.find("button").toggleClass("on", @model.power)
    
    
