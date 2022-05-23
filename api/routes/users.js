require('dotenv').config();
var express = require('express');
var router = express.Router();
var pool = require('../db');
const jwtDecode = require('jwt-decode');
const { v4: uuidv4 } = require('uuid');
const { createToken, hashPassword, verifyPassword } = require('../utils');

async function getUser(username) {
    const res = await pool.query(`
    SELECT * FROM users WHERE username = '${username}'`);
    return res.rows[0];
}

router.post('/auth', async (req, res) => {
    try {
        const { username, password } = req.body;
    
        const user = await getUser(username);
    
        if (typeof user === 'undefined') {
            return res
                .status(403)
                .json({ message: 'Zły login lub hasło.' });
        }
    
        const passwordValid = await verifyPassword(
            password,
            user.password
        );
    
        if (passwordValid) {
            const userData = {
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                admin: user.admin
            }
    
            const token = createToken(userData);
            const decodedToken = jwtDecode(token);
            const expiresAt = decodedToken.exp;

            const userInfo = {
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                username: user.username,
                admin: user.admin
            };

            res.cookie('token', token, {
                httpOnly: true
            });
    
            return res.json({
                message: 'Autoryzacja uzyskana!',
                token,
                userInfo,
                expiresAt
            });
        }
        else {
            return res
                .status(403)
                .json({ message: 'Zły login lub hasło.' });
        }
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({ message: 'Coś poszło nie tak.' });
    }
  
});

async function addUser({ user_id, firstName, lastName, email, username, password, admin }) {
    try {
        const res = await pool.query(`
        INSERT INTO users (user_id, first_name, last_name, username, password, email, admin)
        VALUES ('${user_id}', '${firstName}', '${lastName}', '${username}', '${password}', '${email}', ${admin})`);
        return res.rowCount;
    } catch (error) {
        console.log(error);
        return error;
    }
}

router.post('/signup', async function(req, res) {
    try {
        const { firstName, lastName, email, username, password } = req.body;
        const hashedPassword = await hashPassword(password);
        const uuid = uuidv4();

        const availability = await checkUsernameEmailAvailability({username, email});

        if (availability.email) {
            return res
                .status(400)
                .json({ message: 'Ten email jest już zajęty.' });
        }

        if (availability.username) {
            return res
                .status(400)
                .json({ message: 'Ten login jest już zajęty.' });
        }

        const userData = {
            user_id: uuid,
            firstName: firstName,
            lastName: lastName,
            email: email.toLowerCase(),
            username: username.toLowerCase(),
            password: hashedPassword,
            admin: false
        };

        const result = await addUser(userData);

        if (result === 1) {
            const token = createToken(userData);
            const decodedToken = jwtDecode(token);
            const expiresAt = decodedToken.exp;

            const userInfo = {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                username: userData.username,
                admin: userData.admin
            };

            res.cookie('token', token, {
                httpOnly: true
            });

            return res.json({
                message: 'Użytkownik został dodany!',
                token,
                userInfo,
                expiresAt
            });
        }
        else {
            return res
                .status(400)
                .json({message: 'Wystąpił błąd podczas dodawania użytkownika.'});
        }
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({message: 'Wystąpił błąd podczas dodawania użytkownika.'});
    }
});

async function checkUsernameEmailAvailability({username, email}) {
    try {
        const res = await pool.query(`
        SELECT
            EXISTS(SELECT user_id FROM users WHERE username = '${username}') as username,
            EXISTS(SELECT user_id FROM users WHERE email = '${email}') as email`);
        return res.rows[0];
    } catch (error) {
        return error;
    }
}

router.get('/checkUsernameEmail/', function(req, res) {
    userData = req.query;
    checkUsernameEmailAvailability(userData)
        .then(result => res.send(result));
});

module.exports = router;