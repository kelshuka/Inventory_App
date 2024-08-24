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
    .notEmpty()
    .withMessage('The image url cannot be empty')
    .isLength({ min: 1, max: 255 })
    .withMessage('The image url must be between 1 and 255 characters'),
  body('description')
    .trim()
    .optional({ values: 'falsy' })
    .isLength({ min: 1, max: 500 })
    .withMessage('Description must be between 1 and 500 characters'),
  body('prices')
    .trim()
    .notEmpty()
    .withMessage('Price cannot be empty')
    .isInt()
    .withMessage('Price must be an integer'),
  body('rating')
    .trim()
    .notEmpty()
    .withMessage('Rating cannot be empty')
    .isNumeric()
    .withMessage('Rating can be an integer or a float')
    .isLength({ min: 1, max: 3 })
    .withMessage('Rating must be between 1 and 3 characters'),
  body('publisher')
    .trim()
    .notEmpty()
    .withMessage('Publisher cannot be empty')
    .isLength({ min: 1, max: 255 })
    .withMessage('Publisher must be between 1 and 255 characters'),
  body('publishingDate')
    .trim()
    .notEmpty()
    .withMessage('Th publishing date cannot be empty')
    .isDate()
    .withMessage('The publishing date must be in a date format')
    .isLength({ min: 1, max: 255 })
    .withMessage('Publish date must be between 1 and 255 characters'),
  body('quantity')
    .trim()
    .notEmpty()
    .withMessage('The quantity in stock cannot be empty')
    .isInt()
    .withMessage('The quantity number must be an integer')
    .isLength({ min: 1 })
    .withMessage('There must be at least 1 quantity in stock!'),
  body('genre')
    .trim()
    .notEmpty()
    .withMessage('The genre of the game cannot be empty')
    .isLength({ min: 1, max: 255 })
    .withMessage('Genre must be between 1 and 255 characters'),
 
];