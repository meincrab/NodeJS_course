const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isadmin: {type: Boolean, required: true}
});

const User = mongoose.model('User', UserSchema);
module.exports = User;