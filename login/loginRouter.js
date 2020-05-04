const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secrets = require('../config/secrets')

const restricted = require("../auth/restMiddleware");
const Users = require("./user-model");

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
 
  const options = {
    expiresIn: "8h"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

router.post("/register", (req, res) => { // /api/users/register 
  const user = req.body
  const hash = bcrypt.hashSync(user.password, 13);
//   const token = generateToken(user);

  user.password = hash;

  Users.addUser(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

router.post("/login", (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user); // get a token
  
          res.status(200).json({
            message: user.id,
            token, // send the token
          });
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch(error => {
        console.log("ERROR: ", error);
        res.status(500).json({ error: "login error" });
      });
  });
  

router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.json({ message: "unable to logout." });
      } else {
        res.sendStatus(200).end({ message: "bye!" });
      }
    });
  } else {
    res
      .status(200)
      .json({ message: "This is weird.." });
  }
});
module.exports = router;