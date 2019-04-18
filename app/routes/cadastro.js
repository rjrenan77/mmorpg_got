module.exports = function(application){

    application.get("/cadastro", (req,res)=>{
        application.app.controllers.cadastro.cadastro(application,req,res);
      
       
    })

}