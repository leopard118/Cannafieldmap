const {
  taskAddCtrl,
  taskDelCtrl,
  taskEditCtrl,
  taskCurrentCtrl,
  taskTodoCtrl,
} = require("../controllers/Task/taskCtrl");

const taskRouter = require("express").Router();
taskRouter.get("/", taskCurrentCtrl);
taskRouter.post("/add", taskAddCtrl);
taskRouter.post("/del", taskDelCtrl);
taskRouter.post("/edit", taskEditCtrl);
taskRouter.post("/todo", taskTodoCtrl);

module.exports = taskRouter;
