View = require 'views/base/view'
template = require 'views/templates/group-menu'
Group = require 'models/brackets/group'
IntToAlphabet = require 'utility/int-to-alphabet'
Padding = require 'utility/brackets/bracket-padding'

module.exports = class GroupMenuView extends View
	autoRender: true
	template: template
	container: '#menu-container'
	id: 'group-menu'
	className: 'admin-menu clearfix'
	events:
		'click .btn' : ()-> @addGroup()
		'change .group-players-input' : (ev)->
			ct = $(ev.currentTarget)
			@changeTeams(ct.parents('li').data('group'), parseInt(ct.val()))
			false
		'change .group-matches-input' : (ev)->
			ct = $(ev.currentTarget)
			@changeMatches(ct.parents('li').data('group'), parseInt(ct.val()))
			false
	initialize: (options)->
		super
		@bracket = options.bracket
		@collection = @bracket.get 'groups'

	addGroup: ->
		group = @model.newGroup
			title: "Group " + (@collection.length + 1)
			numTeams: 4
			numMatches: 5
		@collection.add group
		if @collection.length is 1
			Padding.moveMatches(200, 0)
		@render()
		false

	changeTeams: (group, targetNum)->
		teams = group.get('teams')
		teamLength = teams.length
		diff = Math.abs targetNum - teamLength
		for i in [0...diff]
			if targetNum > teamLength
				teams.add
					name: "TEAM X"
			else
				teams.pop()
	
	changeMatches: (group, targetNum)->
		matches = group.get('matches')
		matchLength = matches.length
		diff = Math.abs targetNum - matchLength
		for i in [0...diff]
			if targetNum > matchLength
				matches.add
					bestOf: 1
			else
				matches.pop()

	render: ->
		super
		args = {}
		args.groups = for a in @collection.models
			title: a.get 'title'
			players: a.get('teams').length
			matches: a.get('matches').length
		@$el.html @template(args)
		col = @collection
		@.$('li').each((index) -> $(@).data 'group', col.at( $(@).index() ))
		@