View = require 'views/base/view'
template = require 'views/templates/publish-menu'
mediator = require 'mediator'
BracketUrls = require 'utility/brackets/bracket-urls'

module.exports = class PublishMenuView extends View
	template: template
	autoRender:true
	container: '#menu-container'
	id: "publish-menu"
	className: "admin-menu publish-menu"
	events:
		"click input" : (ev)-> @selectInput(ev)

	initialize: (options)->
		super options
		@bracket = options.bracket
		mediator.subscribe 'publish:clicked', (sel)=> @publishShow()
		@urls = {}
		@urls.directLink = ""

	publishShow: ()->
		@toolbar.openMenu 'publish-menu'
		@urls.directLink = BracketUrls.viewBase+"/brackets/v6/view/" + @bracket.get 'slug'
		@render()

	selectInput: (ev)=>
		@.$(ev.currentTarget).select()

	render:->
		super
		@$el.html @template(@urls)
		@
