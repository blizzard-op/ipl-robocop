Collection = require 'models/base/collection'
Stream = require 'models/brackets/stream'

module.exports = class Streams extends Collection
	model: Stream
	comparator: (stream)-> stream.get 'name'