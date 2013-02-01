Collection = require 'models/base/collection'
Stream = require 'models/brackets/stream'
Streams = require 'collections/brackets/streams'

describe 'Stream', ->
  beforeEach ->
    @model = new Stream()
    @collection = new Streams()

  afterEach ->
    @model.dispose()
    @collection.dispose()
