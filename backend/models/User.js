import mongoose from "mongoose";

// Define the user schema
const userSchema = mongoose.model('User', {
    firstName: String,
    // middleName: String,
    lastName: String,
    userType: String,
    email: String,
    password: String,
})

export default userSchema;