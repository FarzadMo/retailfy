const db = require("../models");
let fs = require("fs");

// Defining methods for the adController
module.exports = {
  findAll: function (req, res) {
    db.Ad.findAll()
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(500).json(err));
  },
  findByCategory: function (req, res) {
    db.Ad.findAll({ where: { category: req.params.category } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(500).json(err));
  },
  create: function (req, res) {

    if (!req.session.loggedin) {
      res.status(400).end("You need to sign in to create an experience");
    } else {
      //set the user id from the session

      req.body.UserId = req.session.UserId;
 
      //store the new experience on the database

      db.Ad.create(req.body)
        .then(function (ad) {

          //////////////// this part would be used if we use express-fileupload for uplaoding an image/////////
          //if there is file sent
         
          // if (req.body.image !== "") {
           
          //   //check if the exists in the upload folder
          //   if (fs.existsSync(`./client/public/uploads/tmp/${req.body.image}`)) {
          //     //rename the file and move it to definitive folder
          //     fs.renameSync(
          //       `./client/public/uploads/tmp/${req.body.image}`,
          //       `./client/public/uploads/${ad.image}`
          //     );
          //   }
          // }
          /////////////////////////////////////////////////////////////////
          res.json(ad);
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
  findAdById: function (req, res) {
    db.Ad.findByPk(parseInt(req.params.id))
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(500).json(err));
  },

  remove: function (req, res) {
    db.Ad.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (result) {
      res.json(result);
    }).catch(err => {
      if (err.errors) {
        res.status(400).end(err.errors[0].message);
      }
      else {
        res.status(500).end(err.message);
      }
    });

  },
  edit: function (req, res) {
    // update a row in database using update in sequelize- use where after new data
    // db.model.update(newdata, {where:{id:req.param.id}})
    db.Ad.update(

      {
        title: req.body.title,
        location: req.body.location,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price,
        category: req.body.category,
        contactEmail: req.body.contactEmail
      },
      { where: { id: req.params.id } }


    ).then(function (result) {

      console.log("results" + result)
    }).catch(err => {
      if (err.errors) {
        res.status(400).end(err.errors[0].message);
      }
      else {
        res.status(500).end(err.message);
      }
    });

  },

  findAdsByUserId: function (req, res) {
    db.Ad.findAll({ where:{userId: req.params.id }})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(500).json(err));
  }
};
