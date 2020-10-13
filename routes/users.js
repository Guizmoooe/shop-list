// Imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../db/dbConnection')

// Routes
module.exports = {
    register: async function (req, res) {
        //Params
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;

        if (email == null || username == null || password == null) {
            return res.status(400).json({
                'error': 'missing parameters'
            })
        }
        const userFound = await userModel.findOne({
            email: email
        })
        if (!userFound) {
            const bcryptedPassword = bcrypt.hashSync(password, 5)
            const user = new userModel({
                'email': email,
                'username': username,
                'password': bcryptedPassword,
                'isAdmin': true // TODO Change status
            });
            await user.save();
            res.status(201).send("User save with success")
        } else {
            res.status(409).send("User already exist")
        }
    },
    login: async function (req, res) {
        var email = req.body.email;
        var password = req.body.password;
        const userFound = await userModel.findOne({
            email: email
        });
        if(userFound !== null){
            const match = bcrypt.compareSync(password, userFound.password);
            if(match){
                res.status(200).send("TO DO TOKEN")
            }
        }
        
        res.status(403).send("Invalid login or password")
    }
}
