const Joi = require('joi');
const httpStatus = require('http-status');
const pick = require('../utils/pick');

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);
  if (error) {
    let errorsRes = {};
    if (error.details.length > 0) {
      const errors = error.details.map((details) => ({
        error: details.message.replace(/['"]/g, ''),
        key: details.context.key,
      }));
      errorsRes = {
        status: false,
        errors,
      };
    } else
      errorsRes = {
        status: false,
        error: 'Invalid request data. Please review request and try again.',
      };
    res.status(httpStatus.UNPROCESSABLE_ENTITY).send(errorsRes);
  } else {
    Object.assign(req, value);
    return next();
  }
};

module.exports = validate;
