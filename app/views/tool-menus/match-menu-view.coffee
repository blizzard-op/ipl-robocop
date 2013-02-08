View = require 'views/base/view'
template = require 'views/templates/match-menu'
Matches = require 'collections/brackets/matches'
mediator = require 'mediator'
Streams = require 'collections/brackets/streams'
GameSubView = require 'views/game-sub-view'
MatchTeam = require 'models/brackets/match-team'

module.exports = class MatchMenuView extends View
	autoRender: true
	template: template
	container: '#menu-container'
	id: "match-menu"
	className: "admin-menu"
	events:
		'click #start-game-btn' : ()-> @startGame()
		'change .team-list' : (ev)-> @saveTeam(ev)
		'change .best-of-input' : (ev)-> @saveBestOf(ev)
		'change .stream-list' : (ev)-> @saveStream(ev)
		'change #match-title' : (ev)-> @saveTitle(ev)
		'change #start-time' : (ev)-> @saveTime(ev)
		'click .team-btn' : (ev)-> @endGame(ev)

	initialize:(options)->
		super
		mediator.subscribe 'change:selected', (sel)=> @selectionChanged(sel)
		@streams = new Streams()
		@streams.fetch
			url: "http://esports.ign.com/content/v2/streams.json?callback=?"
			cached:true
		$.ajax
			url: "http://esports.ign.com/content/v2/groups.json"
			cached:true
			success:(data)=>
				@groups = data
		@bracket = options.bracket

	render:->
		super
		unless @model?
			return @
		options = {}
		options.title = @model.event().get 'title'
		options.bestOf = @model.matchup().get 'best_of'
		options.startsAt = @model.event().get 'starts_at'
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

		@.$('#start-time').datetimepicker
			timeFormat: "hh:mm ttz"
			showTimezone: false
			timezone: "-0800"
			hourGrid: 4
			minuteGrid: 10

		@renderGroups()

		if @model.games().first().get('status') isnt 'ready'
			@renderGames()
			@.$('#start-game-btn').hide()

		@

	renderGames: ()=>
		@gameViews = @model.games().map (game)=>
			new GameSubView({model:game}).setMatchup(@model.matchup()).render()
		false

	startGame: ()=>
		@model.games().first().set 'status', 'in progress'
		@render()
		false

	endGame: (ev)=>
		result = @model.matchup().pointFor @.$(ev.currentTarget).text()
		@model.games().next(result.winner)
		if result.matchDecided
			@model.games().each (game)=> game.set 'status', 'finished'
			@model.advance(result.winner)
		@render()
		mediator.publish 'save-bracket'
		false

	fillSelect: (list, elName, defaultVal=null)=>
		$('<option></option>').appendTo(@.$(elName))
		for element in list
			op = $('<option></option>').appendTo(@.$(elName)).text element.get('name')
			if op.text() is defaultVal
				op.prop("selected", "selected")

	saveTeam:(ev)->
		teams = _.clone(@model.teams())
		newName = if $(ev.currentTarget).val() is '' then 'TBD' else $(ev.currentTarget).val()
		teams[parseInt($(ev.currentTarget).attr('slot'))] = @bracket.get('teams').where({name: newName})[0]
		_.each teams, (team, i)=>
			unless team?
				teams[i] = new MatchTeam()
		@model.teams(teams)

		teamNames = _.map teams, (team)=> team.get 'name'
		@model.event().set 'title', teamNames.join(" vs. ")
		mediator.publish 'save-bracket'
		@render()

	renderGroups: (ev)->
		# console.log @model.event().get 'groups'
		# toSelect =
		for group in @groups
			cSelect = $('<option></option>').appendTo(@.$('#group-select')).text group.name
			# console.log _.findWhere @model.groups, {slug: group.slug}


	saveGroups: (ev)->
		true

	saveTitle: (ev)->
		@model.get('event').set 'title', $(ev.currentTarget).val()

	saveBestOf:(ev)->
		@model.matchup().set 'best_of', parseInt @.$(ev.currentTarget).val()
		mediator.publish 'save-bracket'

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
		mediator.publish 'save-bracket'

	saveTime: (ev)=>
		@model.event().set 'starts_at', $(ev.currentTarget).val()
		@model.event().set 'ends_at', moment($(ev.currentTarget).val(), "MM/DD/YYYY hh:mm a").add('hours', 1).format("MM-DD-YYYYTHHss:mmZ")
		mediator.publish 'save-bracket'
