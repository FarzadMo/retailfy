
const router = require("express").Router();
const path = require('path');

router.route("/").post((req, res) => {
    if (req.files === null) {
        // bad response
        return res.status(400).json({ msg: 'No file uploaded' });

    }
    const file = req.files.file;
    var _dirname = path.resolve();
    file.mv(`${_dirname}/client/public/uploads/tmp/${file.name}`, err => {
        if (err) {
            console.log(err);
            // code error
            return res.status(500).send(err);
        }
        res.json({ fileName: file.name, filePath: `/uploads/tmp/${file.name}` });
    })

});

module.exports = router;