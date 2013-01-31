Collection = require 'models/base/collection'
Tool = require 'models/tool'
Tools = require 'collections/tools'

describe 'Tools', ->
  beforeEach ->
    @model = new Tool()
    @collection = new Tools()

  afterEach ->
    @model.dispose()
    @collection.dispose()
