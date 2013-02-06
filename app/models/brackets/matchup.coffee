Model = require 'models/base/model'
Game = require 'models/brackets/game'
Games = require 'collections/brackets/games'

module.exports = class Matchup extends Model
	defaults: ()->
		teams: []
		games: new Games()
		best_of: 3

	initialize:(options)->
		super options
		@updateGamesCount()
		@on 'change:best_of', ()=> @updateGamesCount()

	updateGamesCount: ()=>
		bestOf = @get 'best_of'
		games = for i in [0...bestOf]
			new Game
				number: i+1
		@get('games').reset(games)