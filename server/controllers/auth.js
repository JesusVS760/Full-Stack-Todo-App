import { createError } from "../utils/error.js";
import { connectToDB } from "../utils/connect.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs"; // Correct import
import jwt from "jsonwebtoken";

export async function register(req, res, next) {
  const data = req.body;
  console.log(data);
  if (!data?.email || !data?.password) {
    return next(createError(400, "Missing fields"));
  }
  await connectToDB();
  const alreadyRegistered = await User.exists({ email: data.email });
  if (alreadyRegistered) return next(createError(400, "User already exists"));

  // salt is a random sring that is generated for each password. It's added for each password before it gets hash
  // makes each password unique (no duplicates)
  // Generate a salt (random string) with a cost factor of 10
  const salt = bcrypt.genSaltSync(10); // Correct usage

  // Hash the password using the salt
  const hash = bcrypt.hashSync(req.body.password, salt);

  // Create the user object with the hashed password
  const newUser = new User({ ...req.body, password: hash });
  await newUser.save();
  res.status(201).json("User created successfully");
  // res.send(newUser);
}

export async function login(req, res, next) {
  const data = req.body;
  console.log(data);
  if (!data?.email || !data?.password) {
    return next(createError(400, "Missing fields"));
  }
  await connectToDB();
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(createError(400, "Invalid credentials"));
  const isPasswordCorrect = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordCorrect) return next(createError(400, "Invalid credentials"));
  // token -- string of chars that is used to prove identity of the user in subsequent requests without needing to store session data on server
  const token = jwt.sign({ id: user._id }, process.env.JWT);
  console.log(token);
  res
    .cookie("access_token", token, {
      httpOnly: true, // Prevents JS access to the token
      secure: process.env.NODE_ENV == "production", // Secure cookies only on HTTPS
    }) // cookie used to store token
    .status(200)
    .json("User Logged In!");
}
export async function logout(req, res, next) {
  res
    .clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
    })
    .status(200)
    .json({ message: "Logged out succesfully!" });
}
