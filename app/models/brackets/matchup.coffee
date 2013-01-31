Model = require 'models/base/model'

module.exports = class Matchup extends Model
	defaults: ()->
		teams: []
		games: []
		best_of: 3