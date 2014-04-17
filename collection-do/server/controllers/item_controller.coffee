Controller    = require('./controller')
Collection    = require('../models/collection')
Item          = require('../models/item')
Embedly       = require('../models/embedly')
_             = require('underscore')

class ItemController extends Controller
  before: ->
    'create': @ensureAuthenticated
    'destroy': @ensureAuthenticated

  create: (req, res) =>
    currUserId = req.user.values._id
    collectionId = req.params.collection_id
    url = req.body.url

    return @['400'](req, res) unless url

    baseItem = 
      collection_id: collectionId
      url: url
      type: 'item'

    Collection.get collectionId, (err, collection) =>
      return @['500'](req, res) if err
      return @['404'](req, res) if not collection
      return @['403'](req, res) if collection.owners.indexOf(currUserId) is -1

      Embedly.get url, (err, embedly) =>
        return @['500'](req, res) if err
        return @['404'](req, res) if not embedly

        baseItem.embedlyContent = embedly

        Item.create baseItem, (err, item) =>
          return @['500'](req, res) if err or not item
          res.json item

  fromUsernameAndSlug: (req, res) ->
    Collection.findByUsernameAndCollectionSlug req.params.username, req.params.collection_slug, (err, collection) ->
      return @['404'](req, res) if collection.length is 0
      collection = collection[0].value

      Item.findByCollectionId collection._id, (err, items) ->
        return @['500'](req, res) if err
        return @['404'](req, res) unless items

        res.json items

  listForCollection: (req, res) =>
    collectionId = req.params.collection_id
    currUserId = req.user?.values._id

    Collection.get collectionId, (err, collection) =>
      return @['500'](req, res) if err
      return @['404'](req, res) if not collection

      if collection.visible isnt true and collection.owners.indexOf(currUserId) is -1
        @['401'](req, res)
      else
        Item.findByCollectionId collection._id, (error, item) =>
          return @['500'](req, res) if err
          res.json item

  destroy: (req, res) =>
    collectionId = req.params.collection_id
    itemId = req.params.item_id
    currUserId = req.user.values._id

    Collection.get collectionId, (err, collection) =>
      return @['500'](req, res) if err
      return @['404'](req, res) if not collection
      return @['403'](req, res) if collection.owners.indexOf(currUserId) is -1

      Item.remove itemId, (error, item) =>
        return @['500'](req, res) if error
        res.json {}

module.exports = ItemController