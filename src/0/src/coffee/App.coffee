Collection = require "./Collection"
CollectionView = require "./CollectionView.coffee"

module.exports = class App
  constructor: (data)->
    @collection = new Collection data
    @collectionView = new CollectionView @collection
  
  mount: (selector) ->
    $(selector).append(@collectionView.el)
