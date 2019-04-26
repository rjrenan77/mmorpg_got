module.exports.jogo = (application, req, res)=>{

    
    if(req.session.autorizado !== true){

        res.send("Usuário precisa se autenticar!")
        return;
     

    }
        var msg = "";
        if(req.query.msg != ""){

            msg = req.query.msg;

        }

        console.log(msg)

        var usuario=req.session.usuario;
        var casa=req.session.casa;
        var connectio = application.config.dbConnection;
        var JogoDAO = new application.app.models.JogoDAO(connectio);
        JogoDAO.iniciaJogo(res , usuario,casa,msg);
        


}

module.exports.sair = (application, req, res) => {
    req.session.destroy((err)=>{
        res.render("index",{validacao:{}})
    });
}

module.exports.suditos = (application, req, res) => {
    if(req.session.autorizado !== true){

        res.send("Usuário precisa se autenticar!")
        return;
     

    }

    res.render("aldeoes");

}

module.exports.pergaminhos = (application, req, res) => {
    if(req.session.autorizado !== true){

        res.send("Usuário precisa se autenticar!")
        return;
     

    }

    //recuperar acoes do banco de dados
    var connection = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(connection)

    var usuario = req.session.usuario;

    JogoDAO.getAcoes(usuario, res);
    
}

module.exports.ordenar_acao_sudito = (application, req, res ) => {

    if(req.session.autorizado !== true){

        res.send("Usuário precisa se autenticar!")
        return;
     

    }
    
    var dados = req.body;

    req.assert("acao", "Ação deve ser informada!").notEmpty();
    req.assert("quantidade", "Quantidade deve ser informada!").notEmpty()

    var erros = req.validationErrors();

    if(erros){
        res.redirect("jogo?msg=A");
        return;
    }

    var connection = application.config.dbConnection;
    var JogoDAO  = new application.app.models.JogoDAO(connection);
    dados.usuario = req.session.usuario;
    JogoDAO.acao(dados);

    res.redirect("jogo?msg=B");
}

module.exports.revogar = function(application,req,res){
    var url_query = req.query;
    //res.send(url_query)

    var connection = application.config.dbConnection;
    var JogoDAO  = new application.app.models.JogoDAO(connection);

    var _id = url_query.id_acao;
    JogoDAO.revogar(_id, res);
}