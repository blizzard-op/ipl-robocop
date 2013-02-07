Collection = require 'models/base/collection'
Game = require 'models/brackets/game'

module.exports = class Games extends Collection
	model: Game

	comparator: (game)-> game.get 'number'

	next: (winner=null)=>
		firstInProgress = @find (game)-> game.get('status') is 'in progress'
		firstReady = @find (game)-> game.get('status') is 'ready'
		firstInProgress?.set 'status', 'finished'
		firstReady?.set 'status', 'in progress'
		if winner?
			firstInProgress.set 'winner', _.pick(winner.attributes, 'id', 'name')

	parse: (models)=>
		updated = []
		for i in [0...models.length]
			if @at(i)?
				updated[i] = @at(i)
				updated[i].set models[i]
			else
				updated[i] = new Game(models[i])
		updated