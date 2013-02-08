Match = require 'models/brackets/match'
MatchTeam = require 'models/brackets/match-team'

module.exports = class FuseTree
	@fuse: (leftRoot, rightRoot)->
		newHead = new Match
			children: [leftRoot, rightRoot]
		newHead.teams([new MatchTeam({seed:1}), new MatchTeam({seed:2})])
		leftRoot.set 'parent', newHead
		rightRoot.set 'parent', newHead
		newHead