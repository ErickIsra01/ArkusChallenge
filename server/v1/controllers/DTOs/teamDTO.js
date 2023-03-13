const Joi = require("joi");

function inputCreateTeam(data) {
    try {
        const schema = Joi.object({
            teamName: Joi.string().required(),
            teamLeader: Joi.string().hex().length(24),
            members: Joi.array().items(Joi.string().hex().length(24)),
            account: Joi.string().hex().length(24)
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