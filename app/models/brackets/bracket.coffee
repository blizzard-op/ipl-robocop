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

	initialize:(options)->
		super options

	parse:(data)=>
		@get('teams').update(data.teams)
		@get('teams').trigger 'sync'
		data.teams = @get('teams')
		matches = @get('matches')
		matches.update(data.matches, {parse:true})
		data.groups = @get 'groups'
		data.matches = matches
		data