const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    highereducation: {
        type: String,
        required: true
    },
    adharnumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    }
});

const User = mongoose.model("registeredDetails", signupSchema);

module.exports = User;
