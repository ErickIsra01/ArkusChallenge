const Joi = require("joi");

function inputCreateUserDTO(data) {
    try {
        const schema = Joi.object({
            rangeUser: Joi.string().valid('admin', 'user', 'superuser'),
            data: Joi.any().when('rangeUser',  
                { is: 'admin', then: Joi.object({
                    name: Joi.string().required(),
                    email: Joi.string().email().required(),
                    range: Joi.string().valid("user").required(),
                    password: Joi.string().required(),
                    englishLevel: Joi.string().optional(),
                    techKnowledge: Joi.string().optional(),
                    CV:  Joi.string().uri().optional()
                }).unknown(false)}, 
                { is: 'superuser', then: Joi.object({
                    name: Joi.string().required(),
                    email: Joi.string().email().required(),
                    range: Joi.string().valid("admin", "user").required(),
                    password: Joi.string().required(),
                    englishLevel: Joi.string().optional(),
                    techKnowledge: Joi.string().optional(),
                    CV:  Joi.string().uri().optional()
                }).unknown(false)})
                .required()
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
            idUser: Joi.string().hex().length(24),
            rangeUser: Joi.string().valid('admin', 'user', 'superuser'),
            data: Joi.any().when('rangeUser',  
                { is: 'admin' || 'superuser', then: Joi.object({
                    name: Joi.string(),
                    email: Joi.string().email(),
                    range: Joi.string().valid("user", "admin"),
                    password: Joi.string(),
                    englishLevel: Joi.string(),
                    techKnowledge: Joi.string(),
                    CV:  Joi.string().uri()
                }).unknown(false), otherwise: Joi.object().keys({
                    name: Joi.string(),
                    englishLevel: Joi.string(),
                    techKnowledge: Joi.string(),
                    CV:  Joi.string().uri()
                }).unknown(false)})
        }).unknown(false);
        
        const validatedData = schema.validate(data);

        if(validatedData.error) {
            return ({ isValid: false, message: validatedData.error.details[0].message.replace('\"', "").replace('\"', ""), data: null});
        }
    
        return validatedData.value;
    } catch (error) {
        return ({ isValid: false, message: error, data: null});
    };
}

function inputGetOneUserAndDeleteUser(data) {
    try {
        const schema = Joi.object({
            idUser: Joi.string().hex().length(24)
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

function inputAddToTeam(data) {
    try {
        const schema = Joi.object({
            idUser: Joi.string().hex().length(24),
            data: Joi.object({
                idTeam: Joi.string().hex().length(24),
            })
        }).unknown(false)
        
        
        const validatedData = schema.validate(data);
        
        if(validatedData.error) {
            return ({ isValid: false, message: validatedData.error.details[0].message.replace('\"', "").replace('\"', ""), data: null});
        }
    
        return validatedData.value;
    } catch (error) {
        return ({ isValid: false, message: error, data: null});
    };
};

module.exports = { 
    inputCreateUserDTO,
    inputUpdateItemDTO,
    inputGetOneUserAndDeleteUser,
    inputAddToTeam
 };
