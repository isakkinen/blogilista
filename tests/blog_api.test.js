const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
    }
]

describe('blog api tests', () => {
    beforeEach(async () => {
        await Blog.deleteMany({}).then(() => {
            console.log('All blogs deleted')
        })
        await Blog.insertMany(initialBlogs).then(() => {
            console.log('Initial blogs inserted')
        })
    }, 30000)

    test('blogs are returned as json', async () => {
        const result = await api.get('/api/blogs')

        expect(result.body).toHaveLength(initialBlogs.length)
        expect(result.type).toBe('application/json')
    })

    test('blogs have id property', async () => {
        const result = await api.get('/api/blogs')

        expect(result.body[0].id).toBeDefined()
    })

    test('a valid blog can be added', async () => {
        const newBlog = initialBlogs[0]
        await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
        const result = await api.get('/api/blogs')
        expect(result.body).toHaveLength(initialBlogs.length + 1)
    })

    test('blogs can be removed', async () => {
        const result = await api.get('/api/blogs')
        const id = result.body[0].id
        await api.delete(`/api/blogs/${id}`).expect(204)
        const result2 = await api.get('/api/blogs')
        expect(result2.body).toHaveLength(initialBlogs.length - 1)
    })

    test('blogs can be updated', async () => {
        const result = await api.get('/api/blogs')
        const id = result.body[0].id
        const newBlog = {
            ...result.body[0],
            title: 'React patterns'
        }
        await api.put(`/api/blogs/${id}`).send(newBlog).expect(200)
        const result2 = await api.get('/api/blogs')
        expect(result2.body[0].title).toBe('React patterns')
    })

    afterAll(async () => {
        await mongoose.connection.close().then(() => {
            console.log('Connection closed')
        })
    })
})
