module.exports = class RandomString
	@get: (format = "xxxxxxxx")->
		format = format.replace(/[xy]/g, (c)->
			r = Math.random()*16|0
			v = if c == 'x' then r else (r&0x3|0x8)
			return v.toString(16)
		)
		format