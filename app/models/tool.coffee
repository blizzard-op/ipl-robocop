Model = require 'models/base/model'

module.exports = class Tool extends Model
	defaults:
		label: null
		slug: "tool"
		menu: null
		logic: null
	initialize:(options)->
		super options
		if @has('menu')
			@get('menu').model = @get('logic')