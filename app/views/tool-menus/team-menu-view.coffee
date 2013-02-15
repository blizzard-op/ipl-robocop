View = require 'views/base/view'
Collection = require 'models/base/collection'
template = require 'views/templates/team-menu'
MenuResizer = require 'utility/menu-resizer'

module.exports = class TeamMenuView extends View
	template: template
	container: '#menu-container'
	id: 'team-menu'
	className: 'admin-menu clearfix'
	autoRender: true
	events:
		'click .edit-team': (ev)-> @editTeam(ev)
		'dblclick .team-label': (ev)-> @editTeam(ev)
		'blur .team-edit-label input': (ev)-> @saveTeamName(ev)
		'change #enable-seeding' : (ev)-> @model.set 'enabled', $(ev.currentTarget).prop('checked')
		# 'keypress': (ev)-> @enterKey(ev)
	initialize: (options)->
		super
		@bracket = options.bracket
		@teams = @bracket.get('teams')
		@listenTo @teams, 'reset', @render
		@listenTo @teams, 'sync', @render
		@listenTo @teams, 'change:name', @render
		@idLookup = {}
		$.ajax
			url: "http://esports.ign.com/content/v2/teams.json?per_page=1000"
			cached:true
			success: (data) =>
				@teamlist = for a in data
					@idLookup[a.name] = a.id
					a.name

	render: ()->
		super
		teamObs = for a in @teams.models
			name: a.get('name')

		@$el.html @template( { teams: teamObs })
		if @model?
			@.$('#enable-seeding').prop('checked', @model.get('enabled'))
			@teams.each (team)=>
				@.$('li').eq( team.get('seed') - 1 ).data 'team', team
			@.$('#team-sort-list').sortable
				update: @sortUpdate
			@.$('input.team-input').typeahead
				source: @teamlist

		MenuResizer.auto(@$el)
		@

	sortUpdate: (e, ui)=>
		@.$('li').each ()->
			$(@).data('team').set 'seed', $(@).index() + 1
		@teams.sort()
		mediator.publish 'save-bracket'

	editTeam: (ev)=>
		parent = $(ev.currentTarget).parents('li')
		parent.addClass('edit').find('input').focus()
		false

	saveTeamName: (ev)->
		team = $(ev.currentTarget).parents('li').data 'team'
		oldTeam = _.clone(team.attributes)
		team.set 'name', $(ev.currentTarget).val()
		team.set 'id', @idLookup[$(ev.currentTarget).val()]
		@model.replaceTeam oldTeam, _.clone(team.attributes)

		@.$('li').removeClass('edit')
		@model.retitleSeeds()
		mediator.publish 'save-bracket'
		false

	# enterKey: (ev)->
		# if ev.keyCode is 13 and $(document.activeElement).hasClass 'team-input'