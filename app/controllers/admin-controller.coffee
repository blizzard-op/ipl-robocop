Controller = require 'controllers/base/controller'
AdminWorkspaceView = require 'views/admin-workspace-view'
AdminWorkspace = require 'models/admin-workspace'
Tools = require 'collections/tools'
Bracket = require 'models/brackets/bracket'
BracketView = require 'views/bracket-editor-view'
mediator = require 'mediator'

module.exports = class AdminsController extends Controller
	index: ->
		@bracket = new Bracket()
		@bracketLoaded()
	editBracket: (routeVars) ->
		@bracket = new Bracket()
		@bracketLoaded()
	bracketLoaded: ->
		@tools = new Tools()
		@workspaceView = new AdminWorkspaceView
			collection: @tools
			model: @bracket
		@bracketView = new BracketView({model: @bracket})