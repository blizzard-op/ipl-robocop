Model = require 'models/base/model'
SingleElimWizard = require 'models/single-elim-wizard'

module.exports = class AdminTools extends Model
	initialize: ->
		@set 'wizard', new SingleElimWizard()