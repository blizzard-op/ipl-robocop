Match = require 'models/brackets/match'
MatchTeam = require 'models/brackets/match-team'
module.exports = class AutoAdvance
	@on: (match, attr)->
		parent = match.get('parent')
		unless parent?
			return null
		slot = parent.whichSlot match
		winner = _.min match.teams(), (team)-> team.get attr
		parent.team(slot, new MatchTeam(winner.attributes))
	@team: (team)->
		parent = match.get('parent')
		unless parent?
			return null
