import Todo from "../models/todoModel.js";
import { connectToDB } from "../utils/connect.js";
import { createError } from "../utils/error.js";

export async function getAllTodos(req, res, next) {
  await connectToDB(); // connect to data base
  const todos = await Todo.find({ userID: req.user.id });
  res.status(200).send(todos);
}

// trycatch used for thrown errors from connectToDB and other async code (can also be sync)
// next() used for validation failures; logical checks that may result in a worst case sincero
export async function getTodo(req, res, next) {
  try {
    await connectToDB();
    const todo = await Todo.findById(req.params.id);
    console.log(todo);

    if (!todo) return next(createError(404, "Todo not found"));

    if (todo.userID.toString() !== req.user.id)
      return next(createError("404", "Not authorized!"));

    res.status(200).send(todo);
  } catch (error) {
    next(createError(404, "Todo not found"));
  }
}

export async function updateTodo(req, res, next) {
  const id = req.params.id;
  if (!req.body) return next(createError(400, "Missing Fields"));

  try {
    await connectToDB();
    const todo = await Todo.findById(id);
    if (todo.userID.toString() !== req.user.id)
      return next(createError("404", "Not authorized!"));
    todo.title = req.body.title || todo.title;
    if (req.body.isCompleted !== undefined) {
      todo.isCompleted = req.body.isCompleted;
    }
    await todo.save();
    res.status(200).json({ message: "Todo updated!" });
  } catch (error) {
    return next(createError(404, "Todo not found"));
  }
}

export async function deleteTodo(req, res, next) {
  try {
    await connectToDB();
    const todo = await Todo.deleteOne({
      _id: req.params.id,
      userID: req.user.id,
    });

    if (!todo.deletedCount) return next(createError(400, "Todo not found"));
    res.status(200).json({ message: "Todo deleted!" });
  } catch (error) {
    return next(createError(400, "Todo not found"));
  }
}

export async function addTodo(req, res, next) {
  // console.log(req.body);
  // if (!req.body || !req.body.title) {
  //   return next(createError(404, "Title is required!"));
  // }
  // await connectToDB();
  // const newTodo = new Todo({ title: req.body.title, userID: req.user.id });
  // await newTodo.save();
  // res.status(201).json(newTodo);

  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(req.body);

  if (!req.body || !req.body.title)
    return next(createError(404, "Title is required!"));
  await connectToDB();
  const newTodo = new Todo({ title: req.body.title, userID: req.user.id });
  await newTodo.save();
  res.status(201).json(newTodo);
}
