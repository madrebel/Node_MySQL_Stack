
var Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');

var path = require('path');
 
var connection = require('./../config');

module.exports.authenticate=function(req,res){
    var email=req.body.email;
    var password=req.body.password;
   
   
    connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
       
        if(results.length >0){
            decryptedString = cryptr.decrypt(results[0].password);
            if(password==decryptedString){
              //res.sendFile("/NodeUserRegistration/views/welcome.html");
              //console.log(results[0].firstname); 
              res.render('welcome', { result : results[0].firstname} );
              /* res.json({
                    status:true,
                    message:'successfully authenticated'
                }) */
                
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
