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

    afterAll(async () => {
        await mongoose.connection.close().then(() => {
            console.log('Connection closed')
        })
    })
})
