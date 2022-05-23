const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var camelCase = require('lodash.camelcase');

function camelize(object) {
    if (Array.isArray(object)) {
        return object.map(camelize);
    } else if (object && typeof object === 'object') {
        const newObject = {};
        Object.keys(object).forEach(key => {
            newObject[camelCase(key)] = camelize(object[key]);
        });
        return newObject;
    }
    return object;
}

function ifNull(value) {
    if (value === null || value === undefined) {
        return 'NULL';
    }
    return `'${value}'`;
}

const hashPassword = password => {
    return new Promise((resolve, reject) => {
        // Generate a salt at level 12 strength
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                reject(err);
            }
            resolve(hash);
            });
        });
    });
};

const verifyPassword = (passwordAttempt, hashedPassword) => {
    return bcrypt.compare(passwordAttempt, hashedPassword);
};  

const createToken = userData => {
    // Sign the JWT
    return jwt.sign(
    {
        sub: userData.user_id,
        username: userData.username,
        email: userData.email,
        admin: userData.admin,
        iss: 'api.digimonkeys',
        aud: 'api.digimonkeys'
    },
    process.env.JWT_SECRET,
    { algorithm: 'HS256', expiresIn: '24h' }
    );
};

module.exports = {
    createToken,
    hashPassword,
    verifyPassword,
    camelize,
    ifNull
};