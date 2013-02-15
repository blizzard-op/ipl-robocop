View = require 'views/base/view'
template = require 'views/templates/admin-workspace'
AdminToolbarView = require 'views/admin-toolbar-view'
WizardMenuView = require 'views/tool-menus/wizard-menu-view'
SingleElimWizard = require 'models/single-elim-wizard'
TeamMenuView = require 'views/tool-menus/team-menu-view'
TeamAutoSeeder = require 'models/team-auto-seeder'
MatchMenu = require 'views/tool-menus/match-menu-view'
MatchMutator = require 'models/match-mutator'
GroupMenu = require 'views/tool-menus/group-menu-view'
GroupGenerator = require 'models/group-generator'
PublishMenu = require 'views/tool-menus/publish-menu-view'

module.exports = class AdminWorkspaceView extends View
	autoRender: yes
	className: 'workspace'
	container: '#page-container'
	template: template
	initialize:(options)->
		super(options)
		@collection.add
			label: "Wizard"
			slug: "wizard-menu"
			logic: new SingleElimWizard()
			menu: new WizardMenuView({bracket:@model})

		@collection.add
			label: "Teams"
			slug: "teams-menu"
			logic: new TeamAutoSeeder({bracket:@model})
			menu: new TeamMenuView({bracket:@model})

		@collection.add
			slug: "match-menu"
			logic: new MatchMutator()
			menu: new MatchMenu({bracket:@model})

		# @collection.add
		# 	label: "Groups"
		# 	slug: "groups-menu"
		# 	logic: new GroupGenerator()
		# 	menu: new GroupMenu({bracket:@model})

		@collection.add
			slug: "publish-menu"
			menu: new PublishMenu({bracket:@model})

		@toolbar = new AdminToolbarView({collection: @collection})
		# make sure each tool has access to the toolbar
		_.each @collection.models, (tool) =>
			tool.get('menu').toolbar = @toolbar

	render:->
		super
		@toolbar.$el.appendTo(@.$('#toolbar-container'))
		for i, a of @collection.models
			@collection.models[i].get('menu').$el.appendTo(@.$('#menu-container')).hide()
		@toolbar.openMenu( @collection.at(0).get('slug') )

		@

	dispose:()->
		@collection.each (m)->
			m
		super