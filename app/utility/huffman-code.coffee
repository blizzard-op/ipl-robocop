module.exports = class HuffmanCode
	@losersInRound:(round, players)=>
		lTree = @createLookup(round)
		if round%2 is 0
			lTree.children.reverse()
		if players > 32 and round >= 5
			_.map lTree.children, (child)-> child.children.reverse()
		@flattenTree(lTree, round)

	@createLookup:(depth, parentVal="", addVal="")->
		val: parentVal + addVal
		children: if depth - 1 is 0 then [] else [@createLookup(depth-1, parentVal + addVal, 0),@createLookup(depth-1, parentVal + addVal, 1)]

	@flattenTree: (tree, maxDepth, buffer=[], depth=0)->
		if depth is maxDepth or tree.children.length < 1
			buffer.push tree.val
		else
			for a in tree.children
				@flattenTree(a, maxDepth, buffer, depth+1)
		buffer

	@followString: (str, match)=>
		if str.length>0
			nc = parseInt str.charAt(0)
			return @followString str.slice(1, str.length), match.get('children')[nc]
		else
			return match.teams()[1]