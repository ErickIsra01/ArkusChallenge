const { validate } = require("../models/tokensModel");
const accountServices = require("../services/accountServices");
const accountDTO = require("./DTOs/accountDTO");
const accountDB = require("../services/database/accountDB");

const createAccount = async (req, res) => {
    try {
        const validatedData = accountDTO.inputCreateAccount(req.body);
        if(validatedData.isValid === false) return (res.status(422).send(validatedData));

        const ifExistsAccount = await accountDB.findByName(validatedData.accountName);
        if(ifExistsAccount) return(res.status(409).send("Account name already exists"));

        const data = await accountServices.createAccount(req.body);

        return(res.status(200).send({
            isValid: data.isValid,
            message: data.message,
            data: data.data
        })
    );
    } catch (error) {
        return(
            res.status(500).send({
                isValid: false,
                message: error,
                data: null
            })
        )
    };


};

module.exports = { createAccount };