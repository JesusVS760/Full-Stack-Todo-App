import mongoose from "mongoose";

//defines how data is organized, what fields are expected and what data types each field should have
//Schemas used in Mongoose, modeling library for Node.js to enfore structure
//Validation Rules
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Must provide an email"],
    unique: [true, "Email must be unique"],
  },
  password: {
    type: String,
    required: [true, "Must provide password"],
  },
});
// allows for CRUD methods
const User = mongoose.model("User", userSchema);
// const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
