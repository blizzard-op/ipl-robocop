Controller = require 'controllers/base/controller'
OpenMenuView = require 'views/open-menu-view'

module.exports = class OpensController extends Controller
	index:->
		@view = new OpenMenuView()
