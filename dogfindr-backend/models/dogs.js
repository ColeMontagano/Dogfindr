const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const dogSchema = new Schema({
    name: String,
    owner: String,
    user: {
        type: Schema.ObjectId,
        ref: 'users'
    },
    email: String,
    lost: Boolean,
    description: String,
    locationArea: String,
    location: {
        lng: Number,
        lat: Number
    },
    image: {}
});

const DogsModel = mongoose.model("dogs", dogSchema);

module.exports = {
    DogsModel,
    dogSchema
}