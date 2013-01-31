View = require 'views/base/view'
template = require 'views/templates/admin-toolbar'

module.exports = class AdminToolbarView extends View
	autoRender: yes
	container: '#toolbar-container'
	id: 'admin-toolbar'
	template: template
	events:
		"click .btn" : (ev)-> @openMenu( $(ev.currentTarget).attr('id') )

	initialize:->
		super
		@$curMenu = null
		@curSlug = ""

	render:->
		super
		buttons = for a in @collection.models when a.has('label')
			label: a.get 'label'
			slug: a.get 'slug'
		@$el.html(@template(btns: buttons))

	openMenu: (curBtnSlug)=>
		unless curBtnSlug is @curSlug
			for a in @collection.models
				if a.get('slug') is curBtnSlug
					@$curMenu?.fadeOut()
					@$curMenu = a.get('menu').$el
					@curSlug = curBtnSlug
					a.get('menu').$el.fadeIn()
					@.$('.btn').removeClass('active')
					if a.has 'label'
						@.$('#'+a.get 'slug').addClass('active')
					break