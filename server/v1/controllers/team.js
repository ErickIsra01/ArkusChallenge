const express = require("express");
const teamDTO = require("./DTOs/teamDTO");
const teamDB = require("../services/database/teamDB");
const teamServices = require("../services/teamServices");
const accountDB = require("../services/database/accountDB");

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
        const validatedData = await teamDTO.inputDeleteandGetOneTeam(req.query);
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
        const validatedData = await teamDTO.inputAddToAccount(req.body);
        if(validatedData.isValid === false) return(res.status(422).send(validatedData));

        const checkedAccount = await accountDB.findById({_id: validatedData.data.idAccount});
        if(!checkedAccount) return(res.status(409).send("The account to which you want to add the team doesn't exist"));

        const checkedTeam = await teamDB.findById(validatedData.idTeam);
        if(!checkedTeam) return(res.status(409).send("The team doesn't exist"));

        if(checkedTeam.idAccount == validatedData.data.idAccount) return(res.status(409).send("The team is already in the account"))

        const data = await teamServices.addToAccount(validatedData, checkedTeam, checkedAccount);

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

const getOneTeam = async (req, res) => {
    try{
        const validatedData = await teamDTO.inputDeleteandGetOneTeam(req.query);
        if(validatedData.isValid === false) return(res.status(422).send(validatedData));
        
        const checkedTeam = await teamDB.findById(validatedData.idTeam);
        if(!checkedTeam) return(res.status(409).send("The team doesn't exist"));

        const data = await teamServices.getOneTeam(validatedData);

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

const getAllTeams = async (req, res) => {
    try{
        const data = await teamServices.getAllTeams();

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

module.exports = { createTeam, updateTeam, deleteTeam, addToAccount, getOneTeam, getAllTeams };