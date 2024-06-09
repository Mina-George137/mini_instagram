const Joi = require("joi");

const signUpValidation = {
  body: Joi.object()
    .required()
    .keys({
      email: Joi.string().required().email().messages({
        "string.empty": "you must add an email",
        "string.email": "you must add a valid email",
      }),
      password: Joi.string()
        .required()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .message({
          "string.empty": "Password Can not be empty",
        }),
      confirmPassword: Joi.ref("password"),
    }),
};

const loginValidation= {
    body: Joi.object().keys({
        email: Joi.string().required().email().messages({
            "string.empty": "you must add an email",
            "string.email": "you must add a valid email",
          }),
          password: Joi.string()
            .required()
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
            .message({
              "string.empty": "Password Can not be empty",
            }),
    })
}

module.exports = {signUpValidation, loginValidation}