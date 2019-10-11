var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

// Käyttäjän Google-tiedot
    google: {
        id: String,
        token: String,// Googlen access-token joka valtuuttaa pääsyyn hakemaan tiedot Googlelta
        email: String,
        name: String
    }

});

module.exports = mongoose.model('User', userSchema);
