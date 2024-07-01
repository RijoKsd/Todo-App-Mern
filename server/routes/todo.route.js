const todoRouter = require("express").Router();
const {
  addTodo,
  getTodos,
  updateTodoById,
  deleteTodoById,
  getTodoById,
} = require("../controllers/todo.controller");

const verifyToken = require("../middleware/auth.middleware");

todoRouter.post("/add", verifyToken, addTodo);
todoRouter.get("/list", verifyToken, getTodos);
todoRouter.get("/get/:id", verifyToken, getTodoById);
todoRouter.put("/update/:id", verifyToken, updateTodoById);
todoRouter.delete("/delete/:id", verifyToken, deleteTodoById);

module.exports = todoRouter;
