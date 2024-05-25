import { Router } from "express";
import { jwtVerify } from "../middlewares/jwtVerifier.js";
import {
  signUp,
  userLogin,
  saveToDo,
  getToDo,
  updateToDo,
  deleteToDo,
  verifyToken,
  getUser,
  logout,
} from "../controllers/ToDo.controller.js";

const router = Router();

router.route("/signUp").post(signUp);
router.route("/login").post(userLogin);
router.route("/user").get(verifyToken, getUser);
router.route("/get").get(jwtVerify, getToDo);
router.route("/save").post(jwtVerify, saveToDo);
router.route("/update/:id").post(updateToDo);
router.route("/delete/:id").delete(deleteToDo);
router.route("/logout").post(logout);

export default router;
