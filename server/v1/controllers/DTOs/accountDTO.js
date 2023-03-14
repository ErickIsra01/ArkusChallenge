const Joi = require("joi");

function inputCreateAccount(data) {
    try {
        const schema = Joi.object({
            accountName: Joi.string().required(),
            clientName: Joi.string().required(),
            responsableName: Joi.string().required()
        }).unknown(false);

        const validatedData = schema.validate(data);

        if(validatedData.error) {
            return ({ isValid: false, message: validatedData.error.details[0].message.replace('\"', "").replace('\"', ""), data: null});
        }

        return validatedData.value;

    } catch (error) {
        return ({ isValid: false, message: error, data: null })
    }
};

function inputUpdateAccount(data) {
    try {
        const schema = Joi.object({
            idAccount: Joi.string().hex().length(24),
            data: Joi.object({
                accountName: Joi.string(),
                clientName: Joi.string(),
                responsableName: Joi.string()
            }).unknown(false)
        }).unknown(false);

        const validatedData = schema.validate(data);

        if(validatedData.error) {
            return ({ isValid: false, message: validatedData.error.details[0].message.replace('\"', "").replace('\"', ""), data: null});
        }

        return validatedData.value;

    } catch (error) {
        return ({ isValid: false, message: error, data: null })
    }
};

function inputDeleteAccount(data) {
    try {
        const schema = Joi.object({
            idAccount: Joi.string().hex().length(24)
        }).unknown(false);

        const validatedData = schema.validate(data);

        if(validatedData.error) {
            return ({ isValid: false, message: validatedData.error.details[0].message.replace('\"', "").replace('\"', ""), data: null});
        }

        return validatedData.value;

    } catch (error) {
        return ({ isValid: false, message: error, data: null })
    }
};

module.exports = { inputCreateAccount, inputUpdateAccount, inputDeleteAccount };