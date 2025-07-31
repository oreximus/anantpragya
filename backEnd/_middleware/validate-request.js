/**
 * A validate request handler that helps to validate incoming inputs
 * Supports validation of req.body, req.params, and req.query
 */

module.exports = (req, res, next, schema, source = "body") => {
  const options = {
    abortEarly: false, // To include all errors
    allowUnknown: false, // ignore unknown props
    stripUnknown: false, // remove unknown props
  };

  // Determine what to validate based on source parameter
  let dataToValidate;
  switch (source) {
    case "params":
      dataToValidate = req.params;
      break;
    case "query":
      dataToValidate = req.query;
      break;
    case "body":
    default:
      dataToValidate = req.body;
      break;
  }

  const { error, value } = schema.validate(dataToValidate, options);

  if (error) {
    const { details } = error;
    // return response
    res.status(406);
    res.json({
      status: false,
      message: details.map((x) => ({
        label: "error",
        message: x.message,
      })),
    });
  } else {
    // Update the appropriate request object with validated value
    switch (source) {
      case "params":
        req.params = value;
        break;
      case "query":
        req.query = value;
        break;
      case "body":
      default:
        req.body = value;
        break;
    }
    next();
  }
};
