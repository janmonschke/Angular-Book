Controller    = require('./controller')
User          = require('../models/user')
Collection    = require('../models/collection')

class UserController extends Controller
  before: ->
    'me' : @loginIfNotLoggedIn
    'me_json': @ensureAuthenticated
    'showCollection' : @loginIfNotLoggedIn

  constructor: (@auth) ->
    super

  # Renders the current user's page if the user is logged in
  me: (req, res) ->
    userId = req.user.values._id
    Collection.findByUserId userId, (err, collections) ->
      first_collection = collections[0]
      res.redirect "/#{req.user.values.username}/#{first_collection.slug}"

  me_json: (req, res) ->
    res.json req.user.toJSON()

  show: (req, res) ->
    res.render('user/show')

  showCollection: (req, res) ->
    res.render 'app'

  # Register a user from form daat
  register: (req, res) ->
    # structure the data
    data =
      username: req.body.username
      password: req.body.password
      email: req.body.email

    # create user from given data
    User.createWithPassword data, (err, user) ->
      # something went wrong
      if err or !user
        res.json({message: 'Could not create a user, try again!'}, 500)
      else
        # User successfully created, log it in and redirect
        req.login user, (err) ->
          return res.json({message: 'Could not log you in, try again!'}, 500) if err
          res.redirect('/me')

  # Log the user out and redirect
  logout: (req, res) ->
    req.logout()
    res.redirect('/')

module.exports = UserController