/**
 * Upload image handler
 */
const fs = require("fs")
const multer = require("multer")
const path = require("path")

// Image to be stored in uploads
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const year = new Date().getFullYear()
    const month = (new Date().getMonth() + 1).toString().padStart(2, "0")
    const filesDir = path.join(__dirname, "..", "public", "uploads", "posts", String(year), String(month))

    // Synchronously create the directory if it doesn't exist
    try {
      fs.mkdirSync(filesDir, { recursive: true })
      console.log(`Directory created or already exists: ${filesDir}`)
    } catch (error) {
      console.error(`Error creating directory ${filesDir}:`, error)
      return callback(error) // Pass the error to Multer
    }

    // Store the relative path for database
    file["uploaded_path"] = path.join("uploads", "posts", String(year), String(month))
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
