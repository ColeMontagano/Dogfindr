const express = require('express')
const router = express.Router()
const dogs = require('../models/dogs')
const users = require('../models/users')
const multer = require('multer')
const upload = multer()

router.post('/newuser', (req, res) => {
    let user = req.body
    let newuser = users(user)
    if (users.findOne({
            "email": newuser.email
        }).exec(function (err, user) {
            if (err) {
                console.log(err)
            }
            if (user) {
                res.json(user)
            } else {
                newuser.save()
                    .then(saveduser => {
                        res.json(saveduser)
                    }).catch(err => {
                        console.log(err)
                    })
            }
        })) {}
})

router.post('/newdog', (req, res) => {
    let dog = req.body
    let newdog = dogs.DogsModel(dog)
    users.findById(newdog.user)
        .then((user) => {
            user.dogs.push(newdog)
            user.save()
        })

    newdog.save()
        .then(saveddog => {
            res.json(saveddog)
        }).catch(err => {
            console.log(err)
        })
})

router.get('/lostdogs', (req, res) => {
    dogs.DogsModel.find({
            "lost": true
        })
        .then(dogs => {
            res.json(dogs)
        })
})

router.get('/usersdogs/:userId', (req, res) => {
    dogs.DogsModel.find({
            "user": req.params.userId
        })
        .then(usersdogs => {
            res.json(usersdogs)
        })
})

router.get('/mydog/:dogid', (req, res) => {
    dogs.DogsModel.find({
            "_id": req.params.dogid
        })
        .then(dog => {
            res.json(dog)
        })
        .catch(err => {
            console.log(err)
        })
})

router.delete('/mydog/:dogid', (req, res) => {
    dogs.DogsModel.deleteOne({
            "_id": req.params.dogid
        })
        .then(object => {
            res.json({
                deleted: true
            })
        })
        .catch(err => {
            console.log(err)
        })
})

router.put('/mydog/:dogid/missing', (req, res) => {
    let dog = req.body
    let update = {
        lost: dog.lost,
    }
    let query = {
        "_id": req.params.dogid
    }
    dogs.DogsModel.findOneAndUpdate(query, update, {
            new: true,
            runValidators: true
        })
        .then(updateddog => {
            res.json(updateddog)
        })
})

router.put('/mydog/:dogid/image', upload.single('myFile'), (req, res) => {
    let image = req.file
    let update = {
        image: {
            data: req.file.buffer,
            contentType: 'image/jpeg'
        }
    }
    let query = {
        "_id": req.params.dogid
    }
    dogs.DogsModel.findOneAndUpdate(query, update, {
            new: true,
            runValidators: true
        })
        .then(updateddog => {
            res.json(updateddog)
        })
        .catch(err => {
            console.log(error)
        })
})

router.put('/mydog/:dogid/updatelocation', (req, res) => {
    let dog = req.body
    let update = {
        location: dog.location
    }
    let query = {
        "_id": req.params.dogid
    }
    dogs.DogsModel.findOneAndUpdate(query, update, {
            new: true,
            runValidators: true
        })
        .then(updateddog => {
            res.json(updateddog)
        })
        .catch(err => {
            console.log(error)
        })
})

module.exports = router