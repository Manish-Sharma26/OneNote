const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const fetch = require('../middleware/fetch');
//using vaildator to validate the fields
const JWT_SECRET = "Manish$master";

//Route 1: Creating user
router.post(
  "/signup",
  [
    body("email", "Enter a valid email").isEmail().escape(),
    body("name", "Enter a name of atleast 5 charcters")
      .isLength({ min: 5 })
      .escape(),
    body("pass", "Enter a valid password of atleast 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      // const user = User(req.body);
      // user.save();
      return res.send({ errors: result.array() });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "user already exists" });
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const securePass = await bcrypt.hash(req.body.pass, salt);
      user = await User.create({
        name: req.body.name,
        pass: securePass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
      // return res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server error occureed" });
    }
  }
);

//Route2: login endpoint
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail().escape(),
    body("pass", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      // const user = User(req.body);
      // user.save();
      return res.send({ errors: result.array() });
    }
    const { email, pass } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Incorrect credentials" });
      }

      const comparePass = await bcrypt.compare(pass, user.pass);
      if (!comparePass) {
        return res.status(400).json({ error: "Incorrect credentials" });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(payload, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server error occureed" });
    }
  }
);

//Route 3: retrieving the user details  login required
router.post("/getuser",fetch, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-pass");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server error occureed" });
  }
});

module.exports = router;
