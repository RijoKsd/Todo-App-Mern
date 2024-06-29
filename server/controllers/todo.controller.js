const Todo = require("../models/todo.model");
const User = require("../models/user.model");

const addTodo = async (req, res) => {
  const userId = req.user.id;
  const { title, description, priority } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const todo = new Todo({
      title,
      description,
      priority,
      user: userId,
    });
    await todo.save();
    return res.status(201).json({ message: "Todo added successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const getTodos = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).select("image");
    const todos = await Todo.find({ user: userId });
    return res.status(200).json({ todos, user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const updateTodoById = async (req, res) => {
  const userId = req.user.id;
  const { title, description, priority } = req.body;
  const { id } = req.params;
  if (!title || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }
};
const deleteTodoById = async (req, res) => {};
const getTodoById = async (req, res) => {};

module.exports = {
  addTodo,
  getTodos,
  updateTodoById,
  deleteTodoById,
  getTodoById,
};
