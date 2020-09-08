const express = require('express')
const routes = express.Router()
const sessionController = require('../app/controllers/sessionController')
const userController = require('../app/controllers/userController')
const userValidator = require('../app/validators/user')
const sessionValidator = require('../app/validators/session')

// login/logout
routes.get('/login', sessionController.loginForm)
routes.post('/login', sessionValidator.login,sessionController.login)
routes.post('/logout', sessionController.logout)

// reset password/forgot
routes.get('/forgot-password', sessionController.forgotForm)
routes.get('/password-reset', sessionController.resetForm)
routes.post('/forgot-password', sessionValidator.forgot, sessionController.forgot)
routes.post('/password-reset', sessionValidator.reset, sessionController.reset)

// ADMIN
routes.get('/create', userController.createForm) //Mostrar form de criação
routes.get('/', userController.list) //Mostrar a lista de usuários cadastrados
routes.get('/:id/edit', userController.editForm) //Mostrar form de edição

routes.post('/', userValidator.adminCreate, userController.adminCreate) //Cadastrar um usuário
routes.put('/:id/edit',userValidator.adminUpdate, userController.adminUpdate) // Update de usuário por admin
routes.delete('/', userController.delete) // Deletar um usuário

//USER
routes.get('/:id', userValidator.indexForm, userController.indexForm) //Mostrar usuário logado
routes.put('/:id',userValidator.indexUpdate, userController.indexUpdate) // Update de usuário por usuário

module.exports = routes
