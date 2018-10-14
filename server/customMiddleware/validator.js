import validator from 'validator';

const validate = (req, res, next) => {
  // empty string
  // whole number
  // string
  //
  /*eslint-disable */
  if (Object.keys(req.body).length !== 0) {
    try {
      for (const param of Object.keys(req.body)) {
        if (validator.isEmpty(req.body[param]) || !(/\S/.test(req.body[param]))) {
          return res.status(422).json({
            success: false,
            message: `${param} should not be empty`,
          });
        }
      }
    } catch ({ message }) {
      return res.status(422).json({
        success: false,
        message,
      });
    }
  }

  if (Object.keys(req.params).length !== 0) {
    try {
      for (const param of Object.keys(req.params)) {
        if (!validator.isInt(req.params[param])) {
          return res.status(422).json({
            success: false,
            message: `invalid ${param}`,
          });
        }
      }
    } catch ({ message }) {
      return res.status(422).json({
        success: false,
        message,
      });
    }
  }
  /* eslint-enable */

  return next();
};

export const validateURI = (req, res, next) => {
  try {
    decodeURIComponent(req.path);
    return next();
  } catch ({ message }) {
    return res.status(400).json({
      success: false,
      message,
    });
  }
};

export default validate;
