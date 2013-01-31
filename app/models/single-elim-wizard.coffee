Model = require 'models/base/model'
Bracket = require 'models/brackets/bracket'
Match = require 'models/brackets/match'
MatchTeam = require 'models/brackets/match-team'

module.exports = class SingleElimWizard extends Model
	defaults:
		matchBuffer: []
		numPlayers: 16
		type: "single-elim"
	# makes a list of seeded, linked matches
	generate: ()=>
		@set 'matchBuffer', []
		properPlayers = Math.pow(2, Math.ceil(Math.log(@get 'numPlayers') / Math.log(2)))
		numRounds = Math.ceil(Math.log(@get 'numPlayers') / Math.log(2))

		seedMatch = new Match()
		seedMatch.teams([
			new MatchTeam
				seed: 1
			new MatchTeam
				seed: 2
		])

		@get('matchBuffer').push seedMatch
		@makeMatches(seedMatch, 0, numRounds-1)

		_.each @get('matchBuffer'), (match)->
			_.each match.teams(), (team)->
				team.set 'name', ""
		@get 'matchBuffer'

	#returns a list of players
	makeTeams: ()=>
		teams = []
		for i in [0...@get 'numPlayers']
			teams[i] = new MatchTeam
				seed: i + 1
				name: (i + 1) + " TBD"

	# recursive funcion to make child matches out to a certain depth
	makeMatches: (thisMatch, depth, maxDepth)=>
		matchBuffer = @get 'matchBuffer'
		thisTeams = thisMatch.teams()
		children = []
		for i in [0...thisTeams.length]
			if depth < maxDepth
				children[i] = new Match {
					parent: thisMatch
				}
				children[i].teams([
						new MatchTeam
							seed: thisTeams[i].get 'seed'
						new MatchTeam
							seed: (Math.pow(2, depth) * 4) - (thisTeams[i].get('seed') - 1)
						])
				matchBuffer.push children[i]
				@makeMatches(children[i], depth+1, maxDepth)
		thisMatch.set 'children', children