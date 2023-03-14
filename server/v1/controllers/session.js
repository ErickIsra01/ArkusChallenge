const usersDB = require("../services/database/usersDB");
const loginServices = require("../services/loginServices");
const loginDTO = require("./DTOs/sessionDTO");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
    try{
        const validatedData = await loginDTO.inputLoginDTO(req.body);

        if(validatedData.isValid === false) return res.status(422).send(validatedData);

        const user = await usersDB.findByMail(validatedData.email);

        if(!user) return res.status(404).send({
            isValid: false,
            message: "User not found",
            data: null
        });

        const validPassword = await bcrypt.compare(validatedData.password, user.password);
        if(!validPassword) {
            return res.status(401).send({
            isValid: false,
            message: "The email or the password is incorrect",
            data: null 
            });
        };

        const data = await loginServices.login(req.body);

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
}

module.exports = { login };