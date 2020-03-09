//to authenticate admin login and to load all users 

var path = require('path');
 
var connection = require('./../config');

module.exports.adminauthenticate=function(req,res){
    
    var email=req.body.email;
    var password=req.body.password;
   
   
    connection.query('SELECT * FROM admin WHERE email = ?',[email], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message: error
            })
      }else{
       
        if(results.length >0){
            decryptedString = results[0].password;
            if(password==decryptedString){
             
                connection.query('select email, firstname, lastname from users', function (error, details) {
   
                    if (error)
                    {
                       throw error;
                    }else{
                       res.render('admin',{
                          posts : details
                       });
                    }     
              });

                
            }else{
                res.json({
                  status:false,
                  message:"Email and password does not match"
                 });
            }
          
        }
        else{
          res.json({
            status:false,    
            message:"Email does not exits"
          });
        }
      }
    });
}
