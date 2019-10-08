const bcrypt = require('bcrypt.js');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const UserController = {
    registerUser: function(req, res, next){
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);

        User.create({   
            username: req.body.username,
            password: hashedPassword,
            isadmin: req.body.isadmin
        },
        (err, user) => {
            if(err) {
                return res.status(500).send('Käyttäjän rekisteröinti epäonnistui.')
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
    },
    authenticateUser: function(req, res, next){
        User.findOne = (req, res) => {
            User.find({Username: req.params.username})
            .then(user => {
                if(!user) {
                    return res.status(404).send({
                        message: "User not found with code " + req.params.username
                    });            
                }
                res.send(student);
            }).catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "User not found with name: " + req.params.username
                    });                
                }
                return res.status(500).send({
                    message: "Error retrieving user width given name " + req.params.username
                });
            });
        };
        
    }
}