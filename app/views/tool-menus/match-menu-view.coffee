View = require 'views/base/view'
template = require 'views/templates/match-menu'
Matches = require 'collections/brackets/matches'
mediator = require 'mediator'
Streams = require 'collections/brackets/streams'

module.exports = class MatchMenuView extends View
	autoRender: true
	template: template
	container: '#menu-container'
	id: "match-menu"
	className: "admin-menu"
	events:
		'click .btn' : ()-> false
		'change .team-list' : (ev)-> @saveTeam(ev)
		'change .best-of-input' : (ev)-> @saveBestOf(ev)
		'change .stream-list' : (ev)-> @saveStream(ev)
		'change #match-title' : (ev)-> @saveTitle(ev)

	initialize:(options)->
		super
		mediator.subscribe 'change:selected', (sel)=> @selectionChanged(sel)
		@streams = new Streams()
		@streams.fetch
			url: "http://esports.ign.com/content/v2/streams.json?callback=?"
		@groups = []

		@bracket = options.bracket

	render:->
		super
		options = {}
		options.title = @model?.get('event').get 'title'
		options.bestOf = @model?.matchup().get 'best_of'
		@$el.html @template( options )
		teamList = for team in @bracket.get('teams').models when team?
			team.get 'name'
		teamList.unshift('')

		for teamName in teamList
			$('<option></option>').appendTo(@.$('.team-list')).text teamName

		teams = @model?.teams()
		if teams?
			for i, team of teams
				@.$("#team#{parseInt(i)+1} option").each (ind)->
					if $(@).text() is team.get 'name'
						$(@).prop("selected", "selected")

		@fillSelect @streams.models, '.stream-list', @model?.get('event').get('stream')?.name
		@

	fillSelect: (list, elName, defaultVal=null)=>
		$('<option></option>').appendTo(@.$(elName))
		for element in list
			op = $('<option></option>').appendTo(@.$(elName)).text element.get('name')
			if op.text() is defaultVal
				op.prop("selected", "selected")

	saveTeam:(ev)->
		teams = _.clone(@model.teams())
		teams[parseInt($(ev.currentTarget).attr('slot'))] = @bracket.get('teams').where({name: $(ev.currentTarget).val()})[0]
		@model.teams(teams)

	saveTitle: (ev)->
		@model.get('event').set 'title', $(ev.currentTarget).val()

	saveBestOf:(ev)->
		@model.matchup().set 'best_of', parseInt @.$(ev.currentTarget).val()

	selectionChanged: (selected) ->
		@toolbar.openMenu 'match-menu'
		@model.selected = selected
		@model.set _.clone(selected[0].attributes), {silent:true}
		@model.newAttrs()
		@render()

	saveStream: (ev)=>
		sName = $(ev.currentTarget).val()
		sId = @streams.find (el)->el.get('name') is sName
		@model.get('event').set 'stream',
			id: sId.id
			name: sName