const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Dog = require('./dogs')
const dogSchema = Dog.dogSchema

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    name: String,
    dogs: [dogSchema]
});

const UsersModel = mongoose.model("users", userSchema);

module.exports = UsersModel