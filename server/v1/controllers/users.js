const usersDTO = require("./DTOs/usersDTO");
const usersDB = require("../services/database/usersDB");
const usersServices = require("../services/usersServices");
const teamDB = require("../services/database/teamDB");

const createUser = async (req, res) => {
    try{
        const validatedData = await usersDTO.inputCreateUserDTO(req.body);
        if(validatedData.isValid === false) return(res.send(validatedData));

        const ifUserExists = await usersDB.findByMail(validatedData.email);
        if(ifUserExists) return( res.send("User already exists"));

        const data = await usersServices.userRegistration(validatedData);

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
        const checkUser = await usersDB.findById(req.body.idUser);
        if(!checkUser) return(res.status(404).send({
            isValid: false,
            message: "User not found",
            data: null
        }));     

        req.body.range = checkUser.range;
        
        const validatedData = usersDTO.inputUpdateItemDTO(req.body);
        if(validatedData.isValid === false) return (validatedData);   

        const checkTeam = await teamDB.findById(validatedData.data.team);
        if(!checkTeam && validatedData.data.team) return(res.status(404).send({
            isValid: false,
            message: "Cannot add this user to a team that doesn't exist",
            data: null
        }))

        const data = usersServices.updateUser(validatedData, checkTeam._id);
        
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