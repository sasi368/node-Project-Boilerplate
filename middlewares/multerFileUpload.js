import multer from "multer";
import path from "path";

var defaultVal = multer().none();
// For file upload
var storage = multer.diskStorage({
  destination: "./public/Images",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
  },
});
var upload = multer({
  storage: storage,
});
//

export { defaultVal, upload };
