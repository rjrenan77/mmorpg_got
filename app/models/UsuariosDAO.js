function UsuariosDAO(connection){

    this._connection = connection();
}

    
UsuariosDAO.prototype.inserirUsuario = function(usuario){
    //abri conexao com o servidor e me conectei ao banco de dados
    this._connection.open(function(err, mongoclient ){
        //executa funcao collection que permite a manipulacao dos documentos
        mongoclient.collection("usuarios", function(err, collection){
            collection.insert(usuario);
            
            mongoclient.close();
        });
    });
    
    
    
};



UsuariosDAO.prototype.autenticar = function(usuario, req, res){
    this._connection.open(function(err,mongoclient){
        mongoclient.collection("usuarios", function(err,collection){
            collection.find({usuario: {$eq: usuario.usuario}, senha: {$eq: usuario.senha}}).toArray(function(err,result){
                
                if(result[0] != undefined){
                    //variaveis de sessao criada que existe enquanto nao fechar o navegador
                    req.session.autorizado = true;

                    req.session.usuario = result[0].usuario;

                    req.session.casa = result[0].casa;

                }

                //redirecionamento caso esteja autorizado
                if(req.session.autorizado){
                    
                    res.redirect("jogo");

                }else{
                    res.render("index", {validacao:{}})
                }
              
                //  console.log(result)
            });

            //mongoclient.close();
        })

    });

}





module.exports = function() {
    return UsuariosDAO;
}