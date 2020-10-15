require('../db/dbConnection');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: String,
    username: String,
    password: String,
    isAdmin: Boolean,
    createdAt: Date,
    updatedAt: Date,
});

module.exports = mongoose.model('User', userSchema);
