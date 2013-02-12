View = require 'views/base/view'
template = require 'views/templates/open-menu'
Collection = require 'models/base/collection'

module.exports = class OpenMenuView extends View
	template: template
	container: '#page-container'
	className: 'open-bracket-menu'
	autoRender: true

	initialize: (options)->
		super options
		@brackets = []
		$.ajax
			url: "http://test.ign.com:2121/brackets/v6/api/list/"
			success: (data)=>
				@brackets = data
				@render()

	render: =>
		super
		options = {}
		options.brackets = @brackets
		@$el.html @template(options)
		@
