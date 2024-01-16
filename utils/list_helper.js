const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = (blogs) => blogs.reduce((favorite, blog) => favorite === null || favorite.likes < blog.likes ? blog : favorite, null)

const mostBlogs = (blogs) => blogs.reduce((bloggers, blog) => {
    bloggers[blog.author] = {
        author: blog.author,
        blogs: bloggers[blog.author] === undefined ? 1 : bloggers[blog.author].blogs + 1
    }
    bloggers.mostBlogs = bloggers.mostBlogs === undefined || bloggers[blog.author].blogs > bloggers.mostBlogs.blogs
        ? bloggers[blog.author]
        : bloggers.mostBlogs
    return bloggers
}, {}).mostBlogs || null

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}
