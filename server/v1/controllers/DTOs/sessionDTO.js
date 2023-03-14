const Joi = require("joi");

function inputLoginDTO(data) {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }).unknown(false);

        const validatedData = schema.validate(data);

        if(validatedData.error) {
            return ({ isValid: false, message: validatedData.error.details[0].message.replace('\"', "").replace('\"', ""), data: null});
        }

        return validatedData.value;
    } catch (error) {
        return ({ isValid: false, message: error, data: null})
    }
}

function outputLoginDTO(tokenData, userData) {
    const outputData = {
        idUser: userData._id,
        name: userData.name,
        range: userData.range,
        token: tokenData.token
    };
    return outputData;
}

module.exports = { inputLoginDTO, outputLoginDTO };
