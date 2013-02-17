module.exports = class Viper
	@saveEvent: (match, callback=null)=>
		match.save null,
			success:(data)=>
				if callback?
					callback()
			error:(data, xhr)=>
				if callback?
					callback()

	@saveMatchup: (match, callback=null)=>
		#have to save the parent event before we can save a matchup
		unless match.get('matchup').id?
			match.save null,
				success:(data)=>
					match.get('matchup').save null,
						success:(data)=>
							if callback?
								callback()
				error:(data, xhr)=>
					if callback?
						callback()
		else
			match.get('matchup').save null,
				success:(data)=>
					if callback?
						callback()
				error:(data, xhr)=>
					if callback?
						callback()

	@saveGame: (match, game, callback=null)=>
		unless game.id?
			match.save null,
				success:(data)=>
					game.save null,
						success:(data)=>
							if callback?
								callback()
				error:(data, xhr)=>
					if callback?
						callback()
		else
			game.save null,
				success:(data)=>
					if callback?
						callback()
				error:(data, xhr)=>
					if callback?
						callback()
