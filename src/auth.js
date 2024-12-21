const jwt = require('jsonwebtoken');

const SECRET_KEY = "sps_token_2024"; 

function generateToken(user) {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type
    };

    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        return null;
    }
}

module.exports = { generateToken, verifyToken };
