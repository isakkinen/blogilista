const listHelper = require('../utils/list_helper')

const blogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    }
]

describe('dummy', () => {
    test('returns one', () => {
        const blogs = []
        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })
})

describe('total likes', () => {
    test('counts likes from an empty list', () => {
        const emptyBlogsList = []
        const result = listHelper.totalLikes(emptyBlogsList)
        expect(result).toBe(0)
    })

    test('counts likes from a list with one blog', () => {
        const oneBlogList = [blogs[0]]
        const result = listHelper.totalLikes(oneBlogList)
        expect(result).toBe(7)
    })

    test('counts likes from a filled list', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })
})

describe('favorite blog', () => {
    test('returns null from an empty list', () => {
        const emptyBlogsList = []
        const result = listHelper.favoriteBlog(emptyBlogsList)
        expect(result).toEqual(null)
    })

    test('returns the blog with most likes', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(blogs[2])
    })
})

describe('most blogs', () => {
    test('returns null from an empty list', () => {
        const emptyBlogsList = []
        const result = listHelper.mostBlogs(emptyBlogsList)
        expect(result).toEqual(null)
    })

    test('returns the author with most blogs', () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result.author).toBe('Robert C. Martin')
        expect(result.blogs).toBe(3)
    })
})

describe('most likes', () => {
    test('returns null from an empty list', () => {
        const emptyBlogsList = []
        const result = listHelper.mostLikes(emptyBlogsList)
        expect(result).toEqual(null)
    })

    test('returns the author with most likes', () => {
        const result = listHelper.mostLikes(blogs)
        expect(result.author).toBe('Edsger W. Dijkstra')
        expect(result.likes).toBe(17)
    })
})
