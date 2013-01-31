module.exports = class IntToAlphabet
	@alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	@get: (num)=>
		num = parseInt(num)
		letterCount = Math.ceil(num / @alphabet.length)
		ret = ""
		for i in [0...letterCount]
			ret += @alphabet.charAt( num - (@alphabet.length * i) - 1 )
		ret