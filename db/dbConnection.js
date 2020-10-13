const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true });

    var userSchema = mongoose.Schema({
        email: String,
        username: String,
        password: String,
        isAdmin: Boolean
    });

module.exports = mongoose.model('User', userSchema);
