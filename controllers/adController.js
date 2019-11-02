const db = require("../models");

// Defining methods for the adController
module.exports = {
  findAll: function(req, res) {
    db.Ad.findAll()
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(500).json(err));
  },
  findByCategory: function(req, res) {
    db.Ad.findAll({ where: { category: req.params.category } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(500).json(err));
  },
  create: function(req, res) {
    if (!req.session.loggedin) {
      res.status(400).end("You need to sign in to create an experience");
    } else {
      //set the user id from the session
      req.body.UserId = req.session.UserId;

      //store the new experience on the database
      db.Ad.create(req.body)
        .then(function(exp) {
          //if there is file sent
          if (req.body.image !== "") {
            //check if the exists in the temp folder
            if (fs.existsSync(`./client/public/uploads/${req.body.image}`)) {
              //rename the file and move it to definitive folder
              fs.renameSync(
                `./client/public/uploads/${req.body.image}`,
                `./client/public/uploads/${exp.image}`
              );
            }
          }
          res.json(exp);
        })
        .catch(err => {
          if (err.errors) {
            res.status(400).end(err.errors[0].message);
          } else {
            res.status(500).end(err.message);
          }
        });
    }
  },
  findAdById: function(req, res) {
    db.Ad.findAll({ where: { id: req.params.id } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(500).json(err));
  }
};
