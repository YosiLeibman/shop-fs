const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

let { users } = require("../db/data");

router.post("/register", async (req, res) => {
  const { username, password, fname, lname } = req.body;
  // check missing info
  if (!username || !password || !fname || !lname) {
    return res.status(400).send("missing some info");
  }
  // username taken
  if (users.some((user) => user.username === username)) {
    return res.status(400).send("username is taken");
  }
  // encrypt the password
  const hashedPass = await bcrypt.hash(password, 10);

  const user = {
    id: uuid.v4(),
    username,
    password: hashedPass,
    fname,
    lname,
  };
  // save the user
  users.push(user);
  // send response
  res.send(user);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // check missing info
  if (!username || !password) {
    return res.status(400).send({err:"missing some info"});
  }
  const user = users.find((user) => user.username === username);

  if (!user) {
    return res.status(400).send({err:"user not found"});
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).send({err:"wrong password"});
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      fname: user.fname,
    },
    process.env.TOKEN_SECRET,
    {
        expiresIn:"20m"
    }
  );

  res.send({token})
});

module.exports = router;
