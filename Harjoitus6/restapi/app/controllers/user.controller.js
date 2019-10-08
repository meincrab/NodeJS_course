const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

    exports.registerUser = (req, res, next) => {
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);

        User.create({   
            username: req.body.username,
            password: hashedPassword,
            isadmin: req.body.isadmin
        },
        (err, user) => {
            if(err) {
                return res.status(500).send(err)
            }
            const payload = {
                'username' : user.username,
                'isadmin' : user.isadmin 
            };
            console.log(payload);
            const token = jwt.sign(payload, 'hyvinsalainenmerkkijono', {
                expiresIn: 60 * 60 * 24
            });

            res.json({
                success: true,
                message: 'Tässä on valmis Token!',
                token:token
            });
        });
    };

    exports.authenticateUser = (req,res, next) => {
        const token = req.header['x-access-token'];
        if(!token) return res.status(401).send({auth:false, message: 'No token provided.'});
        jwt.verify(token, config.secret, function(err, decoded){
            if(err) return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});

            res.status(200).send(decoded);
        });
    };

    exports.login = (req,res,nest) => {
        User.findOne({username: req.body.username}, function(err,user){
            if (err) return res.status(500).send('Error on the server.');
            if (!user) return res.status(404).send('No user found.');

            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
            
            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 60 * 60 * 24 // expires in 24 hours
            });            
            res.status(200).send({ auth: true, token: token });
          });
    };