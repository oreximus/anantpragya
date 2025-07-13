/**
 * Validate Request
 */
module.exports = validateRequest

function validateRequest(req, res, next, schema, type = "body") {
  const options = {
    abortEarly: false, // Include all errors
    allowUnknown: true, // Allow unknown props
    stripUnknown: true, // Strip unknown props
  }

  let objToValidate
  if (type === "params") {
    objToValidate = req.params
  } else if (type === "query") {
    objToValidate = req.query
  } else {
    objToValidate = req.body
  }

  const { error, value } = schema.validate(objToValidate, options)
  if (error) {
    next(`Validation error: ${error.details.map((x) => x.message).join(", ")}`)
  } else {
    if (type === "params") {
      req.params = value
    } else if (type === "query") {
      req.query = value
    } else {
      req.body = value
    }
    next()
  }
}
