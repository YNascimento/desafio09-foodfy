const express = require('express')
const routes = express.Router()
const recipes = require('./recipes')
const chefs = require('./chefs')
const users = require('./users')
const homeController = require('../app/controllers/homeController')

//homeController
routes.get('/', homeController.index) //index
routes.get('/recipes', homeController.recipes)//receitas
routes.get('/about', homeController.about)//sobre
routes.get('/recipes/:id', homeController.show) //detalhes receita
routes.get('/chefs', homeController.chefs)//chefs
routes.get('/recipes/busca',homeController.busca) //filtro

//alias
routes.get("/admin", function(req,res){res.redirect("/admin/recipes")})

//session
routes.use('/users',users)

//ADMIN - RECIPES
routes.use('/admin/recipes',recipes)

//ADMIN - CHEFS
routes.use('/admin/chefs',chefs)


module.exports = routes