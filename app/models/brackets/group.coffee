Model = require 'models/base/model'
Matches = require 'collections/brackets/matches'
Teams = require 'collections/brackets/teams'


module.exports = class Group extends Model
	defaults: ()->
		title: "Group"
		teams: new Teams()
		matches: new Matches()
		teamWL: {}
		advanceTo: []
		finished: false
		transform2d:
			x: 0
			y: 0
			paddingX: 0
			paddingY: 0