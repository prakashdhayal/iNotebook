//Validation Part
// npm install @hapi/joi
const Joi = require('joi');


// 1. Register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(6).
            required(),
        email: Joi.string()
            .min(6).required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    })
    return schema.validate(data);
}

// 2. Login validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6).required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    })
    return schema.validate(data);
}


// 3. Notes validation
const notesValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string()
            .min(3)
            .required(),
        description: Joi.string()
            .min(6)
            .required(),
        tag: Joi.string()
            .min(3)
            .required()
    })
    return schema.validate(data);
}

// 3. Update Note validation
const updatenotesValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string()
            .min(3),
        description: Joi.string()
            .min(6),
        tag: Joi.string()
            .min(3)
    })
    return schema.validate(data);
}



//Exports
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.notesValidation = notesValidation;
module.exports.updatenotesValidation = updatenotesValidation;