Collection = require 'models/base/collection'
GroupStage = require 'models/brackets/group-stage'
GroupStages = require 'collections/brackets/group-stages'

describe 'Brackets/group', ->
  beforeEach ->
    @model = new GroupStage()
    @collection = new GroupStages()

  afterEach ->
    @model.dispose()
    @collection.dispose()
