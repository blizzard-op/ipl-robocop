Controller = require 'controllers/base/controller'
AdminWorkspaceView = require 'views/admin-workspace-view'
AdminWorkspace = require 'models/admin-workspace'
Tools = require 'collections/tools'
Bracket = require 'models/brackets/bracket'
BracketView = require 'views/bracket-editor-view'
mediator = require 'mediator'
OpenMenuView = require 'views/open-menu-view'
BracketUrls = require 'utility/brackets/bracket-urls'
Mcclane = require 'utility/mcclane'

module.exports = class AdminsController extends Controller
	index: ->
		@bracket = new Bracket()
		@bracketLoaded()

	editBracket: (routeVars) ->
		@bracket = new Bracket()
		@bracketLoaded()
		@bracket.fetch
			url: BracketUrls.apiBase + "/brackets/v6/api/"+routeVars.slug
			success: (data)=>
				@bracketView.render()
			# error: (model, xhr)=>
				# console.log xhr.status

	bracketLoaded: ()->
		options =
			domain: ".ign.com"
		$.cookies.set("robocopAuth", "yourmovecreep", options)
		@tools = new Tools()
		Mcclane.model = @bracket
		@workspaceView = new AdminWorkspaceView
			collection: @tools
			model: @bracket
		@bracketView = new BracketView({model: @bracket})