const mongoose = require('mongoose');
//
const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    cnf_password: String
});
module.exports = mongoose.model(
    'user', UserSchema);
