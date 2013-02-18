Collection = require 'models/base/collection'
Game = require 'models/brackets/game'

module.exports = class Games extends Collection
	model: Game

	comparator: (game)-> game.get 'number'

	next: (winner=null)=>
		firstInProgress = @find (game)-> game.get('status') is 'underway' or (not game.get('starts_at')?)
		firstReady = @firstReady()
		if winner? and firstInProgress?
			firstInProgress.endWithWinner _.pick(winner.attributes, 'id', 'name')
		return firstInProgress

	firstReady: ()->
		@find (game)-> game.get('status') is 'ready' and not game.get('starts_at')?

	parse: (models)=>
		updated = []
		for i in [0...models.length]
			if @at(i)?
				updated[i] = @at(i)
				updated[i].parse models[i]
			else
				updated[i] = new Game(models[i])
		updated