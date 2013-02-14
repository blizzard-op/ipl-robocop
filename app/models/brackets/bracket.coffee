Model = require 'models/base/model'
Matches = require 'collections/brackets/matches'
Teams = require 'collections/brackets/teams'
GroupStages = require 'collections/brackets/group-stages'
RandomString = require 'utility/brackets/random-string'

module.exports = class Bracket extends Model
	defaults: ()->
		users: []
		sessionId: null
		title: "Your Title"
		date: moment().format("YYYY-MM-DDTHH:mm:ssZ")
		slug: RandomString.get()
		franchise: ""
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