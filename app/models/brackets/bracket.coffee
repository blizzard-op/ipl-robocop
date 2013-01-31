Model = require 'models/base/model'
Matches = require 'collections/brackets/matches'
Teams = require 'collections/brackets/teams'
Groups = require 'collections/brackets/groups'

module.exports = class Bracket extends Model
	defaults: ()->
		userId: null
		sessionId: null
		title: "Your Title"
		slug: "some-slug"
		kind: "ipl6"
		labels: []
		matches: new Matches()
		groups: new Groups()
		teams: new Teams()

	hasLoserBracket: ()->
		for match in matches
			if match.get('loserDropsTo')? or match.get('hasLoserSlot')?
				return true
		return false