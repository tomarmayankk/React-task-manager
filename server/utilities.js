const jwt = require('jsonwebtoken');
require("dotenv").config();

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Correctly extract the token

    if (!token) return res.sendStatus(401); // Unauthorized if no token is provided

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden if the token is invalid
        req.user = user; // Attach the user information to the request object
        next(); // Pass control to the next middleware
    });
}

module.exports = {
    authenticateToken,
};
