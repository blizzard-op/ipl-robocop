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
		@loadConfig
			success: (data)=>
				@config = data
				@bracketLoaded()
			error: (data, xhr)-> console.log "could not load config"

	editBracket: (routeVars) ->
		@bracket = new Bracket()
		@loadConfig
			success: (data)=>
				@config = data
				@bracketLoaded()
				@bracket.fetch
					url: BracketUrls.apiBase + "/brackets/v6/api/"+routeVars.slug
					success: (data)=>
						@bracketView.render()
			error: (data, xhr)-> console.log "could not load config"

	bracketLoaded: ()=>
		options =
			domain: ".ign.com"
		$.cookies.set(@config.authKey, @config.authSecret, options)
		@tools = new Tools()
		Mcclane.model = @bracket
		@workspaceView = new AdminWorkspaceView
			collection: @tools
			model: @bracket
		@bracketView = new BracketView({model: @bracket})

	loadConfig: (options)=>
		options.url = "config.json"
		$.ajax options