const express = require('express')
const routes = express.Router()
const sessionController = require('../app/controllers/sessionController')


// login/logout
routes.get('/login', sessionController.loginForm)
// routes.post('/login', sessionController.login)
// routes.post('/logout', sessionController.logout)

// reset password/forgot
routes.get('/forgot-password', sessionController.forgotForm)
routes.get('/password-reset', sessionController.resetForm)
// routes.post('/forgot-password', SessionValidator.forgot ,SessionController.forgot)
// routes.post('/password-reset', SessionValidator.reset, SessionController.reset)

module.exports = routes
