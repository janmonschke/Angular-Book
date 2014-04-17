request = require 'request'
connection  = require('../config/connection_config').config.createConnection()
db = connection.database 'swm_embedly_cache'

class Embedly

  @key: 'badd0d5e8376450eaff81ea12c1ea490'

  @get: (url, done) ->
    @_getFromCache url, (err, data) =>
      if err or not data
        @_getFromEmbedlyApi(url, done)
      else
        done null, data

  # only looks inside the cache, doesn't load non-existing urls
  @getAll: (urls, done) ->
    @_getFromCache urls, done    

  # get a single doc or multiple docs from the cache database
  @_getFromCache: (url, done) ->
    db.get url, done

  # get a single doc or multiple docs from the embedly API
  @_getFromEmbedlyApi: (url, done) ->
    api_url = "http://api.embed.ly/1/oembed?key=#{@key}&url=#{encodeURIComponent(url)}"
    request api_url, (err, response, body) =>
      return done(err) if err
      # TODO check if the url which is returned
      body = JSON.parse body

      @_getFromCache (body.url or url), (err, data) =>
        if err or not data
          @_createFromApiResponse body, done
        else
          done null, data

  @_createFromApiResponse: (embedlyResponse, done) ->
    db.save embedlyResponse.url, embedlyResponse, (err, res) ->
      return done(err) if err
      embedlyResponse._id = res.id
      embedlyResponse._rev = res.rev
      done null, embedlyResponse

module.exports = Embedly