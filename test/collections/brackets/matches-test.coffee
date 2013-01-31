Collection = require 'models/base/collection'
Match = require 'models/brackets/match'
Matches = require 'collections/brackets/matches'

describe 'Brackets/match', ->
  beforeEach ->
    @model = new Match()
    @collection = new Matches()

  afterEach ->
    @model.dispose()
    @collection.dispose()