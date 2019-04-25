module.exports.jogo = (application, req, res)=>{

    
    if(req.session.autorizado !== true){

        res.send("Usuário precisa se autenticar!")
        return;
     

    }

        var usuario=req.session.usuario;
        var casa=req.session.casa;
        var connectio = application.config.dbConnection;
        var JogoDAO = new application.app.models.JogoDAO(connectio);
        JogoDAO.iniciaJogo(res , usuario,casa);
        


}

module.exports.sair = (application, req, res) => {
    req.session.destroy((err)=>{
        res.render("index",{validacao:{}})
    });
}

module.exports.suditos = (application, req, res) => {

    res.render("aldeoes");

}

module.exports.pergaminhos = (application, req, res) => {
    res.render("pergaminhos");
}