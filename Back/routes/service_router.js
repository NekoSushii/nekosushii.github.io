const controller = require('../controllers/service_controller')

module.exports=function(app){
    /* app.use(function(req,res,next){
        next();
    }) */
    app.get('/homepage',controller.homepage)
}
