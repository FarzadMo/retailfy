const db = require("../models");
const bcrypt = require("bcrypt");

// Defining methods for the userController
module.exports = {
  create: function(req, res) {
    let pwd;
    //checks if the password field was passed
    try {
      pwd = req.body.password.trim();
    } catch (e) {
      console.log("The password field is expected!");
      res.status(500).end("The password field is expected!");
    }

    //password validations
    if (pwd === "") {
      res.status(400).end("Password must be informed!");
    } else if (pwd.length < 8) {
      res.status(400).end("Password must have at least 8 characters!");
    } else {
      //crypt the password
      req.body.password = bcrypt.hashSync(pwd, 10);
    }

    db.User.create(req.body)
      .then(function(result) {
        res.json(result);
      })
      .catch(err => {
        if (err.errors) {
          res.status(400).end(err.errors[0].message);
        } else {
          res.status(500).end(err.message);
        }
      });
  },

  findOne: function(req, res) {
    try {
      //check if the required fields are empty
      if (req.body.email.trim() === "" || req.body.password.trim() === "") {
        res.status(400).end("E-mail and/or Password must be informed!");
      }
    } catch (e) {
      res.status(500).end("email and password fields must be passed!");
    }

    //find the user by email in the database
    db.User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(function(user) {
        if (user) {
          //compare the password sent with the hash stored in the database
          if (bcrypt.compareSync(req.body.password, user.password)) {
            // Passwords match
            req.session.loggedin = true;
            req.session.UserId = user.id;
            req.session.UserName = user.firstname;
            req.session.UserImage = user.image;
            res.status(200).end("User has signed up successfully!");
          } else {
            // Passwords don't match
            res.status(400).end("Incorrect Username and/or Password!");
          }
        } else {
          res.status(400).end("User was not found!");
        }
      })
      .catch(err => {
        if (err.errors) {
          res.status(400).end(err.errors[0].message);
        } else {
          res.status(500).end(err.message);
        }
      });
  },

  logOut: function(req, res) {
    req.session.destroy(err => {
      if (err) {
        console.log("Error destroying session:");
        console.log(err);
      } else {
        res.status(200).end("User was signed out successfully!");
      }
    });
  }
};
