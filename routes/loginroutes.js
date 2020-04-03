var mysql = require('mysql');
var bcrypt = require('bcrypt');
require('dotenv').config();
const nodemailer = require('nodemailer');
const log = console.log;
const path = './client/public/uploads/';


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodejs'
});
connection.connect(function (err) {
  if (!err) {
    console.log("Database is connected ... ");
  } else {
    console.log("Error connecting database ... ");
  }
});

exports.register = function (req, res) {
  var pwd = req.body.password;
  req.body.password = bcrypt.hashSync(pwd, 10);
  // console.log("req",req.body);
  var today = new Date();
  var users = {
    "first_name": req.body.first_name,
    "last_name": req.body.last_name,
    "email": req.body.email,
    "role": req.body.role,
    "password": req.body.password,
    // "created": today,
    // "modified": today
    // Hash the password before insert it into the database.


  }

  connection.query('INSERT INTO users SET ?', users, function (error, results, fields) {
    if (error) {
      console.log("error ocurred", error);
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    } else {
      console.log('The solution is: ', results);
      res.send({
        "code": 200,
        "success": "user registered sucessfully"
      });
    }
  });
}

exports.locations = function (req, res) {
  // console.log("req",req.body);
  var today = new Date();
  var locations = {
    "Location": req.body.location,
    "created": today,
    "modified": today
  }
  connection.query('INSERT INTO locations SET ?', locations, function (error, results, fields) {
    if (error) {
      console.log("error ocurred", error);
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    } else {
      console.log('The solution is: ', results);
      res.send({
        "code": 200,
        "success": "locations updated sucessfully"
      });
    }
  });
}

exports.location = function (req, res) {
  connection.query('select * from locations', function (error, results, fields) {
    if (error) {
      console.log("error ocurred", error);
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    } else {
      res.send({
        "code": 200,
        "results": results
      })
    }
  });
}

var connection2 = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'www'
});
connection2.connect(function (err) {
  if (!err) {
    console.log("Database is connected ... ");
  } else {
    console.log("Error connecting database ... ");
  }
});

exports.csvData = function (req,res) { 
}

exports.postFile = function (req, res) {
  console.log(req.files.name)
  if (req.files === null) {
    console.log("I got here " + req.files.name)
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;
  file.mv(`${path}/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `${path}/${file.name}` });
    mailerFun();
  });
}
exports.upload = function (req, res) {
  const insertdata = "insert into upload (fileName) values('" + req.body.name + "')";
  connection.query(insertdata, (err, results) => {
    if (err) {
      return res.send(err);
    }
    else {

      return res.send('added success!!!');
      console.log('added success!!! yaaaaayyyyyyyy');
      mailerFun()
    }
  });
}

const mailerFun = () => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // TODO: your gmail account
      pass: process.env.PASSWORD  // TODO: your gmail password
    }
  });

  // Step 2
  let mailOptions = {
    from: 'sowealieu@gmail.com', // TODO: email sender
    to: 'alieu05@live.com,manjunath.akalawadi0070@stud.hkr.se', // TODO: email receiver
    subject: 'New FCS file has been Uploaded ',
    text: 'Dear User, Please be informed that a new FCS file uploaded from your application. Kindly perform datamining task on the file.'
  };

  // Step 3
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return log('Error occurs' + err.message.toString());
    }
    return log('Email sent!!!');
  });
}
exports.login = function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  connection.query('SELECT * FROM users WHERE email= ?', [email], function (error, results, fields) {
    if (error) {
      // console.log("error ocurred",error);
      res.send({
        "code": 400,
        "failed": "Your have entered invalid login credentials"
      })
    }
    else {
      // console.log('The solution is: ', results);
      if (results.length > 0) {
        if (results[0].password == password && results[0].email == email)
         {
          res.send({
            "code": 200,
            "success": "login sucessfull",
            "role": "admin",
            "email":`${email}`,
            "pass": `${password}`
          });
        }
        else if (results[0].password != password && results[0].email != email)
        {
          res.send({
            "code": 204,
            "failed": "Invalid credentials entered!" 
          });
        }
          
      }
    }
  })
}
