// Imports
const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = '/nMn5nX5<qsaDN3-?Hk[YG7)hL;8aT{i~v)6C5G2B.{3iL=ab=T46D8>_9$@:769X6|sKd5p7*f[8dC)9R4=xXT2HhfQsRr]E4u6';

// Exported functions

module.exports = {
    generateTokenForUser: (userData) => {
        return jwt.sign({
            username: userData.username,
            isAdmin: userData.isAdmin
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '1h'
        })
    }
}
