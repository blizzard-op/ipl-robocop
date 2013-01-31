module.exports = class RoundsFromMatchList
	#creates a two dimentional array of matches by round from a root node  
	@convert: (root) =>
		rnds = []
		if root?
			@rec(root, 0, rnds)
		rnds.reverse()		
	@rec: (ti, depth, buffer)=>
		unless buffer[depth]?
			buffer[depth] = []
		buffer[depth].push(ti)
		for i in [0...ti.get('children').length] when ti.get('children')[i]?
			@rec(ti.get('children')[i], depth+1, buffer)