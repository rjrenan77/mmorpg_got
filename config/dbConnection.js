// importar o mongodb
var mongo = require("mongodb");

//variavel que nao permite que se crie varias conexoes com o banco de dados
var connMongoDB = function(){

   
        console.log("entrou")
        var db = new mongo.Db(
            //banco de dados
            "got",
            //objeto de conexao
            new mongo.Server(
                /*endereco do banco de dados*/"localhost",
                /**porta */27017,
                /*opçoes de configuracao adicionais */{}
                ),
            {}
        );
    
        return db;
}

//exportando essa conexao
module.exports = function(){
    
    return connMongoDB;
}




