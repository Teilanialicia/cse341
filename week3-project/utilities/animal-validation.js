const { body } = require("express-validator");
const validate = {};

validate.animalRules = () => {
  return [
    // Name is required
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Animal name is required.")
      .isLength({ min: 1, max: 50 })
      .withMessage("Animal name must be between 1 and 50 characters."),

    // Species is required and must be one of the allowed enum values
    body("species")
      .trim()
      .notEmpty()
      .withMessage("Species is required.")
      .isIn(["dog", "cat", "rabbit", "shrimp", "bird", "fish", "other"])
      .withMessage("Invalid species value."),

    // Status must be valid (defaults handled by schema)
    body("status")
      .optional()
      .isIn(["available", "pending", "adopted"])
      .withMessage("Invalid status."),

    // Age (optional, but must be a positive number if provided)
    body("age")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Age must be a non-negative integer."),

    // Breed (optional string)
    body("breed")
      .optional()
      .trim()
      .isLength({ max: 50 })
      .withMessage("Breed must be under 50 characters."),

    // Gender (optional, enum)
    body("gender")
      .optional()
      .isIn(["male", "female", "unknown"])
      .withMessage("Invalid gender value."),

    // Birthday (optional date)
    body("birthday")
      .optional()
      .isISO8601()
      .withMessage("Birthday must be a valid date."),

    // Description (optional, max length)
    body("description")
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage("Description must be under 500 characters."),

    // Weight (optional number, must be positive)
    body("weight")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Weight must be a positive number."),

    // Color (optional string)
    body("color")
      .optional()
      .trim()
      .isLength({ max: 30 })
      .withMessage("Color must be under 30 characters."),

    // Vaccinations (optional array of strings)
    body("vaccinations")
      .optional()
      .isArray()
      .withMessage("Vaccinations must be an array of strings.")
      .custom((arr) => arr.every((v) => typeof v === "string"))
      .withMessage("All vaccinations must be strings."),

    // Spayed/Neutered (optional boolean)
    body("spayedNeutered")
      .optional()
      .isBoolean()
      .withMessage("Spayed/Neutered must be true or false."),

    // GoodWith (optional object with boolean properties)
    body("goodWith")
      .optional()
      .isObject()
      .withMessage("GoodWith must be an object.")
      .custom((obj) => {
        const validKeys = ["children", "dogs", "cats"];
        return Object.keys(obj).every(
          (key) => validKeys.includes(key) && typeof obj[key] === "boolean"
        );
      })
      .withMessage(
        "GoodWith must only contain children/dogs/cats as boolean values."
      ),

    // Special needs (optional string)
    body("specialNeeds")
      .optional()
      .trim()
      .isLength({ max: 200 })
      .withMessage("Special needs description must be under 200 characters."),
  ];
};

module.exports = validate;