import { Router } from "express";
import { check } from "express-validator";

import { getUsers, signup, login } from "../controllers/users/users-controller";

const checkSignup: any[] = [
  check("name").not().isEmpty(),
  check("email").normalizeEmail().isEmail(),
  check("password").isLength({ min: 6 }),
];

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.post("/signup", checkSignup, signup);
userRouter.post("/login", login);

export default userRouter;
