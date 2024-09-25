const expressAsyncHandler = require("express-async-handler");
const Cannafield = require("../../models/CannafieldModel");

const getAllCtrl = expressAsyncHandler(async (req, res) => {
  var mysort = { createdAt: -1 };
  Cannafield.find({})
    .select("num isShow pieces.id pieces.isSelected pieces.owner")
    .sort(mysort)
    .then((cannafield) => {
      res.status(200).json({ cannafield: cannafield });
    });
});

module.exports = { getAllCtrl };
