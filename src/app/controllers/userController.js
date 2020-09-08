module.exports = {
    createForm(req,res){
        return res.render('admin/users/create')
    },
    editForm(req,res){
        return res.render('admin/users/edit')
    },
    list(req,res){
        return res.render('admin/users/list')
    },
    show(req,res){
        return res.render('admin/users/index')
    }
}