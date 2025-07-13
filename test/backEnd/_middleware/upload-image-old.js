/**
 * Upload image handler
 */
const fs = require("fs")
const multer = require("multer")
const path = require("path")

// Image to be stored in uploads
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const filesDir = path.join(__dirname, "..", "public", "uploads")
    if (!fs.existsSync(filesDir)) {
      fs.mkdirSync(filesDir)
    }
    callback(null, filesDir)
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  },
})

// Controlling the uploaded file
const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/webp"
  ) {
    callback(null, true)
  } else {
    callback(null, false)
    return callback(new Error("Only .png, .webp, .jpg and .jpeg format allowed!"))
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
})

module.exports = (name) => {
  return (req, res, next) => {
    const fileUpload = upload.single(name)
    fileUpload(req, res, (err) => {
      if (err) {
        res.json({
          status: false,
          message: `File / Image Upload Error: ${err.message}`,
        })
      } else {
        next()
      }
    })
  }
}
