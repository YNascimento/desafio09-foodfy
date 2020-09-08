const User = require("../models/User")
const {compare} = require('bcryptjs')

function checkFields(body){
    for(key of Object.keys(body)){
        if(body[key] == "" && key != "isAdmin"){
            return {
                user:body,
                error: "Preencha todos os campos!"
            }
        }
    }
}

module.exports = {
    async adminCreate(req,res,next){

        //check if fields filled
        const isFieldsFilled = checkFields(req.body)
        if(isFieldsFilled)
            return res.render("admin/users/create", isFieldsFilled)
        
        const {name, email} = req.body

        //check if user exists
        const user = await User.find({
            where: {email}
        })

        if(user) return res.render('admin/users/create', {
            user: req.body,
            error: "Usuário já cadastrado."
        })
        
        next()
    },
    async adminUpdate(req,res,next){
        const {id} = req.params

        //check if fields filled
        const isFieldsFilled = checkFields(req.body)
        if(isFieldsFilled)
            return res.render("admin/users/index", isFieldsFilled)

        next()
    },
    async indexForm(req,res,next){
        let id = req.params.id

        let results = await User.find({
            where:{id}
        })
        const user = results

        if(!user) return res.render('session/login', {error: "Acesso não permitido."})
        req.user = user
        next()
    },
    async indexUpdate(req,res,next){
        const {id} = req.params


        //check if fields filled
        const isFieldsFilled = checkFields(req.body)
        if(isFieldsFilled)
            return res.render("admin/users/index", isFieldsFilled)
        
        const {password} = req.body
        if(!password) {
            console.log('if !password')
            return res.render("admin/users/index", {
                user: req.body, 
                error:"Coloque sua senha para atualizar seu cadastro"
            })
        }

        const user = await User.find({ where: {id} })
        
        const samePassword = await compare(password, user.password)
        // if(password == "b23a2eecb056c82a") samePassword=true
        if(!samePassword) {
            console.log('if !samePassword')

            return res.render('admin/users/index', {
            user:req.body,
            error: "Senha incorreta!"
            })
        }

        req.user = user
        next()
    },
}