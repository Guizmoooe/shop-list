require('../db/dbConnection');
const mongoose = require('mongoose');

const ingredientSchema = mongoose.Schema({
    name: String,
    locationId: String,
    createdAt: Date,
    updatedAt: Date
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
