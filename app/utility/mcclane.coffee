module.exports = class Mcclane
	@model = null
	@save:()=>
		if @model?
			@model.save null,
				xhrFields:
					withCredentials: true
		else
			throw new Error("Bracket is not bound to Mcclane")