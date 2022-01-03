const jwt = require('jsonwebtoken');

const varifyToken = (req, res, next) => {
    let success = false;
    //get the user from the jwt token and add id to request obj
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).json({ success, error: "Excess Denied !!" });
    }
    try {
        const data = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = data;
        next();
    } catch (error) {
        res.status(401).send({ success, error: "Invalid Token !!" });
    }

}


module.exports = varifyToken;