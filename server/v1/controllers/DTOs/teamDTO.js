const Joi = require("joi");

function inputCreateTeam(data) {
    try {
        const schema = Joi.object({
            teamName: Joi.string().required()
        });

        const validatedData = schema.validate(data);

        if(validatedData.error) {
            return ({ isValid: false, message: validatedData.error.details[0].message.replace('\"', "").replace('\"', ""), data: null});
        }

        return validatedData.value;

    } catch (error) {
        return ({ isValid: false, message: error, data: null })
    }
};

function inputUpdateTeam(data) {
    try {
        const schema = Joi.object({
            idTeam: Joi.string().hex().length(24),
            data: Joi.object({
                teamName: Joi.string()
            })
        });

        const validatedData = schema.validate(data);

        if(validatedData.error) {
            return ({ isValid: false, message: validatedData.error.details[0].message.replace('\"', "").replace('\"', ""), data: null});
        }

        return validatedData.value;

    } catch (error) {
        return ({ isValid: false, message: error, data: null })
    }
};

module.exports = { inputCreateTeam, inputUpdateTeam };