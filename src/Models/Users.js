const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    email: {
        type: String,
        unique: [true, "Email is Already Present"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },
    pass: {
        type: String,
        minLength: 3,
        maxLength: 12
    }
});
const users = mongoose.model('users', userSchema);

module.exports = (users);