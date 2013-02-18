View = require 'views/base/view'
template = require 'views/templates/header'
mediator = require 'mediator'
Mcclane = require 'utility/mcclane'

module.exports = class HeaderView extends View
	autoRender: yes
	className: 'navbar navbar-fixed-top'
	container: '#header-container'
	id: 'header'
	template: template

	events:
		"click .header-link" : (ev)-> @followLink(ev)
		"click .save-link" : (ev)-> @saveBracket(ev)
		"click .publish-link" : (ev)-> @showPubMenu(ev)

	showPubMenu: (ev)->
		mediator.publish 'publish:clicked'
		false

	saveBracket: (ev)->
		Mcclane.save()
		false

	followLink: (ev)->
		window.location = window.location.protocol + "//" + window.location.host + $(ev.currentTarget).attr('href')
		false


