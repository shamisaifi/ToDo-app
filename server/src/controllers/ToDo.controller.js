import { ToDoModel } from "../models/todo.models.js";
import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import { jwtVerify } from "../middlewares/jwtVerifier.js";

const signUp = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      console.error("error: user already exist. Try login instead");
      res.json({ message: "user already exist. Try with another email" });
      return;
    }

    const hashedPassword = bcrypt.hashSync(password);

    const createdUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    if (!createdUser) {
      console.error(err, "user not created");
      res.status(400).json({ message: "Failed to create user" });
    }

    return res.status(200).json({
      status: 200,
      data: createdUser,
      message: "user registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "problem while signUp. error: " });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log("body = ", req.body);

    if (!email) {
      console.error("email required");
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      console.log("user not found!");
      res.json({ message: "user not found! Please Signup." });
      return;
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      console.log("invalid email/password");
      res.status(400).json({ message: "invalid email/password" });
      return;
    }

    const loggedInUser = await User.findById(user._id).select("-password");

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: "12h",
    });

    res.cookie(String(user._id), token, {
      path: "/",
      expiresIn: new Date(Date.now() + 1000 * 60),
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).json({
      message: "success",
      user: loggedInUser,
      token,
    });
  } catch (error) {
    console.log("error while login: ", error);
  }
};

const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const token = cookies.split("=")[1];
  console.log(token);

  if (!token) {
    res.status(404).json({ message: "no token found" });
  }

  jwt.verify(String(token), process.env.JWT_KEY, (err, user) => {
    if (err) {
      return res.json({ message: "invalid token" });
    }
    console.log(user);
    req.id = user.id;
  });

  next();
};

const getUser = async (req, res) => {
  const userId = req.id;

  const user = await User.findById(userId, "-password");

  if (!user) {
    res.json({ message: "user not found" });
  }

  res.status(200).json({ user });
};

const getToDo = async (req, res) => {
  try {
    const todos = await ToDoModel.find({
      user: req.userId,
    });
    res
      .status(200)
      .json({ status: 200, todos, message: "todos get successfully" });
  } catch (error) {
    res.json({ error: error, message: "error while getting  the todos" });
  }
};

const saveToDo = async (req, res) => {
  try {
    const { text } = req.body;

    const todo = await ToDoModel.create({ text, user: req.userId });
    console.log(todo);

    res.status(200).json({
      status: 200,
      data: todo,
      message: "todo saved successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
    // res.status(400).json("todo is not created", error);
  }
};

const updateToDo = async (req, res) => {
  try {
    const id = req.params.id;
    const { text } = req.body;

    const updatedToDo = await ToDoModel.findByIdAndUpdate(id, { text });
    console.log(updateToDo);

    if (!updatedToDo) {
      return res.status(404).json({ message: "No such a Todo found." });
    }

    return res.status(200).json({
      status: 200,
      data: updatedToDo,
      message: "Todo Updated Successfully!",
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteToDo = async (req, res) => {
  try {
    // const { text } = req.body;

    const id = req.params.id;

    console.log(id);

    const deletedToDo = await ToDoModel.findByIdAndDelete(id);

    if (!deletedToDo) {
      return res.json({ message: "can not delete doto" });
    }

    return res.status(200).json({
      status: 200,
      data: deletedToDo,
      message: "todo is deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const logout = (req, res) => {
  res.clearCookie("token");

  res.json({ status: 200, message: "user loged out successfully" });
};

export {
  signUp,
  userLogin,
  verifyToken,
  getUser,
  saveToDo,
  getToDo,
  updateToDo,
  deleteToDo,
  logout,
};
