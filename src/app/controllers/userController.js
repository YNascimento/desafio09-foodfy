const User = require("../models/User")
const crypto = require('crypto')
const {hash} = require('bcryptjs')
const mailer = require('../../lib/mailer')


module.exports = {
    async list(req,res){
        const users = await User.all()
        return res.render('admin/users/list', {users})
    },
    createForm(req,res){
        return res.render('admin/users/create')
    },
    async adminCreate(req,res){
        const user = req.body
        
        // user.password = crypto.randomBytes(8).toString("hex")
        user.password = "123"

        //enviar email com senha gerada
        await mailer.sendMail({
            to: user.email,
            from: 'no-reply@foodfy.com.br',
            subject: 'Conta Criada. Aqui está sua senha!',
            html: `<h2>Criamos uma senha pra você!</h2>
            <p> Caso queria alterá-la, vá em "Esqueci minha senha" </p>
            <p>${user.password}</p>`,
        })

        if(user.isAdmin == "1") user.isAdmin = true
        else user.isAdmin = false
        
        //password's hash
        user.password = await hash(user.password, 8)

        await User.create(user)
        let users = await User.all()
        return res.render('admin/users/list', {users ,success: "Cadastro feito com sucesso!"})
    },
    indexForm(req,res){
        return res.render('admin/users/index', {user : req.user})
    },
    async indexUpdate(req,res){
        const user = req.user
        const {name, email} = req.body

        await User.update(user.id, { name, email })

        return res.render(`admin/users/index`, {
            user: req.body,
            success: "Conta atualizada com sucesso!"
        })
    },
    async editForm(req,res){
        let id = req.params.id
        let results = await User.find({ where: {id} })
        const user = results

        return res.render('admin/users/edit', {user})
    },
    async adminUpdate(req,res){
        const id = req.params.id
        const {name, email} = req.body

        await User.update(id, { name, email })

        return res.render(`admin/users/edit`, {
            user:req.body,
            success: "Conta atualizada com sucesso!"
        })
    },
    async delete(req,res){

        const id = req.body.id
        await User.delete(id)

        const users = await User.all()
        return res.render('admin/users/list', {
            users,
            success: "Usuário Excluido com sucesso!"
        })
    }
}