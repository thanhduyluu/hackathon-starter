const Blog = require('../models/Blog');

/**
 * GET /blogs
 * List all blogs.
 */
exports.getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    res.render('blogs/index', { title: 'Blog List', blogs });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /blogs/:id
 * Get blog details.
 */
exports.getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.render('blogs/details', { title: 'Blog Details', blog });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /blogs/new
 * Display form to create a new blog.
 */
exports.getNewBlog = (req, res) => {
  res.render('blogs/new', { title: 'Create Blog' });
};

/**
 * POST /blogs
 * Create a new blog.
 */
exports.postNewBlog = async (req, res, next) => {
  const { title, content, author } = req.body;
  const blog = new Blog({ title, content, author });

  try {
    await blog.save();
    res.redirect('/blogs');
  } catch (err) {
    next(err);
  }
};

/**
 * GET /blogs/:id/edit
 * Display form to edit a blog.
 */
exports.getEditBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.render('blogs/edit', { title: 'Edit Blog', blog });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /blogs/:id/edit
 * Update a blog.
 */
exports.postEditBlog = async (req, res, next) => {
  const { title, content, author } = req.body;

  try {
    await Blog.findByIdAndUpdate(req.params.id, { title, content, author, updatedAt: Date.now() });
    res.redirect(`/blogs/${req.params.id}`);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /blogs/:id/delete
 * Delete a blog.
 */
exports.postDeleteBlog = async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect('/blogs');
  } catch (err) {
    next(err);
  }
};