const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    firstName: String,
    middleName: String,
    lastName: String,
    userType: String,
    email: String,
    password: String,
})

module.exports = mongoose.model('User', userSchema);