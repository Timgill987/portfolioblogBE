const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const loginRouter = require("./login/loginRouter")
const blogRouter = require("./blog/blogRouter");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).json({ message: "yayayayay!" });
});

server.use("/api/blog", blogRouter);
server.use("/api/login", loginRouter);

module.exports = server;
