const Recipe = require('../models/Recipe')
const Chef = require('../models/Chef')
const File = require('../models/File')

module.exports = {
    async index(req,res){
        let results = await Recipe.all()
        const recipes = results.rows

        //array de promises para pegar imgs de receitas
        const filePromises = recipes.map(recipe => File.getFilesByRecipe(recipe.id))
        await Promise.all(filePromises).then((values) => {
 
            const files = values.map(file => ({...file[0]}))
            if(files){
                if(typeof files[0] !== 'undefined' && typeof files[0].id !== 'undefined'){
     
                    const files2 = files.map(file => ({
                        ...file,
                        src: `${req.protocol}://${req.headers.host}${file.path.replace('public','')}`
                    }))
                    return res.render('user/index', {recipes, files: files2})
                }
            }
            return res.render('user/index', {recipes})
 
        })
    },
    async recipes(req,res){

        //pagination prep
        let {filter, page,limit} = req.query
        page = page || 1
        limit = limit || 3
    
        let offset = limit*(page-1)
        let isBusca = 0 //bit para identificação se a req pro bd vem de filtro de busca ou não
        const params = { filter, page, limit, offset, isBusca }
        
        let results = await Recipe.paginate(params)
        const recipes = results.rows
        
        const pagination = {
            total: Math.ceil(recipes[0].total/limit), //total pages
            page
        }

        //getting recipe imgs
        //array de promises para pegar imgs de receitas
        const filePromises = recipes.map(recipe => File.getFilesByRecipe(recipe.id))
        await Promise.all(filePromises).then((values) => {
 
            const files = values.map(file => ({...file[0]}))
            if(files){
                if(typeof files[0] !== 'undefined' && typeof files[0].id !== 'undefined'){
                    const files2 = files.map(file => ({
                        ...file,
                        src: `${req.protocol}://${req.headers.host}${file.path.replace('public','')}`
                    }))
                    return res.render('user/recipes', {recipes, pagination, filter, files: files2})
                }
            }

            return res.render('user/recipes', {recipes,pagination, filter})
        })
    },
    about(req,res){
        return res.render('user/about')
    },
    async show(req, res){
        let results = await Recipe.find(req.params.id)
        const recipe = results.rows[0]

        if(!recipe) res.send("Recipe not found")

        results = await File.getFileIds(recipe.id)
        const fileIds = results.rows

        const filesPromises = fileIds.map(id => File.getFiles(id.file_id))
        await Promise.all(filesPromises).then((results) => {

            const files = results.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace('public','')}`
            }))
            return res.render('user/show',{recipe, files})
        })
    },
    async chefs(req,res){
        let results = await Chef.all()
        const chefs = results.rows

        const chefFilePromise = chefs.map(chef => File.getFiles(chef.file_id))
        await Promise.all(chefFilePromise).then(values => {
            
            files = values.map(file =>({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace('public','')}`
            }))
            return res.render('user/chefs', {chefs, files})
        })
    },
    async busca(req,res){
        let {filter, page,limit} = req.query
        page = page || 1
        limit = limit || 3
        let isBusca = 1 //bit para identificação se a req pro bd vem de filtro de busca ou não
        let offset = limit*(page-1)
        const params = {filter, page, limit, offset, isBusca}
        
        let results = await Recipe.paginate(params)
        const recipes = results.rows

        const pagination = {
            total: Math.ceil(recipes[0].total/limit), //total pages
            page
        }
        
        //getting recipe imgs
        //array de promises para pegar imgs de receitas
        const filePromises = recipes.map(recipe => File.getFilesByRecipe(recipe.id))
        await Promise.all(filePromises).then((values) => {
 
            const files = values.map(file => ({...file[0]}))
            if(files){
                if(typeof files[0] !== 'undefined' && typeof files[0].id !== 'undefined'){
                    const files2 = files.map(file => ({
                        ...file,
                        src: `${req.protocol}://${req.headers.host}${file.path.replace('public','')}`
                    }))
                    return res.render('user/filter', {recipes, pagination, filter, files: files2})
                }
            }
            return res.render('user/filter', {recipes,pagination, filter})
        })
    }
}