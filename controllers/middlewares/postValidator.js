const { check, validationResult } = require('express-validator');

exports.postValidator = [
  check('title').trim().not().isEmpty().withMessage('Job title is not available'),
  check('company').trim().not().isEmpty().withMessage('company is not available'),
  check('role').trim().not().isEmpty().withMessage('Job is not available'),
  check('description').trim().not().isEmpty().withMessage('Job description is not available'),
  check('qualification').trim().not().isEmpty().withMessage('qualification is not available'),
  check('skills').trim().not().isEmpty().withMessage('skills is not available'),
  check('batch').trim().not().isEmpty().withMessage('batch is not available'),
  check('jobType').trim().not().isEmpty().withMessage('job type is not available'),
  check('image').trim().not().isEmpty().withMessage('image is not available'),
  check('salary').trim().not().isEmpty().withMessage('salary is not available'),
  check('location').trim().not().isEmpty().withMessage('location is not available'),
  check('link').trim().not().isEmpty().withMessage('link is not available'),
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
