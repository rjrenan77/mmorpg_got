module.exports.cadastro = function(application, req, res) {
    res.render("cadastro",{validacao: {},dadosForm:{}});
}

module.exports.cadastrar = function(application, req, res) {
    var dadosForm = req.body;

    req.assert("nome", " Nome não pode ser vazio").notEmpty();
    req.assert("usuario", " Usuário não pode ser vazio").notEmpty();
    req.assert("senha", " Senha não pode ser vazio").notEmpty();
    req.assert("casa", " Casa não pode ser vazio").notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.render("cadastro", {validacao: erros, dadosForm: dadosForm});
        return;
    }


    var connectio = application.config.dbConnection;
    
    //criando objeto de usuario e enviando os dados do controller para o model
    var UsuariosDAO = new application.app.models.UsuariosDAO(connectio);
    UsuariosDAO.inserirUsuario(dadosForm);
    //geracao dos parametros
    var JogoDAO = new application.app.models.JogoDAO(connectio);
    JogoDAO.gerarParametros(dadosForm.usuario)
    

    res.send("podemos cadastrar");


}