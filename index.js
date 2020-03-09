//server to handle the requests

var express=require("express");
var bodyParser=require('body-parser');
var path = require('path');
var cors = require('cors');
const twig = require('twig');
var connection = require('./config');
var app = express();

//set routes
var authenticateController=require('./controllers/authenticate-controller');
var registerController=require('./controllers/register-controller');
var admin_authenticateController=require('./controllers/admin-controller');

//set path to access contents of public folder
app.use(express.static(path.join(__dirname, 'public'))); 

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//set view engine
app.set('view engine','html');
app.engine('html', twig.__express);
app.set('views','views');


//handle requests here
app.get('/', function (req, res) {  
   res.sendFile( __dirname + "/views" + "/index.html" );  

})  
 
app.get('/signup', function (req, res,html) {
   res.sendFile(path.join(__dirname+ "/views" + "/signup.html"));
})

app.get('/admin', function (req, res) {

   res.sendFile( __dirname + "/views" + "/adminlogin.html" );  

});


/* route to handle login and registration 
app.post('/api/register',registerController.register);
app.post('/api/authenticate',authenticateController.authenticate);*/
 
console.log(authenticateController);
app.post('/controllers/register-controller', registerController.register);
app.post('/controllers/authenticate-controller', authenticateController.authenticate);
app.post('/controllers/admin-controller', admin_authenticateController.adminauthenticate);

//local listening port - change to ENV variable 
app.listen(3000);
