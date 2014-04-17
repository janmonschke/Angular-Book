Model   = require './model'
_       = require 'underscore'

class Tag extends Model
  @databaseName: 'swm_data'

  create: (tagName, user, done) ->

  destroy: (tagName, user, done) ->

module.exports = Tag