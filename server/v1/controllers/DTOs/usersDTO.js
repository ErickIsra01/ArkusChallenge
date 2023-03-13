const Joi = require("joi");

function inputCreateUserDTO(data) {
    try {
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            range: Joi.string().valid("admin", "user").required(),
            password: Joi.string().required(),
            englishLevel: Joi.string().optional(),
            techKnowledge: Joi.string().optional(),
            CV:  Joi.string().uri().optional(),
            team: Joi.string().hex().length(24).optional(),
        });
        
        const validatedData = schema.validate(data); 
        if(validatedData.error) {
            return ({ isValid: false, message: validatedData.error.details[0].message.replace('\"', "").replace('\"', ""), data: null});
        }
    
        return validatedData.value;
    } catch (error) {
        return ({ isValid: false, message: error, data: null});
    };
};
    
function inputUpdateItemDTO(data) {
    try {
        const schema = Joi.object({
            idUser: Joi.string().hex().length(24).optional(),
            range: Joi.string().valid("admin", "superuser", "user"),
            team: Joi.string().hex().length(24),
            data: Joi.alternatives().conditional('range', [
                { is: 'superuser', then: Joi.object({
                    name: Joi.string(),
                    email: Joi.string().email(),
                    range: Joi.string().valid("admin", "user"),
                    password: Joi.string(),
                    englishLevel: Joi.string(),
                    techKnowledge: Joi.string(),
                    CV:  Joi.string().uri(),
                })},
                { is: 'admin', then: Joi.object({
                    name: Joi.string(),
                    email: Joi.string().email(),
                    range: Joi.string().valid("user"),
                    password: Joi.string(),
                    englishLevel: Joi.string(),
                    techKnowledge: Joi.string(),
                    CV:  Joi.string().uri(),
                })},
                { is: 'user', then: Joi.object({
                    name: Joi.string().required(),
                    englishLevel: Joi.string().optional(),
                    techKnowledge: Joi.string().optional(),
                    CV:  Joi.string().uri().optional()
                })}
            ]).required()
        });

        const validatedData = schema.validate(data);

        if(validatedData.error) {
            return ({ isValid: false, message: validatedData.error.details[0].message.replace('\"', "").replace('\"', ""), data: null});
        };

        return validatedData.value;

    } catch (error) {
        return ({ isValid: false, message: error, data: null})
    }
}

async function outputUpdateItemDTO(user, team) {
    console.log(user, team)
}

module.exports = { inputCreateUserDTO, inputUpdateItemDTO, outputUpdateItemDTO };
