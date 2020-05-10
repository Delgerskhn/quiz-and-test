const router = require("express").Router();
const { registerValidation, loginValidation } = require("./validation");
const user = require("./user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register
router.post("/register", async (req, res) => {
  let { error } = registerValidation(req.body);
  if (error) res.send({ message: error.details[0].message });

  const emailExists = await user.findOne({ email: req.body.email });
  if (emailExists) return res.send({ message: "email already exists" });

  //hashpassword
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const User = new user({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await User.save();
    res.send(savedUser);
  } catch (err) {
    res.send({ message: err });
  }
});

//login
router.post("/login", async (req, res) => {
  console.log("data:", req.body);
  const { error } = loginValidation(req.body);
  if (error) return res.send({ message: error.details[0].message });

  const User = await user.findOne({ email: req.body.email });
  console.log(User);
  if (!User) return res.send({ message: "email does not exists" });

  const validatePass = await bcrypt.compare(req.body.password, User.password);
  if (!validatePass) return res.send({ message: "invalid password" });
  const token = jwt.sign(
    { _id: User._id },
    "asdflksajdflkasd", // process.env.TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );
  res.send({
    token: token,
    user: User.name,
  });
});

router.post("/auth", async (req, res) => {
  const token = req.header("auth-token");

  console.log("token:", token);
  if (token != undefined) {
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET); //token iig tulgaj uzeed verified dotor user iin id g hadgalj bui heseg buyu payload iin decrypt hiij bga
      req.user = verified; //req.user-t id g ni onooj bga
      console.log(verified);
      const User = await user.findOne({ _id: verified._id });

      res.send({ user: User.name });
    } catch (err) {
      res.send({ message: "Invalid Token" });
    }
  } else {
    return res.status(401).render("auth");
  }
});

module.exports = router;
