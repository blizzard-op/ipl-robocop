Model = require 'models/base/model'

module.exports = class Tool extends Model
	defaults:
		label: null
		slug: "tool"
		menu: null
		logic: null
	initialize:->
		super
		if @has('menu')
			@get('menu').model = @get('logic')