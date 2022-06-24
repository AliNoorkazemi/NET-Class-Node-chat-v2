var base_url = "/api/v1"
var signup = require('./authenticate/signup')

module.exports = function(app){
  
  app.use(`${base_url}/auth/signup`, function(req, res){
     signup(req, res)
  });

  app.get(`${base_url}/auth/login`, function(req, res){

  });

}