// Imports
const jwt = require('jsonwebtoken');

// Exported functions

module.exports = {
    generateTokenForUser: ({username, isAdmin}) => {
        return jwt.sign({
            username,
            isAdmin
        },
        process.env.JWT_SIGN_SECRET,
        {
            expiresIn: '1h'
        })
    }
}
