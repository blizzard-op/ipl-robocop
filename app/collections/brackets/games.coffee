Collection = require 'models/base/collection'
Game = require 'models/brackets/game'

module.exports = class Games extends Collection
	model: Game
	comparator: (game)-> game.get 'number'