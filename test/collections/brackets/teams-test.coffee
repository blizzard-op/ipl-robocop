Collection = require 'models/base/collection'
Team = require 'models/brackets/team'
Teams = require 'collections/brackets/teams'

describe 'Brackets/team', ->
  beforeEach ->
    @model = new Team()
    @collection = new Teams()

  afterEach ->
    @model.dispose()
    @collection.dispose()
