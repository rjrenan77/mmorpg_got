module.exports.index = (application, req, res) => {

    res.render("index", {validacao:{}});

}


module.exports.autenticar = (application, req, res) => {

    var dadosForm = req.body;

    req.assert("usuario", "Usuário não deve ser vazio!").notEmpty();

    req.assert("senha", "Senha não deve ser vazio!").notEmpty();

    var erros =  req.validationErrors();

    if(erros){
        res.render("index", {validacao:erros});
        return;
    }

    //criando metodos de autenticacao de usuario
    var connection = application.config.dbConnection;
    //metodo de autenticacao
    var UsuariosDAO = new application.app.models.UsuariosDAO(connection);
    UsuariosDAO.autenticar(dadosForm, req, res);


   
}