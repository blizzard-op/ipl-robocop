View = require 'views/base/view'
template = require 'views/templates/match-menu'
Matches = require 'collections/brackets/matches'
mediator = require 'mediator'
Streams = require 'collections/brackets/streams'
GameSubView = require 'views/game-sub-view'
MatchTeam = require 'models/brackets/match-team'
MenuResizer = require 'utility/menu-resizer'
Viper = require 'utility/viper'
Mcclane = require 'utility/mcclane'

module.exports = class MatchMenuView extends View
	autoRender: true
	template: template
	container: '#menu-container'
	id: "match-menu"
	className: "admin-menu"
	events:
		'click button.start-game' : ()-> @startGame()
		'click #reset-match-btn' : ()-> @resetMatchup()
		'change .team-list' : (ev)-> @saveTeam(ev)
		'change .best-of-input' : (ev)-> @saveBestOf(ev)
		'change .stream-list' : (ev)-> @saveStream(ev)
		'change #match-title' : (ev)-> @saveTitle(ev)
		'change #group-select' : (ev)-> @saveGroups(ev)
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

	render:=>
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
		teamList.unshift('TBD')

		for teamName in teamList
			$('<option></option>').appendTo(@.$('.team-list')).text teamName

		teams = @model?.teams()
		if teams?
			for i, team of teams
				@.$("#team#{parseInt(i)+1} option").each (ind)->
					if $(@).text() is team.get 'name'
						$(@).prop("selected", "selected")

		@fillSelect @streams.models, '.stream-list', @model?.get('event').get('stream')?.name

		if _.first(@model.selected).started()
			@.$('.team-list').prop('disabled', 'disabled')

		@.$('#start-time').datetimepicker
			timeFormat: "hh:mm ttz"
			showTimezone: false
			timezone: "-0800"
			hourGrid: 6
			minuteGrid: 15
			stepMinute: 15,
			onSelect: (dt, dpi)=>
				@saveTime(dt)

		@renderGroups()
		if _.first(@model.selected).noTBDs()
			@renderGames()

		MenuResizer.auto(@$el)
		@

	renderGames: ()=>
		startButtons = 0
		underways = false
		@gameViews = @model.games().map (game)=>
			gv = new GameSubView({model:game}).setMatchup(@model.matchup()).render()
			if gv.model.get('status') is 'underway'
				underways = true
			if gv.model.get('status') is 'ready' and startButtons++ > 0 or underways
				gv.$('.start-game').hide()
			gv
		false

	resetMatchup: ()=>
		_.first(@model.selected).matchup().reset()
		@render()
		false

	startGame: ()=>
		firstGame = @model.games().firstReady()
		firstGame.start()
		Viper.saveGame _.first(@model.selected).event(), firstGame
		Mcclane.save()
		@render()
		false

	endGame: (ev)=>
		result = @model.matchup().pointFor @.$(ev.currentTarget).text()
		prevGame = @model.games().next(result.winner)
		if result.matchDecided
			@model.games().each (game)=> game.set 'status', 'finished'
			@model.advance(result.winner)
		@render()
		Viper.saveGame _.first(@model.selected).event(), prevGame
		Mcclane.save()
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
		console.log teams[parseInt($(ev.currentTarget).attr('slot'))]
		_.each teams, (team, i)=>
			unless team?
				teams[i] = new MatchTeam()
		@model.teams(teams)

		teamNames = _.map teams, (team)=> team.get 'name'
		@model.event().set 'title', teamNames.join(" vs. ")
		Viper.saveMatchups _.map @model.selected, (match)->match.event()
		Viper.saveEvents _.map @model.selected, (match)-> if match.event().isNew() then null else match.event()
		Mcclane.save()

		@render()

	renderGroups: (ev)->
		for group in @groups
			$cSelect = $('<option></option>').appendTo(@.$('#group-select')).text group.name
			hasGroup = _.findWhere @model.event().get('groups'), {slug: group.slug}
			if hasGroup?
				$cSelect.prop("selected", "selected")

	saveGroups: (ev)->
		selectedGroups = $(ev.currentTarget).val()
		@model.event().set 'groups', _.filter(@groups, (group)-> _.find(selectedGroups, (name)-> name is group.name))

	saveTitle: (ev)->
		@model.get('event').set 'title', $(ev.currentTarget).val()
		Viper.saveEvents _.map(@model.selected, (match)->match.event())
		Mcclane.save()

	saveBestOf:(ev)->
		@model.matchup().set 'best_of', parseInt @.$(ev.currentTarget).val()
		Viper.saveMatchups _.map(@model.selected, (match)->match.event())
		Mcclane.save()

	selectionChanged: (selected) =>
		@toolbar.openMenu 'match-menu'
		@model.selected = selected
		@model.set _.clone(selected[0].attributes), {silent:true}
		@model.newAttrs()
		@render()

	saveStream: (ev)=>
		sName = $(ev.currentTarget).val()
		sId = @streams.find (el)->el.get('name') is sName
		if sId?
			@model.get('event').set 'stream',
				id: sId.id
				name: sName
		else
			@model.get('event').set 'stream', null
		Viper.saveEvents _.map(@model.selected, (match)->match.event())
		Mcclane.save()

	saveTime: (time)=>
		@model.event().set 'starts_at', time
		@model.event().set 'ends_at', moment(time, "MM/DD/YYYY hh:mm a").add('hours', 1).format("YYYY-MM-DDTHH:mm:ssZ")
		Viper.saveEvents _.map(@model.selected, (match)->match.event())
		Mcclane.save()
