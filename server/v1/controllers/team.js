const express = require("express");
const teamDTO = require("./DTOs/teamDTO");
const teamDB = require("../services/database/teamDB");
const teamServices = require("../services/teamServices");

const createTeam = async (req, res) => {
    try{
        const validatedData = await teamDTO.inputCreateTeam(req.body);
        if(validatedData.isValid === false) return(res.status(422).send(validatedData));
        
        const ifTeamExists = await teamDB.findByName(validatedData.teamName);
        if(ifTeamExists) return( res.status(409).send("Team name already exists"));

        const data = await teamServices.createTeam(req.body);

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

const updateTeam = async (req, res) => {
    try{
        const validatedData = await teamDTO.inputUpdateTeam(req.body);
        if(validatedData.isValid === false) return(res.status(422).send(validatedData));
        
        const ifTeamExists = await teamDB.findByName(validatedData.data.teamName);
        if(ifTeamExists) return( res.status(409).send("Team name already exists"));

        const data = await teamServices.updateTeam(validatedData);

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

const deleteTeam = async (req, res) => {
    try{
        const validatedData = await teamDTO.inputDeleteTeam(req.body);
        if(validatedData.isValid === false) return(res.status(422).send(validatedData));

        const data = await teamServices.deleteTeam(validatedData);

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

const addToAccount = async (req, res) => {
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

module.exports = { createTeam, updateTeam, deleteTeam, addToAccount };