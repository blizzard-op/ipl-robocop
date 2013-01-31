Collection = require 'models/base/collection'
Match = require 'models/brackets/match'

module.exports = class Matches extends Collection
  model: Match
