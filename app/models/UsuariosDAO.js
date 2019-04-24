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

module.exports = function() {
    return UsuariosDAO;
}