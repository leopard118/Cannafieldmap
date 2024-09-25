const expressAsyncHandler = require("express-async-handler");
const getToken = require("../../config/token/getToken");
const Users = require("../../models/UsersModel");

const signinCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    // throw res.status(422).json({ error: "Input type is invalid!" });
    res.status(422);
    throw new Error("Input type is invalid");
  }

  const user = await Users.findOne({ email });
  if (!user) {
    res.status(422);
    throw new Error("Email does not exist");
  }

  if (await user.CheckPass(password)) {
    res.json({
      success: "Success!",
      name: user.name,
      token: getToken(user.id),
    });
  } else {
    res.status(422);
    throw new Error("Invalid password!");
  }
});

module.exports = signinCtrl;
