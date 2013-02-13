View = require 'views/base/view'
template = require 'views/templates/header'

module.exports = class HeaderView extends View
	autoRender: yes
	className: 'navbar navbar-fixed-top'
	container: '#header-container'
	id: 'header'
	template: template

	events:
		"click a" : (ev)->
			window.location = window.location.protocol + "//" + window.location.host + $(ev.currentTarget).attr('href')
			false

