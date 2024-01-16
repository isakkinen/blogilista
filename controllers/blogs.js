const Blog = require('../models/blog')
const User = require('../models/user')

const blogsRouter = require('express').Router()

blogsRouter.get('/', async (request, response, next) => {
    const result = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(result)
})

blogsRouter.post('/', async (request, response, next) => {
    const user = await User.findById(request.body.userId)

    const blog = new Blog({
        ...request.body,
        user: user._id
    })

    const result = await blog.save()

    user.blogs = user.blogs.concat(result._id)
    await user.save()

    response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response, next) => {
    const id = request.params.id

    await Blog.findByIdAndRemove(id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
    const id = request.params.id
    const blog = request.body
    const result = await Blog.findByIdAndUpdate(id, blog, { new: true })
    response.json(result)
})

module.exports = blogsRouter
