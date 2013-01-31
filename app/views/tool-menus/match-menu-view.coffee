View = require 'views/base/view'
template = require 'views/templates/match-menu'
Matches = require 'collections/brackets/matches'
mediator = require 'mediator'

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
		
	initialize:(options)->
		super
		mediator.subscribe 'change:selected', (sel)=> @selectionChanged(sel)
		@bracket = options.bracket

	render:->
		super
		options = {}
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
		@
	
	saveTeam:(ev)->
		teams = _.clone(@model.teams())
		teams[parseInt($(ev.currentTarget).attr('slot'))] = @bracket.get('teams').where({name: $(ev.currentTarget).val()})[0]
		@model.teams(teams)

	saveBestOf:(ev)->
		@model.matchup().set 'best_of', parseInt @.$(ev.currentTarget).val()

	selectionChanged: (selected) ->
		@toolbar.openMenu 'match-menu'
		@model.selected = selected
		@model.set _.clone(selected[0].attributes), {silent:true}
		@model.newAttrs()
		@render()