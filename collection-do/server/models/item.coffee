Model   = require './model'
Embedly = require './embedly'
_       = require 'underscore'

class Item extends Model
  @databaseName: 'swm_data'

  @findByCollectionId: (collectionId, done) ->
    @db().view 'swm/itemsByCollectionId', { key: collectionId }, (err, doc) ->
      mappedResults = _(doc).map (doc) -> doc.value
      done err, mappedResults


module.exports = Item