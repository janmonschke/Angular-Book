StaticSitesController = require('./controllers/static_sites_controller')
UserController        = require('./controllers/user_controller')
ItemController        = require('./controllers/item_controller')
CollectionController  = require('./controllers/collection_controller')

module.exports = (app, auth) ->
  statics = new StaticSitesController auth
  user    = new UserController auth
  item    = new ItemController auth
  collection  = new CollectionController auth

  # render the index page
  app.get   '/', statics.index

  # users / login / register / OAuth providers
  app.get   '/register', statics.register
  app.post  '/register', user.register

  app.get   '/login', statics.login
  app.post  '/login', user.auth.authenticate 'local',
    successRedirect: '/me'
    failureRedirect: '/login'

  app.get   '/auth/twitter', auth.authenticate('twitter')
  app.get   '/auth/twitter/callback', auth.authenticate 'twitter',
    successRedirect: '/me'
    failureRedirect: '/login'

  app.get   '/me', user.me
  app.get   '/api/me', user.me_json

  app.get   '/:username/:collection_slug', user.showCollection


  app.post  '/api/collection',                                  collection.create
  app.get   '/api/collection/:collection_id',                   collection.show
  app.put   '/api/collection/:collection_id',                   collection.edit
  app.delete '/api/collection/:collection_id',                  collection.destroy
  app.get   '/api/user/:username/collection',                   collection.listForUser
  app.get   '/api/user/:username/collection/:collection_slug',  collection.fromUsernameAndSlug

  app.get     '/api/user/:username/collection/:collection_slug/items',  item.fromUsernameAndSlug
  app.get     '/api/collection/:collection_id/items',                   item.listForCollection
  app.post    '/api/collection/:collection_id/items',                   item.create
  app.delete  '/api/collection/:collection_id/items/:item_id', item.destroy

  #app.get   '/:username/:collectionslug', static.collection
  app.get   '/logout', user.logout