Controller = require 'controllers/base/controller'
AdminWorkspaceView = require 'views/admin-workspace-view'
AdminWorkspace = require 'models/admin-workspace'
Tools = require 'collections/tools'
Bracket = require 'models/brackets/bracket'
BracketView = require 'views/bracket-editor-view'
mediator = require 'mediator'
OpenMenuView = require 'views/open-menu-view'

module.exports = class AdminsController extends Controller
	index: ->
		@bracket = new Bracket()
		@bracketLoaded()

	editBracket: (routeVars) ->
		@bracket = new Bracket()
		@bracketLoaded()
		@bracket.fetch
			url: "http://test.ign.com:2121/brackets/v6/api/"+routeVars.slug
			success: (data)=>
				@bracketView.render()

	bracketLoaded: ()->
		options =
			domain: ".ign.com"
		$.cookies.set("robocopAuth", "yourmovecreep", options)
		@tools = new Tools()
		@workspaceView = new AdminWorkspaceView
			collection: @tools
			model: @bracket
		@bracketView = new BracketView({model: @bracket})