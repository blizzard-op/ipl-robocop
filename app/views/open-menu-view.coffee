View = require 'views/base/view'
template = require 'views/templates/open-menu'
Collection = require 'models/base/collection'
BracketUrls = require 'utility/brackets/bracket-urls'

module.exports = class OpenMenuView extends View
	template: template
	container: '#page-container'
	className: 'open-bracket-menu'
	autoRender: true

	initialize: (options)->
		super options
		@brackets = []
		$.ajax
			url: BracketUrls.apiBase+"/brackets/v6/api/list/"
			success: (data)=>
				@brackets = data
				@render()

	render: =>
		super
		options = {}
		options.brackets = @brackets

		for bracket in options.brackets when bracket?
			bracket.date = moment(bracket.date, "YYYY-MM-DDTHH:mm:ssZ").format("MM.DD.YYYY hh:mmA")
		@$el.html @template(options)
		@