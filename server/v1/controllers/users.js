const usersDTO = require("./DTOs/usersDTO");
const usersDB = require("../services/database/usersDB");
const usersServices = require("../services/usersServices");
const teamDB = require("../services/database/teamDB");

const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    try{
        const idUser = jwt.verify(req.headers.authorization.split(" ")[1], process.env.TOKEN_SECRET);
        const { range } = await usersDB.findById(idUser);
        req.body.rangeUser = range;

        const validatedData = await usersDTO.inputCreateUserDTO(req.body);
        if(validatedData.isValid === false) return(res.status(422).send(validatedData));

        const ifUserExists = await usersDB.findByMail(validatedData.data.email);
        if(ifUserExists) return( res.status(409).send("User already exists"));

        const data = await usersServices.userRegistration(validatedData.data);

        return res.status(200).send({
            isValid: data.isValid,
            message: data.message,
            data: data.data 
        });

    } catch (error) {
        return res.status(500).send({
            isValid: false,
            message: error,
            data: null 
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const idUser = jwt.verify(req.headers.authorization.split(" ")[1], process.env.TOKEN_SECRET);
        const { range } = await usersDB.findById(idUser);
        req.body.rangeUser = range;

        const validatedData = await usersDTO.inputUpdateItemDTO(req.body);
        if(validatedData.isValid === false) return(res.status(422).send(validatedData));

        const checkUser = await usersDB.findByMail(validatedData.data.email);
        if(checkUser) return(res.status(409).send("Email already exists"));     

        const data = await usersServices.updateUser(validatedData);

        return res.status(200).send({
            isValid: data.isValid,
            message: data.message,
            data: data.data 
        });


    } catch (error) {
        return res.status(500).send({
            isValid: false,
            message: error,
            data: null 
        });
    }
};

module.exports = { createUser, updateUser };