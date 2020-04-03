var express = require("express");
var login = require('./routes/loginroutes');
const csvdata = '../client/src/components/userContext/sample.csv'; 
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var cors = require('cors');


var app = express();
app.use(fileUpload());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); 

var router = express.Router();
 
app.get("/movie", function(req, res, next) {
    res.send(csvdata);
  });
  
//route to handle user registration
router.post('/register',login.register);
router.post('/login',login.login)
router.post('/upload', login.upload)
router.post('/locations',login.locations);
router.post('/postFIle', login.postFile);
router.get('/location', login.location);  
app.use('/api', router);

app.listen(5000);