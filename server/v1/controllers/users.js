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

const deleteUser = async (req, res) => {
    try{
        const validatedData = await usersDTO.inputGetOneUserAndDeleteUser(req.body);
        if(validatedData.isValid === false) return(res.status(422).send(validatedData));

        const data = await usersServices.deleteUser(validatedData);

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

const addToTeam = async (req, res) => {
    try{
        const validatedData = await usersDTO.inputAddToTeam(req.body);
        if(validatedData.isValid === false) return(res.status(422).send(validatedData));

        const checkedTeam = await teamDB.findById(validatedData.data.idTeam);
        if(!checkedTeam) return(res.status(409).send("The team you want to add the user doesn't exist"));

        const checkedUser = await usersDB.findById(validatedData.idUser);
        if(!checkedUser) return(res.status(409).send("The user doesn't exist"));

        if(checkedUser.idTeam == validatedData.data.idTeam) return(res.status(409).send("The user is already in the team"))

        validatedData.data.idResponsable = jwt.verify(req.headers.authorization.split(" ")[1], process.env.TOKEN_SECRET);

        const data = await usersServices.addToTeam(validatedData, checkedUser, checkedTeam);

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

const getOneUser = async (req, res) => {
    try{
        const validatedData = await usersDTO.inputGetOneUserAndDeleteUser(req.params);
        if(validatedData.isValid === false) return(res.status(422).send(validatedData));
        
        const checkedUser = await usersDB.findById(validatedData.idUser);
        if(!checkedUser) return(res.status(409).send("The user doesn't exist"));

        const data = await usersServices.getOneUser(checkedUser);

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

module.exports = { createUser, updateUser, deleteUser, addToTeam, getOneUser };