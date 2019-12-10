
const router = require("express").Router();
// const path = require('path');              /// we need path if we use express-fileupload for uploading an image
const multer = require('multer');


var storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
})
/////////multer//////////

router.route('/').post(upload.single('file'), (req, res, next) => {
   const imageData = req.file.path;
  res.json({ fileName: req.file.originalname, filePath: imageData })
})


////////////express-fileupload////////


// router.route("/").post((req, res) => {
//     if (req.files === null) {
//         // bad response
//         return res.status(400).json({ msg: 'No file uploaded' });

//     }
//     const file = req.files.file;
//     var _dirname = path.resolve();
//     file.mv(`${_dirname}/client/public/uploads/tmp/${file.name}`, err => {
//         if (err) {
//             console.log(err);
//             // code error
//             return res.status(500).send(err);
//         }
//         res.json({ fileName: file.name, filePath: `/uploads/tmp/${file.name}` });
//     })

// });
/////////////////////////////////////////////////////////////////////////////


module.exports = router;