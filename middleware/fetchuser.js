var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Hello world';

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        // Verify the token
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        // If token is valid then let the user to make further requests
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}


module.exports = fetchuser;