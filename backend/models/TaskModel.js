const mongoose = require("mongoose");

const TaskModel = mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
      required: true,
    },
    pri: {
      type: String,
      default: "High",
      required: true,
    },
    todo: {
      type: Number,
      default: 1,
    },
    isDel: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", TaskModel);
module.exports = Task;
