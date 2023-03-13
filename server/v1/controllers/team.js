const express = require("express");
const teamDTO = require("./DTOs/teamDTO");
const teamDB = require("../services/database/teamDB");
const teamServices = require("../services/teamServices");

const createTeam = async (req, res) => {
    try{
        const validatedData = await teamDTO.inputCreateTeam(req.body);
        if(validatedData.isValid === false) return(res.send(validatedData));
        
        const ifTeamExists = await teamDB.findByName(validatedData.teamName);
        if(ifTeamExists) return( res.send("Team name already exists"));
        
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

module.exports = { createTeam };