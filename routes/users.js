// Imports
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const userModel = require('../models/usersModel')
const moment = require('moment');

// Routes
module.exports = {
    register: async function (req, res) {
        // Get body informations
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        // Check parameters before control
        if (email == null || username == null || password == null) {
            return res.status(400).json({
                'error': 'missing parameters'
            })
        }
        // Check if user exist in DB
        const userFound = await userModel.findOne({
            email: email
        })
        if (!userFound) {
            //const bcryptedEmail = bcrypt.hashSync(email, 5) // TODO RGPD
            const bcryptedPassword = bcrypt.hashSync(password, 5) // RGPD
            const user = new userModel({
                'email': email,
                'username': username,
                'password': bcryptedPassword,
                'isAdmin': true, // TODO Change status
                'createdAt': moment().utc().local(),
                'updatedAt': moment().utc().local(),
            });
            await user.save();
            res.status(201).send("User save with success")
        } else {
            res.status(409).send("User already exist")
        }
    },
    login: async function (req, res) {
        // Get body informations
        const email = req.body.email;
        const password = req.body.password;
        // Check if user exist in DB and get associated response
        const userFound = await userModel.findOne({
            email: email
        });
        userFound !== null ?
            bcrypt.compareSync(password, userFound.password) ?
            res.status(200).send(jwtUtils.generateTokenForUser(userFound)) : //TODO TOKEN
            res.status(403).send("Invalid login or password") :
            res.status(403).send("Invalid login or password")
    },
    delete: function(req, res) {
        const id = req.body.id;
        userModel.deleteOne({_id: id}).then(() =>{
            res.status(200).send("Delete with success")
        }).catch((err) => {
            res.status(409).send(err)
        })
    }
}
