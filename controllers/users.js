const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response, next) => {
    const result = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    response.json(result)
})

userRouter.post('/', async (request, response, next) => {
    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const result = await user.save()
    response.status(201).json(result)
})

module.exports = userRouter
