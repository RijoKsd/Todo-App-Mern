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
    const user = await User.findById(userId).select("-password");
    const todos = await Todo.find({ user: userId }).sort({createdAt: -1})
    return res.status(200).json({ todos, user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const updateTodoById = async (req, res) => {
  const userId = req.user.id;
  const { title, description, priority,completed } = req.body;
  const { id } = req.params;
  const updateFields = {};
  if (title) updateFields.title = title;
  if (description) updateFields.description = description;
  if (priority) updateFields.priority = priority;
  if (completed){
    updateFields.completed = completed;
    updateFields.completedAt = Date.now();
  }
 

  try{
    const todo = await Todo.findOneAndUpdate(
      {_id:id, user:userId},
      {$set:updateFields},
      {new:true}
    )

    if(!todo){
      return res.status(404).json({message:"Todo not found"})
    }
    return res.status(200).json({message:"Todo updated successfully"})
  }
  catch(err){
    return res.status(500).json({message:err.message})
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
