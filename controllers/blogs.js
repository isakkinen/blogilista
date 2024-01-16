const Blog = require('../models/blog')

const blogsRouter = require('express').Router()

blogsRouter.get('/', async (request, response, next) => {
    const result = await Blog.find({})
    response.json(result)
})

blogsRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)

    await blog.save()
    response.status(201).json(blog)
})

module.exports = blogsRouter
