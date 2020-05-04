const db = require("../data/dbConfig");

module.exports = {
    getBlogs,
    findById,
    addBlog,
    deleteBlog,
    editBlog,
};

function findById(id) {
    
    return db("blogs")
      .where("id", id)
      .first();
  }

  function getBlogs() {
      return db("blogs")
  }

  function addBlog(newBlog) {
      return db("blogs")
      .insert(newBlog)
      .returning("*");
  }

  function editBlog(id, changes) {
    return db("blogs")
      .where({ id })
      .update(changes)
      .returning("*");
  }

  function deleteBlog(id) {
    return db("blogs")
      .where("id", id)
      .del();
  }