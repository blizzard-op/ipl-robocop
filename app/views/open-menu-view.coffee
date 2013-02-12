View = require 'views/base/view'
template = require 'views/templates/open-menu'

module.exports = class OpenMenuView extends View
	template: template
	container: '#page-container'
	autoRender: true
