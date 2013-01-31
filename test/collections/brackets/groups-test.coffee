Collection = require 'models/base/collection'
Group = require 'models/brackets/group'
Groups = require 'collections/brackets/groups'

describe 'Brackets/group', ->
  beforeEach ->
    @model = new Group()
    @collection = new Groups()

  afterEach ->
    @model.dispose()
    @collection.dispose()
