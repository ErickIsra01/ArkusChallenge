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

module.exports = { inputCreateTeam };