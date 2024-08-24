const { body } = require('express-validator');

module.exports = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name cannot be empty!')
    .isLength({ min: 1, max: 255 })
    .withMessage('Name must be between 1 and 255 characters'),
  body('imgURL')
    .trim()
    .optional({ values: 'falsy' })
    .isLength({ min: 1, max: 255 })
    .withMessage('The image url must be between 1 and 255 characters'),
];