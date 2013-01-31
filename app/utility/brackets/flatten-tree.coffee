module.exports = class FlattenTree
	@flatten: (root, buffer=[])->
		buffer.push root
		for child in root.get 'children'
			@flatten(child, buffer)
		buffer