const jwt = require('jsonwebtoken');
//const config = require('./config');
// const secret = config.secret;  SHOULD BE USED IN FUTURE instead of hyvinslainenmerkkijono, BUT NOT IN THIS TEST PROJECT!


function verifyToken(req, res, next){
    const token = req.body.token || req.headers['x-access-token'];
    if(!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, 'hyvinsalainenmerkkijono', function(err, decoded) {
        if (err)
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
    });
}

module.exports = verifyToken;