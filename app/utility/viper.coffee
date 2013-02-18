module.exports = class Viper
	@defSync: (callback) ->
		if callback?
			success:(data)=>
				callback()
			error:(data, xhr)=>
				callback()

	@saveEvent: (match, callback=null)=>
		match.save null, @defSync(callback)

	@saveEvents: (events)=>
		for event in events when event?
			@saveEvent event

	@saveMatchups: (events)=>
		for event in events when event?
			@saveMatchup event

	@saveMatchup: (event, callback=null)=>
		#have to save the parent event before we can save a matchup
		unless event.get('matchup').id?
			event.save null,
				success:(data)=>
					event.get('matchup').save null,
						success:(data)=>
							if callback?
								callback()
				error:(data, xhr)=>
					if callback?
						callback()
		else
			event.get('matchup').save null, @defSync(callback)

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
			game.save null, @defSync(callback)


