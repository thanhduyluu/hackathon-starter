const Blog = require('../models/Blog');

/**
 * GET /
 * Home page.
 */
exports.index = async (req, res) => {
  try {
    const blogs = await Blog.find().limit(5); // Fetch the latest 5 blogs
    res.render('home', {
      title: 'Home',
      blogs
    });
  } catch (err) {
    res.render('home', {
      title: 'Home',
      blogs: []
    });
  }
};
