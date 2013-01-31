Model = require 'models/base/model'
Match = require 'models/brackets/match'
Huffman = require 'utility/huffman-code'
MatchFromParent = require 'utility/match-from-parent'
RootFinder = require 'utility/brackets/root-finder'
Rounds = require 'utility/brackets/rounds-from-match-list'
FlattenTree = require 'utility/brackets/flatten-tree'
Advance = require 'utility/auto-advance'

module.exports = class DoubleElimGenerator extends Model
	generate:(numPlayers, winnersMatches)=>
		properPlayers = Math.pow(2, Math.ceil(Math.log(numPlayers) / Math.log(2)))
		winnerRounds = Math.log(properPlayers) / Math.log(2)
		root = RootFinder.find(winnersMatches)
		loserRounds = []

		# seed the first round
		loserRounds[0] = []
		loserRounds[0][0] = new Match({hasLoserSlot: true})
		loserRounds[0][0].teams([Huffman.followString(Huffman.losersInRound(1, properPlayers)[0], root)])

		# drop losers into rounds
		for i in [1...winnerRounds]
			lr = Huffman.losersInRound(i + 1, properPlayers)
			unless loserRounds[i]?
				loserRounds[i] = []
			if i < winnerRounds - 1
				for j, m of lr
					loserRounds[i].push MatchFromParent.make(loserRounds[i - 1][parseInt(parseInt(j) / 2)], {hasLoserSlot: true})
					teams = [Huffman.followString(m, root)]
					loserRounds[i][j].teams(teams)
			else
				for j, m of lr when parseInt(j) % 2 is 0
					match = parseInt(j)
					loserRounds[i].push MatchFromParent.make(loserRounds[i - 1][match / 2],{hasLoserSlot: true})
					loserRounds[i][match / 2].teams([Huffman.followString(lr[match + 1], root), Huffman.followString(lr[match], root)])

		# go through and link / double up
		for i in [0...loserRounds.length]
			if loserRounds[i + 1]?.length > loserRounds[i].length
				for j in [0...loserRounds[i].length]
					MatchFromParent.insert(loserRounds[i][j])
		flat = FlattenTree.flatten(loserRounds[0][0])
		loserRounds = Rounds.convert loserRounds[0][0]
		@advanceAll loserRounds
		@setupLoserDrops winnersMatches, loserRounds
		flat

	advanceAll: (loserRounds)->
		for i in [0...loserRounds.length]
			for j in [0...loserRounds[i].length]
				Advance.on(loserRounds[i][j], 'seed')

	setupLoserDrops: (winnersMatches, loserRounds)->
		for match in winnersMatches
			lSeed = match.team(1).get 'seed'
			match.set 'loserDropsTo', @findFirst(lSeed, loserRounds)

	findFirst: (seed, loserRounds)->
		for i in [0...loserRounds.length]
			for j in [0...loserRounds[i].length]
				if _.find(loserRounds[i][j].teams(), (team)-> team.get('seed') is seed)?
					return loserRounds[i][j]