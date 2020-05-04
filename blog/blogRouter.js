const express = require("express");
const router = express.Router();

const restricted = require("../auth/restMiddleware");
const Blogs = require("./blogModel");

router.get("/", (req, res) => {
    Blogs.getUsersBlogs()
        .then((blogs) => {
            res.json(blogs);
        })
        .catch((err) => res.send(err));
});

router.post("/", restricted, (req, res) => {
    const blogData = req.body;

    Blogs.addBlog(blogData)
        .then((newBlog) => {
            res.status(201).json(newBlog);
        })
        .catch((err) => {
            res.status(500).json(err.message);
        });
});

router.delete("/:id", restricted, (req, res) => {
    const { id } = req.params;
    console.log(req.decodedToken);
    Blogs.deleteBlog(id)
        .then((deleted) => {
            if (deleted) {
                res.json({ removed: deleted });
            } else {
                res.status(404).json({
                    message: "Could not find blog with given id",
                });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: "Failed to delete blog" });
        });
});

router.put("/:id", restricted, (req, res) => {
    const { id } = req.params;
    const { body } = req;
    Blogs.editBlog(id, body)
        .then((update) => {
            console.log("The blog was successfully updated!");
            res.status(200).json(update);
        })
        .catch((err) => {
            status(404).json(error.message);
        });
});

module.exports = router;
