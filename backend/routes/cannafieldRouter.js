const { getAllCtrl } = require("../controllers/Cannafield/cannafieldCtrl");

const cannafieldRouter = require("express").Router();
cannafieldRouter.get("/", getAllCtrl);
module.exports = cannafieldRouter;
