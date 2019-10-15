const db = require("../models");

// Defining methods for the adController
module.exports = {

    findAll: function (req, res) {
        db.Ad
            .findAll()
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(500).json(err));
    },
    findByCategory: function (req, res) {
        db.Ad
            .findAll({ where: { category: req.params.category } })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(500).json(err));
    },
    create: function (req, res) {
        db.Ad
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(500).json(err));
    }

};


