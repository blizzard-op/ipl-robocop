Collection = require 'models/base/collection'
Game = require 'models/brackets/game'
Games = require 'collections/brackets/games'

describe 'Brackets/game', ->
  beforeEach ->
    @model = new Game()
    @collection = new Games()

  afterEach ->
    @model.dispose()
    @collection.dispose()
