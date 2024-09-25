const expressAsyncHandler = require("express-async-handler");
const Tasks = require("../../models/TaskModel");

const taskAddCtrl = expressAsyncHandler(async (req, res) => {
  const { title, pri } = req.body;
  console.log(title.length);
  if (title.trim() && title.length < 70) {
    const newTask = new Tasks({
      title: title,
      pri: pri,
    });
    await newTask.save();
    var mysort = { createdAt: -1 };
    Tasks.find({})
      .sort(mysort)
      .then((task) => {
        res.status(200).json({ task: task });
      });
  } else {
    res.status(422).json({ error: "Input invalid!" });
  }
});

const taskDelCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.body;
  await Tasks.updateOne({ _id: id }, { $set: { isDel: true } });
  var mysort = { createdAt: -1 };
  Tasks.find({})
    .sort(mysort)
    .then((task) => {
      res.status(200).json({ task: task });
    });
});
const taskEditCtrl = expressAsyncHandler(async (req, res) => {
  const { id, title, pri } = req.body;
  if (title.trim()) {
    await Tasks.updateOne({ _id: id }, { $set: { title: title, pri: pri } });
    var mysort = { createdAt: -1 };
    Tasks.find({})
      .sort(mysort)
      .then((task) => {
        res.status(200).json({ task: task });
      });
  } else {
    res.status(422).json({ error: "Input invalid!" });
  }
});
const taskTodoCtrl = expressAsyncHandler(async (req, res) => {
  const { id, todo } = req.body;
  console.log(id);
  await Tasks.updateOne({ _id: id }, { $set: { todo: todo + 1 } });
  var mysort = { createdAt: -1 };
  Tasks.find({})
    .sort(mysort)
    .then((task) => {
      res.status(200).json({ task: task });
    });
});
const taskCurrentCtrl = expressAsyncHandler(async (req, res) => {
  var mysort = { createdAt: -1 };
  Tasks.find({})
    .sort(mysort)
    .then((task) => {
      console.log("Fetch-------");
      res.status(200).json({ task: task });
    });
});

module.exports = {
  taskAddCtrl,
  taskDelCtrl,
  taskEditCtrl,
  taskCurrentCtrl,
  taskTodoCtrl,
};
