const express = require('express')
const routes = express.Router()
const sessionController = require('../app/controllers/sessionController')
const userController = require('../app/controllers/userController')


// login/logout
routes.get('/login', sessionController.loginForm)
// routes.post('/login', sessionController.login)
// routes.post('/logout', sessionController.logout)

// reset password/forgot
routes.get('/forgot-password', sessionController.forgotForm)
routes.get('/password-reset', sessionController.resetForm)
// routes.post('/forgot-password', SessionValidator.forgot ,SessionController.forgot)
// routes.post('/password-reset', SessionValidator.reset, SessionController.reset)

// Rotas que o administrador irá acessar para gerenciar usuários
routes.get('/', userController.list) //Mostrar a lista de usuários cadastrados
routes.get('/create', userController.createForm) //Mostrar form de criação
routes.get('/show', userController.show) //Mostrar form de criação
routes.get('/:id/edit', userController.editForm) //Mostrar form de criação

// routes.post('/', userController.post) //Cadastrar um usuário
// routes.put('/', userController.put) // Editar um usuário
// routes.delete('/', userController.delete) // Deletar um usuário

module.exports = routes
