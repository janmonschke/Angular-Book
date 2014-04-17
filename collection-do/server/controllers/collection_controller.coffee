Controller    = require('./controller')
Collection    = require('../models/collection')
User          = require('../models/user')
_             = require 'underscore'

class CollectionController extends Controller
  before: ->
    'create': @ensureAuthenticated

  show: (req, res) =>
    user = req.user
    Collection.get req.params.collection_id, (err, collection) =>
      return @['500'](req, res) if err
      return @['404'](req, res) if not collection
      console.log 'TODO: check visibility and ownership for invisible collections'
      #return @['401'](req, res) unless user and user.values._id is collection.owner_id
      console.log collection
      res.json collection

  create: (req, res) =>
    currUserId = req.user.values._id

    # only allow the following values to be set by the user
    collectionValues = _.pick req.body, ['name', 'slug']

    # add the values to the base model
    collectionValues = _.extend Collection.baseCollection(), collectionValues

    # add the owner
    collectionValues.owners.push currUserId

    Collection.create collectionValues, (err, collection) -> res.json(collection)

  edit: (req, res) =>
    collectionId = req.params.collection_id
    currUserId = req.user.values._id

    # getting rid of values that cannot be changed
    bodyCollection = _.omit req.body, '_rev', '_id'

    console.log "edit#collection", bodyCollection

    Collection.get collectionId, (err, collection) =>
      return @['500'](req, res) if err
      return @['404'](req, res) if not collection
      return @['403'](req, res) if collection.owners.indexOf(currUserId) is -1

      _.extend collection, bodyCollection

      Collection.edit collection, (err, collection) =>
        return @['500'](req, res) if err
        return @['404'](req, res) if not collection
        res.json ok: true

  destroy: (req, res) =>
    collectionId = req.params.collection_id
    currUserId = req.user.values._id

    Collection.get collectionId, (err, collection) =>
      return @['500'](req, res) if err
      return @['404'](req, res) if not collection
      return @['403'](req, res) if collection.owners.indexOf(currUserId) is -1

      Collection.remove collectionId, (error, collection) =>
        return @['500'](req, res) if error
        res.json {}

  listForUser: (req, res) =>
    username = req.params.username

    listCollections = (err, collections) =>
      return @['500'](req, res) if err
      return @['404'](req, res) if not collections.length is 0
      res.json collections

    # fast lane or not?
    if req.user?.values?.username is username
      Collection.findByUserId req.user.values._id, listCollections
    else
      User.findByName username, (err, user) =>
        return @['500'](req, res) if err
        return @['404'](req, res) if not user
        Collection.findByUserId user.values._id, listCollections

  fromUsernameAndSlug: (req, res) =>
    username = req.params.username
    collection_slug = req.params.collection_slug

    renderCollection = (err, collection) =>
      return @['500'](req, res) if err
      return @['404'](req, res) if collection.length is 0
      res.json collection[0].value

    # fast lane or not?
    if req.user?.values?.username is username
      Collection.findByUserIdAndSlug req.user.values._id, collection_slug, renderCollection
    else
      User.findByName username, (err, user) =>
        return @['500'](req, res) if err
        return @['404'](req, res) if not user
        Collection.findByUserIdAndSlug user.values._id, collection_slug, renderCollection

module.exports = CollectionController