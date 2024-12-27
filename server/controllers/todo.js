import Todo from "../models/todoModel.js";
import { connectToDB } from "../utils/connect.js";

export async function getAllTodos(req, res, next) {
  await connectToDB(); // connect to data base
  const todos = await Todo.find({ userID: req.user.id });
  res.status(200).send(todos);
}

export async function getTodo(req, res, next) {}

export async function updateTodo(req, res, next) {}

export async function deleteTodo(req, res, next) {}

export async function addTodo(req, res, next) {}
