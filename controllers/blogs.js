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
