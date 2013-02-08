Collection = require 'models/base/collection'
Match = require 'models/brackets/match'

module.exports = class Matches extends Collection
	model: Match

	initialize:(options)->
		super options

	parse:(models)=>
		updated = []
		for match in models
			m = @get(match.id)
			if m?
				m.set _.omit m.parse(match), 'event'
				updated.push m
			else
				newMatch = new Match()
				newMatch.set newMatch.parse(match)
				updated.push newMatch
		for j, match of updated
			if updated[match.get 'parent']?
				updated[j].set 'parent', updated[match.get 'parent']
			else
				match.set 'parent', null
			if updated[match.get('loserDropsTo')?.match]?
				match.set 'loserDropsTo', {match: updated[match.get('loserDropsTo').match], slot: match.get('loserDropsTo').slot}
			else
				match.set 'loserDropsTo', null

			nc = for i, child of match.get 'children'
				if updated[child]?
					updated[child]
				else
					null
			updated[j].set 'children', nc
		updated