Model   = require './model'
_       = require 'underscore'

class Collection extends Model
  @databaseName: 'swm_data'
  @getUserModel: -> 
    @_userModel = require('./user') unless @_userModel
    @_userModel

  @baseCollection: ->
    subscribers: []
    owners: []
    type: 'collection'
    visible: true
    slug: 'dummy'
    name: 'dummy'

  @findByUsernameAndCollectionSlug: (username, collectionSlug, done) ->
    @getUserModel().findByName username, (err, user) =>
      @findByUserIdAndSlug user.values._id, collectionSlug, done

  @findByUserId: (user_id, done) ->
    @db().view 'swm/collectionsByOwnerId', { key: user_id }, (err, collections = []) ->
      return done(err) if err
      collections = _.map collections, (collection) -> collection.value
      done null, collections

  @findByUserIdAndSlug: (user_id, slug,  done) ->
    @db().view 'swm/collectionsByOwnerIdAndSlug', { startkey: [user_id, slug], endkey: [user_id, slug] }, done

module.exports = Collection