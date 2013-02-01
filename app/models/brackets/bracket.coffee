Model = require 'models/base/model'
Matches = require 'collections/brackets/matches'
Teams = require 'collections/brackets/teams'
GroupStages = require 'collections/brackets/group-stages'

module.exports = class Bracket extends Model
	defaults: ()->
		userId: null
		sessionId: null
		title: "Your Title"
		slug: "some-slug"
		kind: "ipl6"
		labels: []
		matches: new Matches()
		groups: new GroupStages()
		teams: new Teams()

	parse:(data)=>
		super data
		console.log @get 'matches'