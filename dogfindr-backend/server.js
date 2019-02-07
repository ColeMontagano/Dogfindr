const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
mongoose.connect("mongodb://localhost/dogfindr", {
    useNewUrlParser: true
})
app.use(bodyParser.urlencoded({
    extended: true
}));
mongoose.Promise = global.Promise
app.use(cors())
app.use(bodyParser.json())

const DogsModel = require('./models/dogs')
const UserModel = require("./models/users")

const router = require('./routes/routes')

app.use('/', router)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Connected to db")
});

app.listen(8080, () => {
    console.log(`listening`)
})