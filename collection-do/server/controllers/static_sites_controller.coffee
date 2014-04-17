Controller   = require('./controller')
User         = require('../models/user')

class StaticSitesController extends Controller
  before: ->
    'login'     : @redirectToProfileIfLoggedIn
    'register'  : @redirectToProfileIfLoggedIn
    'index'     : @redirectToProfileIfLoggedIn

  redirectToProfileIfLoggedIn: (req, res, next) =>
    if req.isAuthenticated()
      res.redirect '/me'
    else
      next()

  login: (req, res) -> res.render 'statics/login'

  register: (req, res) -> res.render 'statics/register'

  index: (req, res) -> res.render 'statics/index'

module.exports = StaticSitesController