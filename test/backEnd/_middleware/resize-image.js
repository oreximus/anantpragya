/**
 * Resize image handler
 */
const sharp = require("sharp")
const path = require("path")
const fs = require("fs")

module.exports = async (req, res, next) => {
  if (!req.file) return next()

  const outputFileName = `resized-${Date.now()}.webp`
  const outputPath = path.join(req.file.destination, outputFileName)

  try {
    await sharp(req.file.path)
      .resize({ width: 800 }) // Resize to a max width of 800px
      .webp({ quality: 80 }) // Convert to webp and set quality
      .toFile(outputPath)

    // Update req.file to point to the new resized file
    req.file.filename = outputFileName
    req.file.path = outputPath
    req.file.mimetype = "image/webp" // Update mimetype

    // Delete the original uploaded file
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Error deleting original file:", err)
    })

    next()
  } catch (error) {
    console.error("Error resizing image:", error)
    res.json({
      status: false,
      message: `Image processing error: ${error.message}`,
    })
  }
}
