const { body } = require("express-validator");
const validate = {};

validate.userRules = () => {
  return [
    // Name is required
    body("name")
      .trim()
      .notEmpty()
      .withMessage("User name is required.")
      .isLength({ min: 2, max: 50 })
      .withMessage("Name must be between 2 and 50 characters."),

    // Email is required, must be valid format
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Please provide a valid email address.")
      .normalizeEmail(),

    // Phone (optional, must match regex)
    body("phone")
      .optional()
      .trim()
      .matches(/^\+?[0-9]{7,15}$/)
      .withMessage("Please provide a valid phone number."),

    // Address (optional object)
    body("address")
      .optional()
      .isObject()
      .withMessage("Address must be an object."),
    body("address.street")
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage("Street must be under 100 characters."),
    body("address.city")
      .optional()
      .trim()
      .isLength({ max: 50 })
      .withMessage("City must be under 50 characters."),
    body("address.state")
      .optional()
      .trim()
      .isLength({ max: 50 })
      .withMessage("State must be under 50 characters."),
    body("address.zip")
      .optional()
      .trim()
      .matches(/^\d{5}(-\d{4})?$/) // US ZIP or ZIP+4
      .withMessage("Please provide a valid ZIP code."),

    // createdAt should never be user-supplied, ignore if sent
    body("createdAt").not().exists().withMessage("createdAt is read-only."),
  ];
};

module.exports = validate;
