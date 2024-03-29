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

const updateAccount = async (req, res) => {
    try {
        const validatedData = await accountDTO.inputUpdateAccount(req.body);
        if(validatedData.isValid === false) return (res.status(422).send(validatedData));

        const checkAccountName = await accountDB.findByName(validatedData.data.accountName);
        if(checkAccountName) return (res.status(409).send('Account name already exists'));

        const data = await accountServices.updateAccount(validatedData);

        return(res.status(200).send({
            isValid: data.isValid,
            message: data.message,
            data: data.data
        }));

    } catch (error) {
        res.status(500).send({
            isValid: false,
            message: error,
            data: null
        })
    }
}

const deleteAccount = async (req, res) => {
    try {
        const validatedData = await accountDTO.inputDeleteAccount(req.query);
        if(validatedData.isValid === false) return (res.status(422).send(validatedData));

        const data = await accountServices.deleteAccount(validatedData);

        return(res.status(200).send({
            isValid: data.isValid,
            message: data.message,
            data: data.data
        }));

    } catch (error) {
        res.status(500).send({
            isValid: false,
            message: error,
            data: null
        })
    }
}

const getOneAccount = async (req, res) => {
    try {
        const validatedData = await accountDTO.inputDeleteAccount(req.query);
        if(validatedData.isValid === false) return (res.status(422).send(validatedData));
        
        const data = await accountServices.getOneAccount(validatedData);

        return(res.status(200).send({
            isValid: data.isValid,
            message: data.message,
            data: data.data
        }));

    } catch (error) {
        res.status(500).send({
            isValid: false,
            message: error,
            data: null
        })
    }
};

const getAllAccounts = async (req, res) => {
    try {
        const data = await accountServices.getAllAccounts();

        return(res.status(200).send({
            isValid: data.isValid,
            message: data.message,
            data: data.data
        }));

    } catch (error) {
        res.status(500).send({
            isValid: false,
            message: error,
            data: null
        })
    }
};

module.exports = { createAccount, updateAccount, deleteAccount, getOneAccount, getAllAccounts };