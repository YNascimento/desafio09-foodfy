const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')
const recipeController = require('../app/controllers/recipeController')

routes.get("/", recipeController.index); // LIST
routes.get("/create", recipeController.create); // CREATE
routes.get("/:id", recipeController.show); // SHOW
routes.get("/:id/edit", recipeController.edit); // EDIT

routes.post("/", multer.array('photos',5) ,recipeController.post); // POST
routes.put("/:id", multer.array('photos',5), recipeController.put); // PUT/ATT
routes.delete("/", recipeController.delete); // DELETE

module.exports = routes
