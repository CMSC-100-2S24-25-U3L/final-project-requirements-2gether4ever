import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userType: String,
    email: String,
    password: String,
});
const User = mongoose.model('User', userSchema);
export default User;