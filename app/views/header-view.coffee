View = require 'views/base/view'
template = require 'views/templates/header'
mediator = require 'mediator'

module.exports = class HeaderView extends View
	autoRender: yes
	className: 'navbar navbar-fixed-top'
	container: '#header-container'
	id: 'header'
	template: template

	events:
		"click .header-link" : (ev)-> @followLink(ev)
		"click .publish-link" : (ev)-> @showPubMenu(ev)

	showPubMenu: (ev)->
		mediator.publish 'publish:clicked'
		false

	followLink: (ev)->
		window.location = window.location.protocol + "//" + window.location.host + $(ev.currentTarget).attr('href')
		false


