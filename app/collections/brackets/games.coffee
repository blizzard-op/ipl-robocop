Collection = require 'models/base/collection'
Game = require 'models/brackets/game'

module.exports = class Games extends Collection
	model: Game

	comparator: (game)-> game.get 'number'

	next: (winner=null)=>
		firstInProgress = @find (game)-> game.get('status') is 'underway'
		firstReady = @find (game)-> game.get('status') is 'ready'
		# firstInProgress?.set 'status', 'finished'
		# firstReady?.start()
		if winner? and firstInProgress?
			firstInProgress.endWithWinner _.pick(winner.attributes, 'id', 'name')
			# firstInProgress.set 'winner', _.pick(winner.attributes, 'id', 'name')

	firstReady: ()->
		@find (game)-> game.get('status') is 'ready'

	parse: (models)=>
		updated = []
		for i in [0...models.length]
			if @at(i)?
				updated[i] = @at(i)
				updated[i].set models[i]
			else
				updated[i] = new Game(models[i])
		updated