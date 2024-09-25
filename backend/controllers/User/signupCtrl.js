const expressAsyncHandler = require("express-async-handler");
const Users = require("../../models/UsersModel");

const signupCtrl = expressAsyncHandler(async (req, res) => {
  const { name, email, password, password2, gender, avatar } = req.body;
  if (!name || !email || !password || !password2) {
    // throw res.status(422).json({ error: "Input type is invalid!" });
    // res.status(422);
    throw new Error("Input type is invalid");
  }

  const checkMail = await Users.findOne({ email });
  if (checkMail) {
    // res.status(422);
    throw new Error("Email already exists, try with a different one");
  }
  if (password != password2) {
    // res.status(422);
    throw new Error("Password is conformed");
  }
  const newUser = new Users({
    name: name,
    email: email,
    password: password,
    gender: gender,
    avatar: avatar,
  });
  newUser
    .save()
    .then((user) => {
      res.status(200).json({ success: "Resistory successed!" });
    })
    .catch((error) => {
      res.status(422);
      throw new Error("Resistory failed!");
    });
});

module.exports = signupCtrl;
