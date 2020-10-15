// Imports
const ingredientModel = require('../models/ingredientsModel')
const moment = require('moment');

// Routes
module.exports = {
    getAll: async function (req, res) {
        await ingredientModel.find().then((ingredients) => {
            res.status(200).send(ingredients)
        }).catch((err) => {
            res.status(409).send(err)
        });
    },
    save: async function (req, res) {
        try {
            req.body.ingredients.forEach(async element => {
                const ingredientFound = await ingredientModel.findOne({
                    name: element.name
                });
                if (!ingredientFound) {
                    const newIngredient = new ingredientModel({
                        'name': element.name,
                        'locationId': element.locationId,
                        'createdAt': moment().utc().local(),
                        'updatedAt': moment().utc().local(),
                    })
                    newIngredient.save()
                }
            });
            res.status(201).send("Ingredients created")
        } catch {
            res.status(409).send("Something gone wrong")
        }
    },
    delete: function (req, res) {
        const id = req.body.id;
        ingredientModel.deleteOne({
            _id: id
        }).then(() => {
            res.status(200).send("Delete with success")
        }).catch((err) => {
            res.status(409).send(err)
        })
    }
}
