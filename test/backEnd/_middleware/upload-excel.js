/**
 * Upload Excel handler
 */
const multer = require("multer")
const path = require("path")

// Excel file to be stored in uploads
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/excel")
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  },
})

// Controlling the uploaded file
const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === "application/vnd.ms-excel" ||
    file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    callback(null, true)
  } else {
    callback(null, false)
    return callback(new Error("Only .xls and .xlsx format allowed!"))
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
          message: `File / Excel Upload Error: ${err.message}`,
        })
      } else {
        next()
      }
    })
  }
}
