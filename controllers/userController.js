const db = require("../models");

// Defining methods for the userController
module.exports = {


    create: function (req, res) {
        db.User
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(500).json(err));
    }

};


